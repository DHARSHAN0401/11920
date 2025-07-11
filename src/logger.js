export function logEvent(eventType, details) {
  if (typeof window.myLoggingMiddleware === 'function') {
    window.myLoggingMiddleware(eventType, details);
  }
}
