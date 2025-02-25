import { View } from 'react-native'
import React from 'react'
import { imamStyles } from '../styles/imamHomeStyles';
import Heading from '../components/ui/Heading';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { useAuthStore } from '../store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Paragraph from '../components/ui/Paragraph';
import { Colors } from '../configs/colors';
import { useTranslation } from '../hooks/useTranslation';
import AppButton from '../components/ui/AppButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';


const ImamPendingScreen = () => {

    const { user, logout } = useAuthStore()
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const tryAgain = async () =>{
        await logout()
        navigation.navigate('KycStartedScreen')
    }


    return (
        <SafeAreaWrapper bg={'#DDEBFE'}>
            <View style={imamStyles.kycContainer}>
                <Icon
                    name={user?.kycStatus === 'pending' ? 'hourglass-empty' : 'error-outline'}
                    size={60}
                    color={user?.kycStatus === 'pending' ? Colors.secondary : Colors.danger}
                />
                <Heading level={5} weight='Bold' style={imamStyles.kycTitle}>
                    {user?.kycStatus === 'pending' ? t("kycPendingTitle") : t('kycRejectedTitle')}
                </Heading>
                <Paragraph level='Small' weight='SemiBold' style={imamStyles.kycDescription}>
                    {user?.kycStatus === 'pending'
                        ? t('kycPendingMessage')
                        : user?.rejectionReason ||  t('kycRejectedMessage')}
                </Paragraph>

                {user?.kycStatus === 'rejected' && (
                    <>
                    <AppButton style={{ marginTop: 20, marginBottom: 10}} text={t('contractSupportTitle')} />
                    <AppButton onPress={tryAgain} text={t('tryAgain')} variant='outline' />
                    </>
                )}
            </View>
        </SafeAreaWrapper>
    );
}

export default ImamPendingScreen