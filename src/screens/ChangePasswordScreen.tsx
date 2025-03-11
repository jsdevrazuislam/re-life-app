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
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordValidationSchema } from '../validations/login';

const ChangePasswordScreen = () => {
    const { request, loading, error } = useApi();
    const { logout } = useAuthStore();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const { t } = useTranslation()
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(passwordValidationSchema),
        mode: 'onBlur'
    });

    const handleSubmitForm = async (formData: { currentPassword: string, newPassword: string }) => {
        const { message } = await request('put', ApiStrings.CHANGE_PASSWORD, { oldPassword: formData.currentPassword, newPassword: formData.newPassword });
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
                        <Controller
                            name='currentPassword'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    label={t('currentPasswordLabel')}
                                    placeholder={t('currentPasswordPlaceholder')}
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors?.currentPassword?.message}
                                    secureTextEntry
                                />
                            )}
                        />
                        <Controller
                            name='newPassword'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    label={t('newPasswordLabel')}
                                    placeholder={t('newPasswordPlaceholder')}
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors?.newPassword?.message}
                                    secureTextEntry
                                />
                            )}
                        />
                        <Controller
                            name='confirmPassword'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    label={t('confirmPasswordLabel')}
                                    placeholder={t('confirmPasswordPlaceholder')}
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors?.confirmPassword?.message}
                                    secureTextEntry
                                />
                            )}
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
                            onPress={handleSubmit(handleSubmitForm)}
                            variant="primary"
                            style={{ marginTop: '55%' }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    );
};

export default ChangePasswordScreen;
