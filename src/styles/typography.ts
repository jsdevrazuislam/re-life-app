import { ScaledSheet } from 'react-native-size-matters';

export const Typography = ScaledSheet.create({
  heading1Regular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: '48@ms',
    lineHeight: '58@ms',
    letterSpacing: '-0.2@ms',
    fontWeight: '400',
  },
  heading1Medium: {
    fontFamily: 'Quicksand-Medium',
    fontSize: '48@ms',
    lineHeight: '58@ms',
    letterSpacing: '-0.2@ms',
    fontWeight: '500',
  },
  heading1SemiBold: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: '48@ms',
    lineHeight: '58@ms',
    letterSpacing: '-0.2@ms',
    fontWeight: '600',
  },
  heading1Bold: {
    fontFamily: 'Quicksand-Bold',
    fontSize: '48@ms',
    lineHeight: '58@ms',
    letterSpacing: '-0.2@ms',
    fontWeight: '700',
  },

  // Heading 2
  heading2Regular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: '40@ms',
    lineHeight: '48@ms',
    letterSpacing: '-0.2@ms',
    fontWeight: '400',
  },
  heading2Medium: {
    fontFamily: 'Quicksand-Medium',
    fontSize: '40@ms',
    lineHeight: '48@ms',
    letterSpacing: '-0.2@ms',
    fontWeight: '500',
  },
  heading2SemiBold: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: '40@ms',
    lineHeight: '48@ms',
    letterSpacing: '-0.2@ms',
    fontWeight: '600',
  },
  heading2Bold: {
    fontFamily: 'Quicksand-Bold',
    fontSize: '40@ms',
    lineHeight: '48@ms',
    letterSpacing: '-0.2@ms',
    fontWeight: '700',
  },

  // Paragraph - Large
  paragraphLargeRegular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: '18@ms',
    lineHeight: '26@ms',
    letterSpacing: '0@ms',
    fontWeight: '400',
  },
  paragraphLargeMedium: {
    fontFamily: 'Quicksand-Medium',
    fontSize: '18@ms',
    lineHeight: '26@ms',
    letterSpacing: '0@ms',
    fontWeight: '500',
  },
  paragraphLargeSemiBold: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: '18@ms',
    lineHeight: '26@ms',
    letterSpacing: '0@ms',
    fontWeight: '600',
  },
  paragraphLargeBold: {
    fontFamily: 'Quicksand-Bold',
    fontSize: '18@ms',
    lineHeight: '26@ms',
    letterSpacing: '0@ms',
    fontWeight: '700',
  },

  // Paragraph - Medium
  paragraphMediumRegular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: '16@ms',
    lineHeight: '24@ms',
    letterSpacing: '0@ms',
    fontWeight: '400',
  },
  paragraphMediumMedium: {
    fontFamily: 'Quicksand-Medium',
    fontSize: '16@ms',
    lineHeight: '24@ms',
    letterSpacing: '0@ms',
    fontWeight: '500',
  },
  paragraphMediumSemiBold: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: '16@ms',
    lineHeight: '24@ms',
    letterSpacing: '0@ms',
    fontWeight: '600',
  },
  paragraphMediumBold: {
    fontFamily: 'Quicksand-Bold',
    fontSize: '16@ms',
    lineHeight: '24@ms',
    letterSpacing: '0@ms',
    fontWeight: '700',
  },

  // Paragraph - Small
  paragraphSmallRegular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    letterSpacing: '0@ms',
    fontWeight: '400',
  },
  paragraphSmallMedium: {
    fontFamily: 'Quicksand-Medium',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    letterSpacing: '0@ms',
    fontWeight: '500',
  },
  paragraphSmallSemiBold: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    letterSpacing: '0@ms',
    fontWeight: '600',
  },
  paragraphSmallBold: {
    fontFamily: 'Quicksand-Bold',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    letterSpacing: '0@ms',
    fontWeight: '700',
  },

  // Paragraph - XSmall
  paragraphXSmallRegular: {
    fontFamily: 'Quicksand-Regular',
    fontSize: '12@ms',
    lineHeight: '18@ms',
    letterSpacing: '0@ms',
    fontWeight: '400',
  },
  paragraphXSmallMedium: {
    fontFamily: 'Quicksand-Medium',
    fontSize: '12@ms',
    lineHeight: '18@ms',
    letterSpacing: '0@ms',
    fontWeight: '500',
  },
  paragraphXSmallSemiBold: {
    fontFamily: 'Quicksand-SemiBold',
    fontSize: '12@ms',
    lineHeight: '18@ms',
    letterSpacing: '0@ms',
    fontWeight: '600',
  },
  paragraphXSmallBold: {
    fontFamily: 'Quicksand-Bold',
    fontSize: '12@ms',
    lineHeight: '18@ms',
    letterSpacing: '0@ms',
    fontWeight: '700',
  },
});


export type TypographyKeys = keyof typeof Typography