import { create } from 'zustand';
import { List, Card } from '@/types';

type BoardState = {
  activeListId: string | null;
  activeCardId: string | null;
  lists: List[];
};

type BoardActions = {
  setActiveListId: (id: string | null) => void;
  setActiveCardId: (id: string | null) => void;
  setLists: (lists: List[]) => void;
  addList: (list: List) => void;
  removeList: (id: string) => void;
  addCard: (listId: string, card: Card) => void;
};

const initialState: BoardState = {
  activeListId: null,
  activeCardId: null,
  lists: [],
};

export const useBoardStore = create<BoardState & BoardActions>()(set => ({
  ...initialState,
  setActiveListId: id => set(() => ({ activeListId: id })),
  setActiveCardId: id => set(() => ({ activeCardId: id })),
  setLists: lists => set(() => ({ lists: lists })),
  addList: list => set(state => ({ lists: [...state.lists, list] })),
  removeList: id =>
    set(state => ({ lists: state.lists.filter(list => list.id !== id) })),
  addCard: (listId, card) =>
    set(state => ({
      lists: state.lists.map(list =>
        list.id === listId ? { ...list, cards: [...list.cards, card] } : list,
      ),
    })),
}));
