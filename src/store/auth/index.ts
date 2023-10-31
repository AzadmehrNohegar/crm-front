import { postAccountAuthRefreshToken } from "@/api/account";
import { user_roles } from "@/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  access: string;
  refresh: string;
  isAuthenticated: boolean;
  role: user_roles;
  refreshUser: () => Promise<void>;
  loginUser: (
    accessToken: string,
    refreshToken: string,
    role: user_roles
  ) => void;
  logoutUser: () => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      access: "",
      refresh: "",
      isAuthenticated: false,
      role: "CUSTOMER",
      refreshUser: () =>
        postAccountAuthRefreshToken({
          body: {
            refresh: get().refresh,
          },
        })
          .then((res: unknown) => {
            const { access } = res as { access: string };
            set({ access, isAuthenticated: true });
          })
          .catch(() => {
            set({ access: "", refresh: "", isAuthenticated: false });
          }),

      loginUser: (accessToken, refreshToken, role) => {
        set({
          access: accessToken,
          refresh: refreshToken,
          role,
          isAuthenticated: true,
        });
      },
      logoutUser: () => {
        set({ access: "", refresh: "", isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export { useAuthStore };
