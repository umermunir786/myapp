import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Colors } from './colors';
import { FontFamily, Typography, ResponsiveSpacing } from './fonts';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

interface SpacingType {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
}

// Global spacing system
export const Spacing: SpacingType = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  "2xl": scale(48),
  "3xl": scale(64),
  "4xl": scale(80),
  "5xl": scale(96),
};

// Border radius system
export const BorderRadius = {
  none: 0,
  sm: scale(4),
  md: scale(8),
  lg: scale(12),
  xl: scale(16),
  "2xl": scale(24),
  "3xl": scale(32),
  full: 9999,
};

// Shadow system
export const Shadows = {
  sm: {
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: verticalScale(1) },
    shadowOpacity: 0.05,
    shadowRadius: scale(2),
    elevation: 1,
  },
  md: {
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  lg: {
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: scale(8),
    elevation: 5,
  },
  xl: {
    shadowColor: Colors.light.black,
    shadowOffset: { width: 0, height: verticalScale(8) },
    shadowOpacity: 0.2,
    shadowRadius: scale(16),
    elevation: 8,
  },
};

// Reusable layout components
export const GlobalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: hp('5%'), // Safe area padding
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // Layout helpers
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  spaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  // Row layouts
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  rowEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  // Column layouts
  column: {
    flexDirection: 'column',
  },

  columnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  columnSpaced: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  // Card styles
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },

  cardSmall: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadows.sm,
  },

  cardLarge: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.lg,
  },

  // Button base styles
  buttonBase: {
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: scale(48),
  },

  buttonPrimary: {
    backgroundColor: Colors.light.primary,
  },

  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: scale(2),
    borderColor: Colors.light.primary,
  },

  buttonDisabled: {
    backgroundColor: Colors.light.disable,
  },

  // Input styles
  inputContainer: {
    marginBottom: Spacing.md,
  },

  inputBase: {
    backgroundColor: Colors.light.inputBackground,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.body.fontSize,
    fontFamily: FontFamily.InterRegular,
    color: Colors.light.black,
    borderWidth: scale(1),
    borderColor: Colors.light.border,
    minHeight: scale(48),
  },

  inputFocused: {
    borderColor: Colors.light.primary,
    borderWidth: scale(2),
  },

  inputError: {
    borderColor: Colors.light.error,
    borderWidth: scale(2),
  },

  // Spacer components
  spacerXS: { height: Spacing.xs },
  spacerSM: { height: Spacing.sm },
  spacerMD: { height: Spacing.md },
  spacerLG: { height: Spacing.lg },
  spacerXL: { height: Spacing.xl },
  spacer2XL: { height: Spacing["2xl"] },
  spacer3XL: { height: Spacing["3xl"] },

  // Horizontal spacers
  hSpacerXS: { width: Spacing.xs },
  hSpacerSM: { width: Spacing.sm },
  hSpacerMD: { width: Spacing.md },
  hSpacerLG: { width: Spacing.lg },
  hSpacerXL: { width: Spacing.xl },

  // Dividers
  divider: {
    height: scale(1),
    backgroundColor: Colors.light.border,
    marginVertical: Spacing.md,
  },

  verticalDivider: {
    width: scale(1),
    backgroundColor: Colors.light.border,
    marginHorizontal: Spacing.md,
  },

  // Text styles
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  textPrimary: { color: Colors.light.primary },
  textSecondary: { color: Colors.light.darkGrey },
  textError: { color: Colors.light.error },
  textSuccess: { color: Colors.light.success },
  textWarning: { color: Colors.light.warning },

  // Utility classes
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  hidden: { display: 'none' },
  visible: { display: 'flex' },

  // Margin utilities
  m0: { margin: 0 },
  m1: { margin: Spacing.xs },
  m2: { margin: Spacing.sm },
  m3: { margin: Spacing.md },
  m4: { margin: Spacing.lg },
  m5: { margin: Spacing.xl },

  // Padding utilities
  p0: { padding: 0 },
  p1: { padding: Spacing.xs },
  p2: { padding: Spacing.sm },
  p3: { padding: Spacing.md },
  p4: { padding: Spacing.lg },
  p5: { padding: Spacing.xl },

  // Responsive margins
  mxAuto: { marginHorizontal: 'auto' },
  mxSM: { marginHorizontal: Spacing.sm },
  mxMD: { marginHorizontal: Spacing.md },
  mxLG: { marginHorizontal: Spacing.lg },
  
  myAuto: { marginVertical: 'auto' },
  mySM: { marginVertical: Spacing.sm },
  myMD: { marginVertical: Spacing.md },
  myLG: { marginVertical: Spacing.lg },

  // Responsive padding
  pxSM: { paddingHorizontal: Spacing.sm },
  pxMD: { paddingHorizontal: Spacing.md },
  pxLG: { paddingHorizontal: Spacing.lg },
  
  pySM: { paddingVertical: Spacing.sm },
  pyMD: { paddingVertical: Spacing.md },
  pyLG: { paddingVertical: Spacing.lg },
});

// Screen dimension utilities
export const ScreenUtils = {
  width: wp(100),
  height: hp(100),
  isSmallScreen: wp(100) < 350,
  isMediumScreen: wp(100) >= 350 && wp(100) < 450,
  isLargeScreen: wp(100) >= 450,
  
  // Responsive dimensions
  fullWidth: wp(100),
  halfWidth: wp(50),
  quarterWidth: wp(25),
  threeQuarterWidth: wp(75),
  
  // Safe area calculations
  safeAreaTop: hp('5%'),
  safeAreaBottom: hp('3%'),
  headerHeight: hp('8%'),
  tabBarHeight: hp('10%'),
};

// Animation constants
export const AnimationConfig = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// Common component creators
export const createSpacer = (size: keyof typeof Spacing) => ({
  height: Spacing[size],
});

export const createHorizontalSpacer = (size: keyof typeof Spacing) => ({
  width: Spacing[size],
});

export const createResponsiveContainer = (horizontalPadding = 'lg') => ({
  paddingHorizontal: Spacing[horizontalPadding],
  paddingVertical: Spacing.md,
});

export const createCard = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const baseCard = GlobalStyles.card;
  switch (size) {
    case 'sm': return { ...baseCard, ...GlobalStyles.cardSmall };
    case 'lg': return { ...baseCard, ...GlobalStyles.cardLarge };
    default: return baseCard;
  }
};
