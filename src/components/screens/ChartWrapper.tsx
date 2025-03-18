import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';

const ChartWrapper: React.FC<{ children: React.ReactNode, height?:number }> = ({ children, height = 200 }) => (
  <View style={styles.chartContainer}>
    <Svg width="100%" height={height}>
      {children}
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    // marginVertical: 8,
    elevation: 2,
    position:'relative'
  },
});

export default ChartWrapper