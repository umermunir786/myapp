import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  username: string;
  isPremium: boolean; // Add a dedicated field for this
  avatar?: string;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleNotifications: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser: User = {
            id: "1",
            email,
            username: email.split("@")[0],
            preferences: {
              theme: "light",
              notifications: true,
              language: "en",
            },
          };

          const mockToken = "mock-jwt-token-" + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      setTheme: (theme: "light" | "dark") => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              preferences: {
                ...currentUser.preferences,
                theme,
              },
            },
          });
        }
      },

      toggleNotifications: () => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              preferences: {
                ...currentUser.preferences,
                notifications: !currentUser.preferences.notifications,
              },
            },
          });
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Brand-specific selectors (custom hooks)
export const useIsUserPremium = () =>
  useAuthStore((state) => state.user?.isPremium ?? false);

export const useUserDisplayName = () =>
  useAuthStore((state) => state.user?.username || state.user?.email || "User");

export const useCurrentTheme = () =>
  useAuthStore((state) => state.user?.preferences?.theme || "light");
