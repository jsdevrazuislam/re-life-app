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
import { Controller, useForm } from 'react-hook-form';
import { emailValidationSchema } from '../validations/login';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingOverlay from '../components/LoadingOverlay';

const UpdateEmailScreen = () => {

    const { request, loading, error } = useApi();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(emailValidationSchema),
        mode: 'onBlur'
    });
    const { logout } = useAuthStore();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const { t } = useTranslation();


    const handleSubmitForm = async (form: { emailOrPhone: string }) => {
        const { message } = await request('put', ApiStrings.UPDATE_EMAIL, { emailOrPhone: form.emailOrPhone });
        await logout();
        showToast('success', message);
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaWrapper>
            <ScrollView>
                <LoadingOverlay visible={loading} />
                <View style={globalStyles.container}>
                    <Header title={t('updateEmailTitle')} />
                    <View style={loginStyles.loginForm}>
                        <Controller
                            name='emailOrPhone'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    label={t('emailOrPhoneLabel')}
                                    placeholder={t('emailOrPhonePlaceholder')}
                                    value={value}
                                    onChangeText={onChange}
                                    error={errors?.emailOrPhone?.message}
                                    keyboardType="email-address"
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
                            text={t('updateEmailButton')}
                            onPress={handleSubmit(handleSubmitForm)}
                            variant="primary"
                            loading={loading}
                            style={{ marginTop: '110%' }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    )
}

export default UpdateEmailScreen