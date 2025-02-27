import React from 'react';
import {View, ScrollView, TouchableOpacity, Switch, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/imamSetting.styles';
import Paragraph from '../components/ui/Paragraph';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import Heading from '../components/ui/Heading';
import {useAuthStore} from '../store/store';
import {baseURLPhoto} from '../lib/api';
import {useTranslationStore} from '../hooks/useTranslationStore';
import {Colors} from '../configs/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../constants/route';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from '../components/ui/Image';

type SettingItemProps = {
  icon: string;
  label: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
};

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  onPress,
  rightComponent,
}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Icon name={icon} size={24} color="#333" />
      <Paragraph level="Small" weight="Medium" style={styles.itemLabel}>
        {label}
      </Paragraph>
    </View>
    {rightComponent || <Icon name="chevron-right" size={24} color="#666" />}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const {language, setLanguage} = useTranslationStore();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const {user} = useAuthStore();
  const { t } = useTranslation()

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View style={globalStyles.container}>
          <Header title={t('settingsTitle')} />

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <ImageComponent
                source={user?.profileUrl ?? ""}
                style={styles.avatar}
                imageStyle={{ borderRadius: 50}}
              />
            </View>
            <Heading level={6} weight="Bold" style={styles.userName}>
              {user?.fullName}
            </Heading>
            <Paragraph level="Small" weight="Medium" style={styles.userEmail}>
              {user?.email}
            </Paragraph>
          </View>

          <View style={styles.settingsGroup}>
            <SettingItem
              icon="lock"
              label={t('changePasswordTitle')}
              onPress={() => navigation.navigate('ChangePasswordScreen')}
            />
            <SettingItem
              icon="email"
              label={t('updateEmailTitle')}
              onPress={() => navigation.navigate('UpdateEmailScreen')}
            />
            <SettingItem
              icon="language"
              label={`${t('switchLanguageTitle')} ${language}`}
              rightComponent={
                <Switch
                  value={language === 'bn'}
                  onValueChange={val => setLanguage(val ? 'bn' : 'en')}
                  trackColor={{false: '#767577', true: Colors.primary}}
                  thumbColor={language === 'bn' ? Colors.primary : '#f4f3f4'}
                />
              }
            />
            <SettingItem
              icon="privacy-tip"
              label={t('privacyPolicyTitle')}
              onPress={() => console.log('Navigate to PrivacyPolicy')}
            />
            <SettingItem
              icon="help-center"
              label={t('helpSupportTitle')}
              onPress={() => console.log('Navigate to HelpScreen')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default SettingsScreen;
