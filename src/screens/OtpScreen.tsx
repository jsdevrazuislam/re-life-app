import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import otpStyles from '../styles/otpScreen.styles';
import BackButton from '../components/BackButton';
import AppLogo from '../components/ui/AppLogo';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import { useTranslation } from '../hooks/useTranslation';
import AppButton from '../components/ui/AppButton';
import { showToast } from '../utils/toast';
import { useApi } from '../hooks/useApi';
import ErrorMessage from '../components/ErrorMessage';
import { useAuthStore } from '../store/store';
import ApiStrings from '../lib/apis_string';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const OtpScreen = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);
    const { t } = useTranslation();
    const { request, loading, error } = useApi();
    const { userTempId, setUserId } = useAuthStore()
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();


    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsResendDisabled(false);
        }
    }, [timer]);

    const handleResendCode = () => {
        setTimer(20);
        setIsResendDisabled(true);
        showToast('success', 'A new code has been sent to your email.');
    };

    const handleVerify = async () => {
        const payload = {
            userId: userTempId,
            otpCode: otp
        }
        const { message } = await request('post', ApiStrings.OTP_VERIFY, payload);
        setUserId('')
        showToast('success', message)
        navigation.navigate('KycStartedScreen')
    };

    const handleOtpChange = (text: string) => {
        setOtp(text);
        setIsVerifyDisabled(text.length !== 4);
    };

    return (
        <SafeAreaWrapper>
            <ScrollView>
                <View style={globalStyles.container}>
                    <View style={otpStyles.headerNavigation}>
                        <BackButton />
                        <AppLogo />
                    </View>
                    <Heading level={3} weight="Bold">
                        {t('checkEmail')}
                    </Heading>
                    <Paragraph level="Medium">{t('codeSentTo')}</Paragraph>
                    <View style={otpStyles.otpContainer}>
                        {Array(4)
                            .fill('')
                            .map((_, index) => (
                                <TextInput
                                    key={index}
                                    style={otpStyles.otpInput}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onChangeText={text => {
                                        const newOtp = otp.split('');
                                        newOtp[index] = text;
                                        handleOtpChange(newOtp.join(''));
                                    }}
                                    value={otp[index] || ''}
                                />
                            ))}
                    </View>
                    {error && <ErrorMessage error={error} />}
                    <AppButton
                        loading={loading}
                        onPress={handleVerify}
                        disabled={isVerifyDisabled}
                        variant="primary"
                        text={t('verify')}
                    />
                    <TouchableOpacity
                        style={otpStyles.resendButton}
                        onPress={handleResendCode}
                        disabled={isResendDisabled || loading}>
                        <Paragraph
                            level="Small"
                            weight="SemiBold"
                            style={otpStyles.resendText}>
                            Resend {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : ''}
                        </Paragraph>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    );
};

export default OtpScreen;
