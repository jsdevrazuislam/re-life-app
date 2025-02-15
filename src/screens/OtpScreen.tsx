import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Alert,
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

const OtpScreen = () => {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);
    const { t } = useTranslation();

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
        Alert.alert('Code Resent', 'A new code has been sent to your email.');
    };

    const handleVerify = () => {
        Alert.alert('Verified', 'Your OTP has been verified successfully.');
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
                    <AppButton onPress={handleVerify} disabled={isVerifyDisabled} variant='primary' text={t('verify')} />
                    <TouchableOpacity
                        style={otpStyles.resendButton}
                        onPress={handleResendCode}
                        disabled={isResendDisabled}
                    >
                        <Paragraph level='Small' weight='SemiBold' style={otpStyles.resendText}>
                            Resend {timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : ''}
                        </Paragraph>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    );
};

export default OtpScreen;
