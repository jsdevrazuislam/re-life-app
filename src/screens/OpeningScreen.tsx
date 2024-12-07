import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import openingStyles from '../styles/opening_screen_styles';
import globalStyles from '../styles/global';
import Heading from '../components/Heading';
import {Typography} from '../styles/typography';
import AppButton from '../components/AppButton';

const OpeningScreen = () => {
  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        <TouchableOpacity style={openingStyles.skipButton}>
          <Text>Skip</Text>
        </TouchableOpacity>
        <View style={openingStyles.container}>
          <Image
            source={require('../assets/start-open.png')}
            style={openingStyles.image}
          />
        </View>
        <View style={openingStyles.appTitle}>
          <Heading level={2} weight="Bold">
            Explore the app
          </Heading>
          <Text
            style={[
              Typography.paragraphMediumRegular,
              openingStyles.appDescription,
            ]}>
            Now your finances are in one place and always under control
          </Text>
        </View>
        <View style={openingStyles.bottomSection}>
          <AppButton variant='primary' style={openingStyles.mb} text='App Button' />
          <AppButton variant='outline' text='App Button' />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default OpeningScreen;
