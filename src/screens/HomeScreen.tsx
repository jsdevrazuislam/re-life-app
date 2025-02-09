import {View, Text} from 'react-native';
import React from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Paragraph from '../components/ui/Paragraph';
import {ScrollView} from 'react-native-gesture-handler';
import globalStyles from '../styles/global.style';
import homeStyles from '../styles/home.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppLogo from '../components/ui/AppLogo';
import AreaSelector from '../components/AreaSelector';

const HomeScreen = () => {
  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={homeStyles.headerSection}>
            <AppLogo />
            <Paragraph level="Medium">Search Masjid</Paragraph>
            <Icon name="user-circle" size={24} />
          </View>
          <AreaSelector />
          <AreaSelector />
          <AreaSelector />
          <AreaSelector />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
