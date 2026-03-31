/** Backend origin (no path). Override with VITE_API_URL in frontend/.env */
export function getApiOrigin() {
  const raw = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  return String(raw).replace(/\/$/, '');
}
