import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
import { Colors } from '../configs/colors';
import LoadingOverlay from '../components/LoadingOverlay';

const OtpScreen = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);
    const { t } = useTranslation();
    const { request, loading, error } = useApi();
    const { userTempId, setStatus, userTempEmail, setUserId, setTempEmail } =
        useAuthStore();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const inputRefs = useRef<Array<TextInput | null>>([]);

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

    const handleResendCode = async () => {
        const { data } = await request('post', ApiStrings.RESEND_OTP, {
            emailOrPhone: userTempEmail,
        });
        setUserId(data?.id);
        setTempEmail(data?.email);
        setTimer(60);
        setIsResendDisabled(true);
        showToast('success', 'A new code has been sent to your email.');
    };

    const handleVerify = async () => {
        const payload = {
            userId: userTempId,
            otpCode: otp.join(''),
        };
        if (userTempEmail) {
            const { message, data } = await request(
                'post',
                ApiStrings.OTP_VERIFY,
                payload,
            );
            setStatus(data);
            showToast('success', message);
            navigation.navigate('KycStartedScreen');
        } else {
            const { message, data } = await request(
                'post',
                ApiStrings.OTP_CHECK,
                payload,
            );
            setStatus(data);
            showToast('success', message);
            navigation.navigate('ResetPasswordScreen', { otp: otp.join('') });
        }
    };

    const handleOtpChange = (text: string, index: number) => {
        if (!/^\d?$/.test(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        setIsVerifyDisabled(newOtp.some(val => val === ''));

        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (text: string, index: number) => {
        if (!text && index > 0) {
            inputRefs.current[index - 1]?.focus(); // Move back on delete
        }
    };

    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss}
                    >
                        <View style={globalStyles.container}>
                            <LoadingOverlay visible={loading} />
                            <View style={otpStyles.headerNavigation}>
                                <BackButton />
                                <AppLogo />
                            </View>
                            <Heading level={3} weight="Bold">
                                {t('otpTitle')}
                            </Heading>
                            <Paragraph level="Medium">
                                {t('otpDescription')} {userTempEmail?.toLowerCase()}
                            </Paragraph>
                            <View style={otpStyles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={ref => (inputRefs.current[index] = ref)}
                                        style={otpStyles.otpInput}
                                        maxLength={1}
                                        keyboardType="numeric"
                                        value={digit}
                                        onChangeText={text => handleOtpChange(text, index)}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === 'Backspace') {
                                                handleBackspace(digit, index);
                                            }
                                        }}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </View>
                            {error && <ErrorMessage error={error} />}
                            <AppButton
                                onPress={handleVerify}
                                disabled={isVerifyDisabled}
                                variant="primary"
                                text={t('verifyOtpButton')}
                            />
                            <TouchableOpacity
                                style={otpStyles.resendButton}
                                onPress={handleResendCode}
                                disabled={isResendDisabled || loading}>
                                {timer > 0 ? (
                                    <Paragraph
                                        level="Small"
                                        weight="SemiBold"
                                        style={otpStyles.resendText}>
                                        {t('resendOtpIn')}{' '}
                                        {timer}
                                        {t('resendOtpIn1')}
                                    </Paragraph>
                                ) : (
                                    <Paragraph
                                        level="Small"
                                        weight="SemiBold"
                                        style={otpStyles.resendText}>
                                        {t('resendOtp')}
                                    </Paragraph>
                                )}
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default OtpScreen;
