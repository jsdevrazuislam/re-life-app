import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { imamStyles } from '../styles/imamHomeStyles';
import Heading from '../components/ui/Heading';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { useAuthStore } from '../store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Paragraph from '../components/ui/Paragraph';
import { Colors } from '../configs/colors';


const ImamPendingScreen = () => {

    const { user } = useAuthStore()


    return (
        <SafeAreaWrapper bg={'#DDEBFE'}>
            <View style={imamStyles.kycContainer}>
                <Icon
                    name={user?.kycStatus === 'pending' ? 'hourglass-empty' : 'error-outline'}
                    size={60}
                    color={user?.kycStatus === 'pending' ? Colors.secondary : Colors.danger}
                />
                <Heading level={5} weight='Bold' style={imamStyles.kycTitle}>
                    {user?.kycStatus === 'pending' ? 'KYC Verification Pending' : 'KYC Verification Rejected'}
                </Heading>
                <Paragraph level='Small' weight='SemiBold' style={imamStyles.kycDescription}>
                    {user?.kycStatus === 'pending'
                        ? 'Your KYC verification is under review. Please wait for approval.'
                        : 'Your KYC verification was rejected. Please contact support for further assistance.'}
                </Paragraph>

                {user?.kycStatus === 'rejected' && (
                    <TouchableOpacity style={imamStyles.supportButton}>
                        <Text style={imamStyles.supportButtonText}>Contact Support</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaWrapper>
    );
}

export default ImamPendingScreen