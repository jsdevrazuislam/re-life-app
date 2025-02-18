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
import { validateEmail } from '../validations/signup';
import Paragraph from '../components/ui/Paragraph';
import { useApi } from '../hooks/useApi';
import AppButton from '../components/ui/AppButton';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { showToast } from '../utils/toast';

const UpdateEmailScreen = () => {

    const { request, loading, error } = useApi();
    const { logout, setRole } = useAuthStore();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const [email, setEmail] = useState<string>('');
    const { t } = useTranslation();


    const handleSubmit = async () => {
        const { message } = await request('put', ApiStrings.UPDATE_EMAIL, { email });
        setRole('')
        await logout();
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
                            Change Email
                        </Heading>
                        <View />
                    </View>
                    <View style={loginStyles.loginForm}>
                        <Input
                            label={t('email')}
                            placeholder={t('placeholderEmail')}
                            value={email}
                            onChangeText={setEmail}
                            validation={validateEmail}
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
                            text={t('signIn')}
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