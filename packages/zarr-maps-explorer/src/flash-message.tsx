import { useEffect } from 'react';

export type FlashMessagePosition = 'bleft' | 'bright' | 'tright' | 'tleft' | 'tcenter' | 'bcenter';
export type FlashMessageWidth = 'full' | 'small' | 'medium' | 'large';

export interface FlashMessageValue {
  messageType: string;
  content: string;
  duration?: number;
}

export interface FlashMessageProps {
  message: FlashMessageValue;
  visible: boolean;
  onClose: () => void;
  width: FlashMessageWidth;
  duration: number;
  position: FlashMessagePosition;
}

export function FlashMessage({
  message,
  visible,
  onClose,
  width,
  duration,
  position
}: FlashMessageProps) {
  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(onClose, message.duration ?? duration);
    return () => window.clearTimeout(timeout);
  }, [duration, message.duration, onClose, visible]);

  if (!visible) return null;

  return (
    <div
      id="flash-message"
      className={`explorer-toast explorer-toast--${message.messageType} explorer-toast--${position} explorer-toast--${width}`}
      role="status"
    >
      <div className="explorer-toast__message">{message.content}</div>
      <button
        type="button"
        className="explorer-toast__dismiss"
        onClick={onClose}
        aria-label="Dismiss message"
      >
        &#10005;
      </button>
    </div>
  );
}
