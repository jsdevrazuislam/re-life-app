import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import loginStyles from '../styles/login.style';
import { useTranslation } from '../hooks/useTranslation';
import Input from '../components/ui/AppInput';
import Paragraph from '../components/ui/Paragraph';
import { useApi } from '../hooks/useApi';
import AppButton from '../components/ui/AppButton';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { showToast } from '../utils/toast';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';

const ChangePasswordScreen = () => {
    const { request, loading, error } = useApi();
    const { logout } = useAuthStore();
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
        await logout();
        showToast('success', message);
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaWrapper>
            <ScrollView>
                <LoadingOverlay visible={loading} />
                <View style={globalStyles.container}>
                    <Header title={t('changePasswordTitle')} />
                    <View style={loginStyles.loginForm}>
                        <Input
                            label={t('currentPasswordLabel')}
                            placeholder={t('currentPasswordPlaceholder')}
                            value={formData.currentPassword}
                            onChangeText={text =>
                                setFormData({ ...formData, currentPassword: text })
                            }
                            secureTextEntry
                        />
                        <Input
                            label={t('newPasswordLabel')}
                            placeholder={t('newPasswordPlaceholder')}
                            value={formData.newPassword}
                            onChangeText={text =>
                                setFormData({ ...formData, newPassword: text })
                            }
                            secureTextEntry
                        />
                        <Input
                            label={t('confirmPasswordLabel')}
                            placeholder={t('confirmPasswordPlaceholder')}
                            value={formData.confirmPasword}
                            onChangeText={text =>
                                setFormData({ ...formData, confirmPasword: text })
                            }
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
                            text={t('changePasswordButton')}
                            onPress={handleSubmit}
                            variant="primary"
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
