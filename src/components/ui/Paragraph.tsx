import {Text} from 'react-native';
import React, {FC} from 'react';
import {Typography, TypographyKeys} from '../../styles/typography';
import { ParagraphProps } from '../../types/paragraph';

const Paragraph: React.FC<ParagraphProps> = ({
  level,
  weight = 'Regular',
  style,
  children,
  numberOfLines,
  ellipsizeMode
}) => {
  const key = `paragraph${level}${
    weight === 'Regular' ? 'Regular' : weight
  }` as TypographyKeys;

  
  const paragraphStyle = Typography[key] || {};
  return <Text style={[paragraphStyle, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{children}</Text>;
};

export default Paragraph;
