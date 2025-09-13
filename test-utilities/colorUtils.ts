import { Colors } from '../constants/colors';

export const ColorUtils = {
  hexToRgba: (hex: string, alpha: number = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  lightenColor: (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  },

  darkenColor: (hex: string, percent: number): string => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  },

  getContrastColor: (backgroundColor: string): string => {
    const color = backgroundColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? Colors.light.black : Colors.light.white;
  }
};

export const BrandColorPalette = {
  primary: Colors.light.primary,
  primaryVariants: {
    50: ColorUtils.lightenColor(Colors.light.primary, 40),
    100: ColorUtils.lightenColor(Colors.light.primary, 30),
    200: ColorUtils.lightenColor(Colors.light.primary, 20),
    300: ColorUtils.lightenColor(Colors.light.primary, 10),
    400: Colors.light.primary,
    500: ColorUtils.darkenColor(Colors.light.primary, 10),
    600: ColorUtils.darkenColor(Colors.light.primary, 20),
    700: ColorUtils.darkenColor(Colors.light.primary, 30),
    800: ColorUtils.darkenColor(Colors.light.primary, 40),
    900: ColorUtils.darkenColor(Colors.light.primary, 50),
  }
};
