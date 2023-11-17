import { postAccountAuthRefreshToken } from "@/api/account";
import { user_roles } from "@/model";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  access: string;
  refresh: string;
  isAuthenticated: boolean;
  role: user_roles;
  refreshUser: (resolve: () => void, reject: () => void) => Promise<void>;
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
      refreshUser: (resolve, reject) =>
        postAccountAuthRefreshToken({
          body: {
            refresh: get().refresh,
          },
        })
          .then((res: AxiosResponse) => {
            const { access } = res?.data as { access: string };
            set({ access, isAuthenticated: true });
            resolve();
          })
          .catch(() => {
            set({ access: "", refresh: "", isAuthenticated: false });
            reject();
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
