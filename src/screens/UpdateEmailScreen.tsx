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

const UpdateEmailScreen = () => {

    const { request, loading, error } = useApi();
    const { logout } = useAuthStore();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const [email, setEmail] = useState<string>('');
    const { t } = useTranslation();


    const handleSubmit = async () => {
        const { message } = await request('put', ApiStrings.UPDATE_EMAIL, { email });
        await logout();
        showToast('success', message);
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaWrapper>
            <ScrollView>
                <View style={globalStyles.container}>
                    <Header title={t('updateEmailTitle')} />
                    <View style={loginStyles.loginForm}>
                        <Input
                            label={t('emailOrPhoneLabel')}
                            placeholder={t('emailOrPhonePlaceholder')}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
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
                            onPress={handleSubmit}
                            variant="primary"
                            loading={loading}
                            style={{ marginTop: '110%' }}
                            disabled={!email || loading}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    )
}

export default UpdateEmailScreen