import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import styles from '../styles/imamSetting.styles';
import BackButton from '../components/BackButton';
import Heading from '../components/ui/Heading';
import loginStyles from '../styles/login.style';
import { useTranslation } from '../hooks/useTranslation';
import Input from '../components/ui/AppInput';
import { validatePassword } from '../validations/signup';
import Paragraph from '../components/ui/Paragraph';
import { useApi } from '../hooks/useApi';
import AppButton from '../components/ui/AppButton';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { showToast } from '../utils/toast';

const ChangePasswordScreen = () => {
    const { request, loading, error } = useApi();
    const { logout, setRole } = useAuthStore();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPasword: '',
    });

    const handleSubmit = async () => {
        if(formData.newPassword !== formData.confirmPasword) {
            showToast('error', "New password and confirm password do not match.");
            return;
        }
    
        if (!formData.currentPassword.trim()) {
            showToast('error', "Current password is required.");
            return;
        }


        const { message } = await request('put', ApiStrings.CHANGE_PASSWORD, { oldPassword: formData.currentPassword, newPassword: formData.newPassword});
        setRole('')
        logout();
        showToast('success', message);
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaWrapper>
            <ScrollView>
                <View style={globalStyles.container}>
                    <View style={styles.header}>
                        <BackButton />
                        <Heading level={5} weight="Bold" style={styles.headerTitle}>
                            Change Password
                        </Heading>
                        <View />
                    </View>
                    <View style={loginStyles.loginForm}>
                        <Input
                            label={t('password')}
                            placeholder={t('placeholderPassword')}
                            value={formData.currentPassword}
                            onChangeText={text =>
                                setFormData({ ...formData, currentPassword: text })
                            }
                            validation={validatePassword}
                            secureTextEntry
                        />
                        <Input
                            label={t('password')}
                            placeholder={t('placeholderPassword')}
                            value={formData.newPassword}
                            onChangeText={text =>
                                setFormData({ ...formData, newPassword: text })
                            }
                            validation={validatePassword}
                            secureTextEntry
                        />
                        <Input
                            label={t('password')}
                            placeholder={t('placeholderPassword')}
                            value={formData.confirmPasword}
                            onChangeText={text =>
                                setFormData({ ...formData, confirmPasword: text })
                            }
                            validation={validatePassword}
                            secureTextEntry
                        />
                        {error && (
                            <Paragraph
                                style={loginStyles.errorMessage}
                                level="Small"
                                weight="SemiBold">
                                {error}
                            </Paragraph>
                        )}
                        <AppButton
                            text={t('signIn')}
                            onPress={handleSubmit}
                            variant="primary"
                            loading={loading}
                            style={{ marginTop: '55%' }}
                            disabled={!formData.confirmPasword || !formData.currentPassword || !formData.newPassword || loading}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    );
};

export default ChangePasswordScreen;
