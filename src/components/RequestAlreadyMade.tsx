import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { mvs } from 'react-native-size-matters';
import { Colors } from '../configs/colors';
import Paragraph from './ui/Paragraph';
import AppButton from './ui/AppButton';
import { useTranslation } from '../hooks/useTranslation';

const RequestAlreadyMade = ({ tryAgain }: { tryAgain: () => void }) => {

    const { t } = useTranslation()

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialIcons name="warning" size={mvs(40)} color={Colors.warning} />
            </View>
            <View style={styles.textContainer}>
                <Paragraph level='Large' weight='Bold' style={styles.heading}>দুঃখিত, আপনি ইতিমধ্যেই এই অনুরোধ করেছেন</Paragraph>
                <Paragraph level='Small' weight='Medium' style={styles.description}>
                    এই তথ্যটি সম্পাদনা করার জন্য অনুগ্রহ করে অপেক্ষা করুন। আমাদের অ্যাডমিন আপনার তথ্য পর্যালোচনা করবেন এবং আপনার অনুরোধটি অনুমোদিত বা প্রত্যাখ্যাত হবে।
                </Paragraph>
            </View>
            <AppButton style={{ marginTop: 20 }} onPress={tryAgain} text={t('tryAgain')} variant='primary' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.white,
        borderRadius: 10,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    iconContainer: {
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    heading: {
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        color: Colors.text,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default RequestAlreadyMade;
