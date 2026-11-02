import { MIB } from "./constants";
import { TileCacheStats } from "./types";

interface CachedTileData {
  data: Float32Array;
  sizeBytes: number;
}

/**
 * Selects a conservative per-layer budget while allowing up to five active
 * layers. `deviceMemory` is deliberately treated as a hint, not an allowance.
 */
export function defaultTileCacheBytes(): number {
  if (typeof navigator === 'undefined') return 32 * MIB;
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (deviceMemory === undefined) return 32 * MIB;
  if (deviceMemory <= 2) return 8 * MIB;
  if (deviceMemory <= 4) return 16 * MIB;
  if (deviceMemory <= 8) return 32 * MIB;
  return 64 * MIB;
}


/**
 * A simple LRU cache for tile data. The cache is keyed by a string, which is
 * typically a combination of the layer ID and tile coordinates.
 */
export class TileDataCache {
  private entries = new Map<string, CachedTileData>();
  private bytes = 0;
  private hits = 0;
  private misses = 0;
  private evictions = 0;

  constructor(readonly maxBytes: number) {}

  get(key: string): CachedTileData | undefined {
    const entry = this.entries.get(key);
    if (!entry) {
      this.misses++;
      return undefined;
    }
    this.hits++;
    this.entries.delete(key);
    this.entries.set(key, entry);
    return entry;
  }

  set(key: string, entry: CachedTileData): void {
    if (this.maxBytes <= 0 || entry.sizeBytes > this.maxBytes) return;
    const previous = this.entries.get(key);
    if (previous) {
      this.bytes -= previous.sizeBytes;
      this.entries.delete(key);
    }
    this.entries.set(key, entry);
    this.bytes += entry.sizeBytes;
    while (this.bytes > this.maxBytes) {
      const oldestKey = this.entries.keys().next().value as string | undefined;
      if (oldestKey === undefined) break;
      const oldest = this.entries.get(oldestKey)!;
      this.entries.delete(oldestKey);
      this.bytes -= oldest.sizeBytes;
      this.evictions++;
    }
  }

  clear(): void {
    this.entries.clear();
    this.bytes = 0;
  }

  get stats(): TileCacheStats {
    return {
      entries: this.entries.size,
      bytes: this.bytes,
      maxBytes: this.maxBytes,
      hits: this.hits,
      misses: this.misses,
      evictions: this.evictions
    };
  }
}
