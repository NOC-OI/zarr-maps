interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <div id="loading" className="absolute inset-0 z-9998 flex items-center justify-center">
      <div className="relative h-20 w-20" role="status" aria-label="Loading">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="absolute left-0 top-0 h-full w-full animate-spinnerFade"
            style={{
              transform: `rotate(${index * 30}deg)`,
              animationDelay: `${-1.2 + index * 0.1}s`
            }}
          >
            <div className="absolute left-[37px] top-[3px] h-4.5 w-1.5 rounded-md bg-yellow-600" />
          </div>
        ))}
      </div>
    </div>
  );
}
