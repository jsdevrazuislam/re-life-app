import React from 'react';
import { View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/imamSetting.styles';
import Paragraph from '../components/ui/Paragraph';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import Heading from '../components/ui/Heading';
import { useAuthStore } from '../store/store';
import { useTranslationStore } from '../hooks/useTranslationStore';
import { Colors } from '../configs/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from '../components/ui/Image';
import { convertNumber } from '../utils/helper';

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
      <Icon name={icon} size={24} color={Colors.black} />
      <Paragraph level="Small" weight="Medium" style={styles.itemLabel}>
        {label}
      </Paragraph>
    </View>
    {rightComponent || <Icon name="chevron-right" size={24} color={Colors.textSecondary} />}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const { language, setLanguage } = useTranslationStore();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { user } = useAuthStore();
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
                imageStyle={{ borderRadius: 50 }}
              />
            </View>
            <Heading level={6} weight="Bold" style={styles.userName}>
              {user?.fullName}
            </Heading>
            <Paragraph level="Small" weight="Medium" style={styles.userEmail}>
              {user?.emailOrPhone.includes('@') ? user?.emailOrPhone : convertNumber(user?.emailOrPhone ?? '')}
            </Paragraph>
          </View>

          <View style={styles.settingsGroup}>
            <SettingItem
              icon="notifications"
              label={t('title')}
              onPress={() => navigation.navigate('NotificationScreen')}
            />
            {
              user?.role === 'imam' &&
              <>
                <SettingItem
                  icon="supervisor-account"
                  label={t('donatedPeopleListTitle')}
                  onPress={() => navigation.navigate('DonationHistoryScreen')}
                />
                <SettingItem
                  icon="remove-red-eye"
                  label={t('requestView')}
                  onPress={() => navigation.navigate('RequestAccessView')}
                />
                <SettingItem
                  icon="lock"
                  label={t('changePasswordTitle')}
                  onPress={() => navigation.navigate('ChangePasswordScreen')}
                />
                <SettingItem
                  icon="email"
                  label={t('emailOrPhoneChange')}
                  onPress={() => navigation.navigate('UpdateEmailScreen')}
                />
              </>
            }
            <SettingItem
              icon="language"
              label={`${t('switchLanguageTitle')}`}
              rightComponent={
                <Switch
                  value={language === 'bn'}
                  onValueChange={val => setLanguage(val ? 'bn' : 'en')}
                  trackColor={{ false: Colors.neutral[400], true: Colors.primary }}
                  thumbColor={language === 'bn' ? Colors.primary : Colors.neutral[600]}
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
