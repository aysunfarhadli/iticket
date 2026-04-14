import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../api/types';

type State = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isAdmin: () => boolean;
};

export const useAuth = create<State>()(persist(
  (set, get) => ({
    token: null,
    user: null,
    setAuth: (token, user) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
    isAdmin: () => !!get().user?.roles?.includes('ADMIN')
  }),
  { name: 'iticket-auth' }
));
