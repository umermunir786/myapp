import { Colors } from '../constants/colors';
import { FontFamily } from '../constants/fonts';

export class BrandingService {
  static getThemeColors(mode: 'light' | 'dark' = 'light') {
    return Colors[mode];
  }

  static getPrimaryFont() {
    return FontFamily.InterRegular;
  }

  static getHeadingFont() {
    return FontFamily.InterBold;
  }

  static getBrandGradient() {
    return [Colors.light.primary, '#FF8A65', '#FFAB40'];
  }

  static getStatusColors() {
    return {
      success: '#4CAF50',
      warning: '#FF9800', 
      error: '#F44336',
      info: '#2196F3'
    };
  }
}

export const BrandUtils = {
  formatBrandText: (text: string) => text.toUpperCase(),
  generateBrandColor: (opacity: number) => `${Colors.light.primary}${Math.round(opacity * 255).toString(16)}`,
  getBrandSpacing: () => ({
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  })
};
