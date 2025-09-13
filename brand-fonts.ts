import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-dimensions';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

interface FontFamilyType {
  PoppinsRegular: string;
  PoppinsBold: string;
  PoppinsLight: string;
  PoppinsMedium: string;
  PoppinsSemiBold: string;
  PoppinsExtraBold: string;
  InterRegular: string;
  InterBold: string;
  InterMedium: string;
  InterSemiBold: string;
  InterLight: string;
  PlusJakartaSansRegular: string;
  PlusJakartaSansBold: string;
  PlusJakartaSansMedium: string;
  JetBrainsMonoRegular: string;
  JetBrainsMonoBold: string;
}

export const FontFamily: FontFamilyType = {
  // Primary brand fonts
  PoppinsRegular: "Poppins-Regular",
  PoppinsBold: "Poppins-Bold",
  PoppinsLight: "Poppins-Light",
  PoppinsMedium: "Poppins-Medium",
  PoppinsSemiBold: "Poppins-SemiBold",
  PoppinsExtraBold: "Poppins-ExtraBold",
  
  // Secondary fonts
  InterRegular: "Inter-Regular",
  InterBold: "Inter-Bold",
  InterMedium: "Inter-Medium",
  InterSemiBold: "Inter-SemiBold",
  InterLight: "Inter-Light",
  
  // Display fonts
  PlusJakartaSansRegular: "PlusJakartaSans-Regular",
  PlusJakartaSansBold: "PlusJakartaSans-Bold",
  PlusJakartaSansMedium: "PlusJakartaSans-Medium",
  
  // Monospace for code/numbers
  JetBrainsMonoRegular: "JetBrainsMono-Regular",
  JetBrainsMonoBold: "JetBrainsMono-Bold",
};

// Base font sizes (non-responsive)
export const BaseFontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
};

// Responsive font sizes using RFValue (recommended)
export const FontSizes = {
  xs: RFValue(BaseFontSizes.xs),
  sm: RFValue(BaseFontSizes.sm),
  base: RFValue(BaseFontSizes.base),
  lg: RFValue(BaseFontSizes.lg),
  xl: RFValue(BaseFontSizes.xl),
  "2xl": RFValue(BaseFontSizes["2xl"]),
  "3xl": RFValue(BaseFontSizes["3xl"]),
  "4xl": RFValue(BaseFontSizes["4xl"]),
  "5xl": RFValue(BaseFontSizes["5xl"]),
};

// Alternative responsive sizing using percentage
export const ResponsiveFontSizes = {
  xs: RFPercentage(1.5),
  sm: RFPercentage(1.8),
  base: RFPercentage(2.0),
  lg: RFPercentage(2.3),
  xl: RFPercentage(2.5),
  "2xl": RFPercentage(3.0),
  "3xl": RFPercentage(3.8),
  "4xl": RFPercentage(4.5),
  "5xl": RFPercentage(6.0),
};

// Size matters approach (scale based)
export const ScaledFontSizes = {
  xs: scale(BaseFontSizes.xs),
  sm: scale(BaseFontSizes.sm),
  base: scale(BaseFontSizes.base),
  lg: scale(BaseFontSizes.lg),
  xl: scale(BaseFontSizes.xl),
  "2xl": scale(BaseFontSizes["2xl"]),
  "3xl": scale(BaseFontSizes["3xl"]),
  "4xl": scale(BaseFontSizes["4xl"]),
  "5xl": scale(BaseFontSizes["5xl"]),
};

// Font weights
interface FontWeightsType {
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
}

export const FontWeights: FontWeightsType = {
  light: "300",
  normal: "400", 
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
};

// Responsive spacing and dimensions
export const ResponsiveSpacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  "2xl": scale(48),
  "3xl": scale(64),
};

export const ResponsiveVerticalSpacing = {
  xs: verticalScale(4),
  sm: verticalScale(8),
  md: verticalScale(16),
  lg: verticalScale(24),
  xl: verticalScale(32),
  "2xl": verticalScale(48),
  "3xl": verticalScale(64),
};

// Responsive line heights
export const LineHeights = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

// Typography styles with responsive sizing
export const Typography = {
  h1: {
    fontFamily: FontFamily.PoppinsBold,
    fontSize: FontSizes["4xl"],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes["4xl"] * LineHeights.tight,
    letterSpacing: moderateScale(-0.5),
  },
  h2: {
    fontFamily: FontFamily.PoppinsSemiBold,
    fontSize: FontSizes["3xl"],
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes["3xl"] * LineHeights.tight,
    letterSpacing: moderateScale(-0.25),
  },
  h3: {
    fontFamily: FontFamily.PoppinsMedium,
    fontSize: FontSizes["2xl"],
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes["2xl"] * LineHeights.normal,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: FontFamily.PoppinsMedium,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.xl * LineHeights.normal,
  },
  body: {
    fontFamily: FontFamily.InterRegular,
    fontSize: FontSizes.base,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.base * LineHeights.normal,
    letterSpacing: moderateScale(0.15),
  },
  bodyLarge: {
    fontFamily: FontFamily.InterRegular,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  bodySmall: {
    fontFamily: FontFamily.InterRegular,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },
  caption: {
    fontFamily: FontFamily.InterLight,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.light,
    lineHeight: FontSizes.sm * LineHeights.normal,
    letterSpacing: moderateScale(0.25),
  },
  overline: {
    fontFamily: FontFamily.InterMedium,
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.xs * LineHeights.normal,
    letterSpacing: moderateScale(1),
    textTransform: 'uppercase',
  },
  button: {
    fontFamily: FontFamily.PoppinsMedium,
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.base * LineHeights.tight,
    letterSpacing: moderateScale(0.5),
  },
  buttonLarge: {
    fontFamily: FontFamily.PoppinsSemiBold,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.lg * LineHeights.tight,
    letterSpacing: moderateScale(0.25),
  },
  buttonSmall: {
    fontFamily: FontFamily.PoppinsMedium,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.sm * LineHeights.tight,
    letterSpacing: moderateScale(0.75),
  },
};

// Responsive utilities for manual calculations
export const ResponsiveUtils = {
  // Font size helpers
  fontSize: (size) => RFValue(size),
  fontSizePercent: (percent) => RFPercentage(percent),
  
  // Spacing helpers
  width: (percent) => wp(percent),
  height: (percent) => hp(percent),
  scale: (size) => scale(size),
  verticalScale: (size) => verticalScale(size),
  moderateScale: (size, factor = 0.5) => moderateScale(size, factor),
  
  // Responsive breakpoints
  isSmallDevice: () => wp(100) < 350,
  isMediumDevice: () => wp(100) >= 350 && wp(100) < 450,
  isLargeDevice: () => wp(100) >= 450,
  
  // Dynamic font sizing based on screen
  getResponsiveFont: (baseSize) => {
    if (wp(100) < 350) return RFValue(baseSize * 0.9); // Small devices
    if (wp(100) > 450) return RFValue(baseSize * 1.1); // Large devices
    return RFValue(baseSize); // Medium devices
  },
  
  // Adaptive spacing
  getAdaptiveSpacing: (baseSpacing) => {
    return moderateScale(baseSpacing, ResponsiveUtils.isSmallDevice() ? 0.3 : 0.5);
  },
};
