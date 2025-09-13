const tintColorLight: string = "#7C4DFF";
const tintColorDark: string = "#fff";

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  button: string;
  inputBackground: string;
  darkGrey: string;
  lightGrey: string;
  disable: string;
  text: string;
  white: string;
  black: string;
  online: string;
  offline: string;
  warning: string;
  success: string;
  error: string;
  background: string;
  surface: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  border: string;
  card: string;
  notification: string;
}

interface ColorsType {
  light: ColorScheme;
  dark: ColorScheme;
}

export const Colors: ColorsType = {
  light: {
    primary: "#7C4DFF", // Brand purple
    secondary: "#FF4081", // Brand pink
    accent: "#00BCD4", // Brand cyan
    button: "#1A1A2E", // Dark button
    inputBackground: "#F5F6FA",
    darkGrey: "#57606F",
    lightGrey: "#DDD6FE",
    disable: "#E5E7EB",
    text: "#ffffff",
    white: "#FFFFFF",
    black: "#000000",
    online: "#10B981",
    offline: "#EF4444",
    warning: "#F59E0B",
    success: "#10B981",
    error: "#EF4444",
    background: "#fff",
    surface: "#F8FAFC",
    tint: tintColorLight,
    icon: "#6B7280",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorLight,
    border: "#E5E7EB",
    card: "#FFFFFF",
    notification: "#FF4081",
  },
  dark: {
    primary: "#7C4DFF",
    secondary: "#FF4081",
    accent: "#00BCD4",
    button: "#1A1A2E",
    inputBackground: "#374151",
    darkGrey: "#6B7280",
    lightGrey: "#4B5563",
    white: "#FFFFFF",
    black: "#000000",
    online: "#10B981",
    offline: "#EF4444",
    warning: "#F59E0B",
    success: "#10B981",
    error: "#EF4444",
    disable: "#4B5563",
    text: "#F9FAFB",
    background: "#111827",
    surface: "#1F2937",
    tint: tintColorDark,
    icon: "#9CA3AF",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorDark,
    border: "#374151",
    card: "#1F2937",
    notification: "#FF4081",
  },
};

// Brand gradient combinations
interface GradientType {
  primary: string[];
  accent: string[];
  success: string[];
  sunset: string[];
}

export const BrandGradients: GradientType = {
  primary: [Colors.light.primary, Colors.light.secondary],
  accent: [Colors.light.accent, Colors.light.primary],
  success: [Colors.light.success, Colors.light.accent],
  sunset: ["#FF6B6B", "#FFE66D", "#FF6B6B"],
};

// Brand color utilities
interface BrandColorsType {
  primary: string;
  secondary: string;
  getOpacity: (color: string, opacity: number) => string;
  variants: {
    primaryLight: string;
    primaryDark: string;
    secondaryLight: string;
    secondaryDark: string;
  };
}

export const BrandColors: BrandColorsType = {
  primary: Colors.light.primary,
  secondary: Colors.light.secondary,
  getOpacity: (color: string, opacity: number): string => 
    `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
  variants: {
    primaryLight: "#B39DDB",
    primaryDark: "#512DA8",
    secondaryLight: "#FF80AB", 
    secondaryDark: "#C2185B",
  }
};
