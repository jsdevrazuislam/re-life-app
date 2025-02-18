import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/imamSetting.styles'
import Paragraph from '../components/ui/Paragraph';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import Heading from '../components/ui/Heading';
import BackButton from '../components/BackButton';
import { useAuthStore } from '../store/store';
import { baseURLPhoto } from '../lib/api';

type SettingItemProps = {
    icon: string;
    label: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
        <View style={styles.itemLeft}>
            <Icon name={icon} size={24} color="#333" />
            <Paragraph level='Small' weight='Medium' style={styles.itemLabel}>{label}</Paragraph>
        </View>
        {rightComponent || <Icon name="chevron-right" size={24} color="#666" />}
    </TouchableOpacity>
);

const SettingsScreen = () => {
    const [language, setLanguage] = useState<'en' | 'bn'>('en');
    const { user } = useAuthStore()



    return (
        <SafeAreaWrapper>
            <ScrollView>

                <View style={globalStyles.container}>
                    <View style={styles.header}>
                        <BackButton />
                        <Heading level={5} weight='Bold' style={styles.headerTitle}>Settings</Heading>
                        <View />
                    </View>

                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: baseURLPhoto(user?.profileUrl ?? "") }}
                                style={styles.avatar}
                            />
                        </View>
                        <Heading level={6} weight='Bold' style={styles.userName}>{user?.fullName}</Heading>
                        <Paragraph level='Small' weight='Medium' style={styles.userEmail}>{user?.email}</Paragraph>
                    </View>

                    <View style={styles.settingsGroup}>
                        <SettingItem
                            icon="lock"
                            label="Change Password"
                            onPress={() => console.log('Navigate to UpdatePasswordScreen')}
                        />
                        <SettingItem
                            icon="email"
                            label="Update Email"
                            onPress={() => console.log('Navigate to UpdateEmailScreen')}
                        />
                        <SettingItem
                            icon="language"
                            label="Switch Language"
                            rightComponent={
                                <Switch
                                    value={language === 'bn'}
                                    onValueChange={(val) => setLanguage(val ? 'bn' : 'en')}
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={language === 'bn' ? '#3F51B5' : '#f4f3f4'}
                                />
                            }
                        />
                    </View>

                    <View style={styles.settingsGroup}>
                        <SettingItem
                            icon="privacy-tip"
                            label="Privacy Policy & Security"
                            onPress={() => console.log('Navigate to PrivacyPolicy')}
                        />
                        <SettingItem
                            icon="help-center"
                            label="Help & Support"
                            onPress={() => console.log('Navigate to HelpScreen')}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    );
};


export default SettingsScreen;