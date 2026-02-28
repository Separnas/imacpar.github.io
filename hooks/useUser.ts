
import { useLocalStorage } from './useLocalStorage';
const VERSION = 'v1';
const USER_KEY = `md:${VERSION}:user`;
export function useUser() {
  const [user, setUser] = useLocalStorage<string | null>(USER_KEY, null);
  return { user, setUser };
}
