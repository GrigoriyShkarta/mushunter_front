import { create } from 'zustand';
import { ReactNode } from 'react';

interface ModalState {
	isOpen: boolean;
	title?: string;
	children: ReactNode | null;
	setIsOpen: (isOpen: boolean) => void;
	setTitle: (title?: string) => void;
	setChildren: (children: ReactNode | null) => void;
}

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	title: undefined,
	children: null,
	setIsOpen: (isOpen) => set({ isOpen }),
	setTitle: (title) => set({ title }),
	setChildren: (children) => set({ children }),
}));
