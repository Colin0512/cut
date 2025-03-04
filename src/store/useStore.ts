// src/store/useStore.ts
import { create } from 'zustand';

// 创建状态仓库
interface GlobalState {
  count: number;
  increment: () => void;
}

const useStore = create<GlobalState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
