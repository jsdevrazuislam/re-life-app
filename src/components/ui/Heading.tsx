import React, {FC} from 'react';
import {Text} from 'react-native';
import  {Typography, TypographyKeys} from '../../styles/typography';
import {HeadingProps} from '../../types/heading';

const Heading: React.FC<HeadingProps> = ({
  level,
  weight = 'Regular',
  style,
  children,
}) => {
  const key = `heading${level}${
    weight === 'Regular' ? '' : weight
  }` as TypographyKeys;
  const headingStyle = Typography[key] || {};
  return <Text style={[headingStyle, style]}>{children}</Text>;
};

export default Heading;
