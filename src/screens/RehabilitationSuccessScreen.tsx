import { View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import { Colors } from '../configs/colors';
import ImageComponent from '../components/ui/Image';
import { convertNumber, getTimeDifference } from '../utils/helper';
import { format } from 'date-fns';
import AppButton from '../components/ui/AppButton';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const RehabilitationStatusScreen = ({ status = 'completed', poorPeople, onPress }: { status: string, poorPeople: PersonItemProps, onPress: () => void }) => {

    const viewShotRef = useRef(null);
    const { t } = useTranslation()

    const shareProfile = async () => {
        const uri = await captureRef(viewShotRef, {
            format: 'png',
            quality: 1,
        });

        const shareOptions = {
            title: isSuccess ? t('rehabilitation.successStory') : t('rehabilitation.failureReason'),
            message: poorPeople.story,
            url: uri,
            type: 'image/png',
        };

        await Share.open(shareOptions);
    };


    const isSuccess = status === 'completed';

    return (
        <ViewShot style={{ flex: 1}} ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <LinearGradient
                    colors={isSuccess ? [Colors.secondary, Colors.primary] : ['#F44336', '#E91E63']}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.checkmarkCircle}>
                        <MaterialIcons name={isSuccess ? "check" : "close"} size={40} color="white" />
                    </View>
                    <Heading level={2} style={styles.headerTitle}>
                        {isSuccess ? t('rehabilitation.successMessage') : t('rehabilitation.failureMessage')}
                    </Heading>
                </LinearGradient>

                <View style={styles.profileSection}>
                    <ImageComponent
                        source={poorPeople.personId.photoUrl}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <Heading level={3} weight='Bold' style={styles.name}>
                            {poorPeople.personId.name}
                        </Heading>
                        <Paragraph level='Small' weight='Medium' style={styles.details}>{t('age')}: {convertNumber(poorPeople.personId.age)} {t('years')} | {poorPeople.personId.address}</Paragraph>
                        <View style={styles.dateBadge}>
                            <FontAwesome5 name="calendar-check" size={14} color="white" />
                            <Paragraph level='Small' weight='Medium' style={styles.dateText}>
                                {format(poorPeople.endDate, "yyyy-MM-dd")}
                            </Paragraph>
                        </View>
                    </View>
                </View>

                {/* Stats Card */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <MaterialIcons name="attach-money" size={24} color={Colors.primary} />
                        <Heading level={4} style={styles.statValue}>{poorPeople.financialSupport} ৳</Heading>
                        <Paragraph level='Small' weight='Medium' style={styles.statLabel}>{t('rehabilitation.investment')}</Paragraph>
                    </View>

                    <View style={styles.statCard}>
                        <MaterialIcons name="timeline" size={24} color={Colors.warning} />
                        <Heading level={4} style={styles.statValue}>{getTimeDifference(poorPeople.startDate, poorPeople.endDate)}</Heading>
                        <Paragraph level='Small' weight='Medium' style={styles.statLabel}>{t('rehabilitation.duration')}</Paragraph>
                    </View>
                </View>

                <View style={styles.buttonGroup}>
                    <AppButton text={t('goBack')} variant='outline' onPress={onPress} />
                    <AppButton text='সাফল্য শেয়ার করুন' style={{ marginTop: 15 }} onPress={shareProfile} />
                </View>

                <View style={styles.successStory}>
                    <Heading level={3} style={styles.storyTitle}>{ isSuccess ?  t('rehabilitation.successStory') : t('rehabilitation.failureReason')}</Heading>
                    <Paragraph level='Small' weight='Medium' style={styles.storyText}>
                        {poorPeople.story}
                    </Paragraph>
                </View>
            </ScrollView>
        </ViewShot>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white,
    },
    header: {
        padding: 24,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 40,
    },
    checkmarkCircle: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 22,
        color: Colors.white,
        fontWeight: '600',
        textAlign: 'center',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        marginTop: -30,
        borderRadius: 16,
        padding: 16,
        elevation: 3,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
    },
    details: {
        fontSize: 14,
        color: Colors.dark,
        marginVertical: 4,
    },
    dateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    dateText: {
        color: Colors.white,
        marginLeft: 6,
        fontSize: 12,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 24,
    },
    statCard: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        width: '48%',
        alignItems: 'center',
        elevation: 2,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginVertical: 8,
    },
    statLabel: {
        fontSize: 14,
        color: Colors.text,
    },
    buttonGroup: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    buttonText: {
        color: Colors.white,
        fontWeight: '500',
        marginLeft: 8,
    },
    successStory: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.neutral[200]
    },
    storyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
    },
    storyText: {
        fontSize: 14,
        color: Colors.lightGray,
        lineHeight: 22,
    },
});

export default RehabilitationStatusScreen;
