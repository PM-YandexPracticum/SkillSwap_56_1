import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants';

export function isAuthenticated(): boolean {
  const user = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER);
  return !!user;
}
