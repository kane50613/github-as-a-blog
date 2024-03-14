import { create } from "zustand";

export const useCreatePostStore = create(() => ({
  title: "",
  body: "",
  preview: false,
}));

export type CreatePostStore = ReturnType<typeof useCreatePostStore.getState>;
