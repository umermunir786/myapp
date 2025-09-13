import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontFamily, Typography, ResponsiveUtils, ResponsiveSpacing } from '../constants/fonts';

interface ResponsiveBrandCardProps {
  title: string;
  subtitle: string;
  description: string;
  onPress: () => void;
}

export const ResponsiveBrandCard: React.FC<ResponsiveBrandCardProps> = ({
  title,
  subtitle, 
  description,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.action}>Tap to continue</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: ResponsiveUtils.scale(12),
    padding: ResponsiveSpacing.lg,
    marginVertical: ResponsiveSpacing.sm,
    marginHorizontal: ResponsiveSpacing.md,
    shadowColor: Colors.light.black,
    shadowOffset: {
      width: 0,
      height: ResponsiveUtils.verticalScale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: ResponsiveUtils.scale(4),
    elevation: 3,
  },
  header: {
    marginBottom: ResponsiveSpacing.md,
  },
  title: {
    ...Typography.h3,
    color: Colors.light.black,
    marginBottom: ResponsiveSpacing.xs,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.light.darkGrey,
    textTransform: 'uppercase',
  },
  description: {
    ...Typography.body,
    color: Colors.light.darkGrey,
    marginBottom: ResponsiveSpacing.lg,
    lineHeight: ResponsiveUtils.getResponsiveFont(Typography.body.fontSize * 1.4),
  },
  footer: {
    alignItems: 'flex-end',
  },
  action: {
    ...Typography.overline,
    color: Colors.light.primary,
    fontSize: ResponsiveUtils.getResponsiveFont(12),
  },
});

// Example usage with different screen adaptations
export const ResponsiveLayoutExample = () => {
  const isSmall = ResponsiveUtils.isSmallDevice();
  const isMedium = ResponsiveUtils.isMediumDevice();
  
  return (
    <View style={[
      styles.container,
      {
        paddingHorizontal: isSmall ? ResponsiveSpacing.sm : ResponsiveSpacing.lg,
        paddingVertical: isSmall ? ResponsiveSpacing.md : ResponsiveSpacing.xl,
      }
    ]}>
      <Text style={[
        Typography.h1,
        {
          fontSize: ResponsiveUtils.getResponsiveFont(Typography.h1.fontSize),
          marginBottom: ResponsiveUtils.getAdaptiveSpacing(24),
          textAlign: 'center',
        }
      ]}>
        {isSmall ? 'Brand' : isMedium ? 'Brand App' : 'Welcome to Brand App'}
      </Text>
      
      <ResponsiveBrandCard
        title="Responsive Design"
        subtitle="Adaptive UI"
        description="This card adapts to different screen sizes using responsive utilities."
        onPress={() => console.log('Card pressed')}
      />
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
