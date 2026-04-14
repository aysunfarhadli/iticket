import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  ticketTypeId: number;
  ticketTypeName: string;
  eventId: number;
  eventTitle: string;
  unitPrice: number;
  quantity: number;
};

type State = {
  items: CartItem[];
  add: (i: CartItem) => void;
  remove: (id: number) => void;
  setQty: (id: number, q: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<State>()(persist((set, get) => ({
  items: [],
  add: (i) => set(s => {
    const ex = s.items.find(x => x.ticketTypeId === i.ticketTypeId);
    if (ex) return { items: s.items.map(x => x.ticketTypeId === i.ticketTypeId ? { ...x, quantity: x.quantity + i.quantity } : x) };
    return { items: [...s.items, i] };
  }),
  remove: (id) => set(s => ({ items: s.items.filter(x => x.ticketTypeId !== id) })),
  setQty: (id, q) => set(s => ({ items: s.items.map(x => x.ticketTypeId === id ? { ...x, quantity: Math.max(1, q) } : x) })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((s, x) => s + x.unitPrice * x.quantity, 0)
}), { name: 'iticket-cart' }));
