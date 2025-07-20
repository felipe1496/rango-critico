import type { UserModel } from "@/models/UserModel";
import { create } from "zustand";

export const useUserStore = create<{
	user: UserModel | null;
	setUser: (user: UserModel | null) => void;
}>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
