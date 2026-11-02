import type { AbsolutePath, AsyncReadable, GetOptions, RangeQuery, Readable } from 'zarrita';

interface PendingRequest<T> {
  run: () => Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
  signal?: AbortSignal;
  onAbort?: () => void;
}

function abortError(): DOMException {
  return new DOMException('The operation was aborted', 'AbortError');
}

/**
 * Wrap a Zarrita store so all reads share one request-concurrency budget.
 *
 * Requests waiting for a slot honour their abort signal and never reach the
 * underlying store when cancelled.
 */
export function limitStoreRequests(store: Readable, concurrency: number): AsyncReadable {
  const limit = Number.isFinite(concurrency) ? Math.max(1, Math.floor(concurrency)) : 1;
  let active = 0;
  const queue: PendingRequest<unknown>[] = [];

  const dispatch = () => {
    while (active < limit && queue.length > 0) {
      const request = queue.shift()!;
      if (request.signal?.aborted) {
        request.reject(request.signal.reason ?? abortError());
        continue;
      }

      if (request.onAbort) request.signal?.removeEventListener('abort', request.onAbort);
      active++;
      void request
        .run()
        .then(request.resolve, request.reject)
        .finally(() => {
          active--;
          dispatch();
        });
    }
  };

  const schedule = <T>(run: () => T | Promise<T>, signal?: AbortSignal): Promise<T> => {
    if (signal?.aborted) return Promise.reject(signal.reason ?? abortError());

    return new Promise<T>((resolve, reject) => {
      const request: PendingRequest<T> = {
        run: () => Promise.resolve().then(run),
        resolve,
        reject,
        signal
      };
      request.onAbort = () => {
        const index = queue.indexOf(request as PendingRequest<unknown>);
        if (index === -1) return;
        queue.splice(index, 1);
        reject(signal?.reason ?? abortError());
      };
      signal?.addEventListener('abort', request.onAbort, { once: true });
      queue.push(request as PendingRequest<unknown>);
      dispatch();
    });
  };

  const limited: AsyncReadable = {
    get(key: AbsolutePath, options?: GetOptions) {
      return schedule(() => store.get(key, options), options?.signal);
    }
  };

  if (store.getRange) {
    limited.getRange = (key: AbsolutePath, range: RangeQuery, options?: GetOptions) =>
      schedule(() => store.getRange!(key, range, options), options?.signal);
  }

  return limited;
}
