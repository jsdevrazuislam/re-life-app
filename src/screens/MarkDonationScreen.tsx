import { View, ScrollView, TouchableOpacity, Modal, Platform, Alert, Linking, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import SafeAreaWrapper from '../components/SafeAreaWrapper'
import globalStyles from '../styles/global.style'
import Header from '../components/Header'
import { ms, mvs, ScaledSheet } from 'react-native-size-matters'
import { useTranslation } from '../hooks/useTranslation'
import Heading from '../components/ui/Heading'
import Paragraph from '../components/ui/Paragraph'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { UploadArea } from './KycScreen'
import AppButton from '../components/ui/AppButton'
import ImageComponent from '../components/ui/Image';
import ImageView from 'react-native-image-zoom-viewer';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from '../configs/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles as personalStyles } from '../components/PersonalScreen'
import { Controller, useForm } from 'react-hook-form'
import Textarea from '../components/ui/Textarea'
import { markDonationValidationSchema } from '../validations/signup'
import { yupResolver } from '@hookform/resolvers/yup'
import { requestAndroidPermission } from '../utils/permission'
import * as ImagePicker from 'react-native-image-picker';
import { options } from './FaceScanScreen'
import { showToast } from '../utils/toast'
import { formatFileData } from '../utils/file-format'
import { useAuthStore } from '../store/store'
import LoadingOverlay from '../components/LoadingOverlay'
import { useApi } from '../hooks/useApi'
import ApiStrings from '../lib/apis_string'
import { AppStackParamList } from '../constants/route'
import ErrorMessage from '../components/ErrorMessage'
import { bengaliToEnglishNumber, convertNumber } from '../utils/helper'



const MarkDonationScreen = () => {

    const { control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(markDonationValidationSchema),
        mode: 'onBlur'
    });
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const { t } = useTranslation();
    const route = useRoute<ImamHomeScreenRouteProp>();
    const peopleInformation = route.params?.data as PoorPeople;
    const essentialsNeedsMonthly = peopleInformation.essentialsNeedsMonthly;
    const [visible, setVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [photoLoading, setPhotLoading] = useState(false)
    const { user } = useAuthStore()
    const { loading, request, error } = useApi()


    const openImage = (imageUrl: string) => {
        if (imageUrl) {
            setSelectedImage(imageUrl);
            setVisible(true);
        }
    };

    const calculateRemainingNeeds = (financialNeeds: string, amountOfAssistance: string): string => {
        const financialNeedsAmount = parseFloat(bengaliToEnglishNumber(financialNeeds)) || 0;
        const amountOfAssistanceAmount = parseFloat(bengaliToEnglishNumber(amountOfAssistance.replace(/[^\d০-৯]/g, ''))) || 0;
        return String(financialNeedsAmount - amountOfAssistanceAmount);
    };

    const details = [
        { icon: 'account', label: t('name'), value: peopleInformation.name },
        { icon: 'calendar', label: t('age'), value: `${convertNumber(peopleInformation.age, true)} ${t('years')}` },
        { icon: 'account', label: t('beggerGender1'), value: peopleInformation.gender },
        { icon: 'heart', label: t('beggerMarriageStatus1'), value: peopleInformation.marriageStatus },
        { icon: 'phone', label: t('phoneNumber'), value: convertNumber(peopleInformation.contactNumber, true) },
        { icon: 'map-marker', label: t('currentAddress'), value: peopleInformation.address },
        { icon: 'map-marker', label: t('permanentAddress'), value: peopleInformation.permanentAddress },
    ];

    const essentials = [
        { icon: 'rice', label: t('rice'), value: essentialsNeedsMonthly.rice },
        { icon: 'bowl-mix', label: t('lentils'), value: essentialsNeedsMonthly.lentils },
        { icon: 'water', label: t("oil"), value: essentialsNeedsMonthly.oil },
        { icon: 'food', label: t('otherFoodItems1'), value: essentialsNeedsMonthly.otherFoodItems },
        { icon: 'tshirt-crew', label: t('selfClothing'), value: essentialsNeedsMonthly.clothingForSelf },
        { icon: 'account-group', label: t('familyClothing'), value: essentialsNeedsMonthly.clothingForFamily },
    ];

    const handleImagePicker = async () => {
        if (Platform.OS === 'android') {
            const hasPermission = await requestAndroidPermission();
            if (!hasPermission) {
                Alert.alert(
                    'Permission Denied',
                    'Please enable photo access in Settings to continue.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open Settings', onPress: () => Linking.openSettings() },
                    ]
                );
                return;
            }
        }
        setPhotLoading(true)

        ImagePicker.launchImageLibrary(
            { selectionLimit: 3, ...options },
            (response) => {
                setPhotLoading(false)
                if (response.didCancel) return;
                if (response.errorMessage) {
                    showToast('error', response.errorMessage);
                    return;
                }
                if (response.assets && response.assets.length > 0) {
                    const existingImages: FileType[] = watch('provePictures') ? (watch('provePictures') as FileType[]).filter(Boolean) : [];
                    const anotherAssets = response.assets as IFile[];
                    setValue('provePictures', [...existingImages, ...anotherAssets], { shouldValidate: true });
                }
            }
        );
    };

    const removeImage = (uri?: string) => {
        const existingImages = watch('provePictures') || [];
        setValue('provePictures', existingImages.filter((img: any) => img.uri !== uri), { shouldValidate: true });
    };

    const handleSubmitForm = async (formData: any) => {
        const formDataPayload = new FormData();

        formDataPayload.append('remarks', formData?.remarks)
        formDataPayload.append('masjidId', user?.masjid._id)
        formDataPayload.append('poorPersonId', peopleInformation._id)
        if (formData?.provePictures?.length > 1) {
            formData?.provePictures?.forEach((img: IFile) => {
                if (img?.uri) {
                    formDataPayload.append('provePictures', formatFileData(img));
                }
            });
        }

        const { message } = await request(
            'post',
            ApiStrings.DONATION_PEOPLE,
            formDataPayload
          );

          showToast('success', message);
          reset()
          navigation.navigate('ImamHomeScreen', { activeTab: 'beggers' });
    }

    return (
        <SafeAreaWrapper>
            <LoadingOverlay visible={loading} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={globalStyles.container}>
                    <Header title={t('markAsDonated')} />

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.topHeader}>
                            <Heading level={6} weight="Bold">
                                {t('donationMarktitle')}
                            </Heading>
                            <Paragraph level='Small' style={{ marginTop: 5 }} weight='Regular'>
                                {t('donationMarkdescription')}
                            </Paragraph>
                        </View>

                        <View style={[personalStyles.masjidImage, styles.profileImage]}>
                            <ImageComponent
                                source={peopleInformation.photoUrl}
                                style={personalStyles.profileImage}
                                imageStyle={{ borderRadius: 4 }}
                            />
                            <TouchableOpacity style={personalStyles.expanded} onPress={() => openImage(peopleInformation.photoUrl)}>
                                <SimpleLineIcons color={Colors.white} name='size-fullscreen' size={mvs(12)} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.infoContainer}>
                            {details.map((item, index) => (
                                item.value && (
                                    <View key={index} style={[personalStyles.detailItem, styles.flex]}>
                                        <MaterialIcons
                                            name={item.icon}
                                            size={ms(20)}
                                            color={Colors.primary}
                                            style={personalStyles.icon}
                                        />
                                        <View style={personalStyles.textContainer}>
                                            <Paragraph level='Small' weight='Bold' style={personalStyles.label}>{item.label}</Paragraph>
                                            <Paragraph level='Small' weight='Medium' style={personalStyles.value}>{item.value}</Paragraph>
                                        </View>
                                    </View>
                                )
                            ))}
                        </View>

                        {
                            peopleInformation.receivingAssistance !== 'না' && <View style={styles.financialNeedsContainer}>
                                <Heading level={6} weight='Bold'>{t('totalFinancialNeeds')}</Heading>
                                <Paragraph level='Small' weight='Medium'>{t('totalAmount')}: {convertNumber(peopleInformation.essentialsNeedsMonthly.financialNeeds, true)} টাকা</Paragraph>
                                <Paragraph level='Small' weight='Medium'>{t('assistanceAlreadyGiven')} {peopleInformation.frequency}</Paragraph>
                                <Paragraph level='Small' weight='Medium'>{t('remainingNeeds')} {convertNumber(calculateRemainingNeeds(peopleInformation.essentialsNeedsMonthly.financialNeeds, peopleInformation.frequency), true)} টাকা</Paragraph>
                            </View>
                        }

                        <Heading level={6} weight="Bold">
                            {t('monthlyNeedsTitle')}
                        </Heading>
                        <Paragraph
                            level="Small"
                            weight="Medium"
                        >
                            {t('monthlyNeedsDescription')}
                        </Paragraph>

                        <View style={styles.essentialsNeedsContainer}>
                            {essentials.map((item, index) => (
                                item.value && (
                                    <View key={index} style={[personalStyles.detailItem, styles.flex]}>
                                        <MaterialIcons
                                            name={item.icon}
                                            size={ms(20)}
                                            color={Colors.primary}
                                            style={personalStyles.icon}
                                        />
                                        <View style={personalStyles.textContainer}>
                                            <Paragraph level='Small' weight='Bold' style={personalStyles.label}>{item.label}</Paragraph>
                                            <Paragraph level='Small' weight='Medium' style={personalStyles.value}>{item.value}</Paragraph>
                                        </View>
                                    </View>
                                )
                            ))}
                        </View>

                        <Heading level={6} weight="Bold">
                            {t('proofUploadtitle')}
                        </Heading>
                        <Paragraph
                            level="Small"
                            weight="Medium"
                            style={{ marginBottom: 20 }}
                        >
                            {t('proofUploaddescription')}
                        </Paragraph>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                            <>
                                <Controller
                                    name={'remarks'}
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <Textarea
                                            label={t('donationDetailsTitle')}
                                            value={value ?? ''}
                                            onChangeText={onChange}
                                            placeholder={t('donationDetailsDescription')}
                                            maxLength={300}
                                            numberOfLines={5}
                                            style={{ marginBottom: 10 }}
                                            error={errors.remarks?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='provePictures'
                                    control={control}
                                    render={() => (
                                        <UploadArea
                                            title={t('beggerPhoto')}
                                            imageUri={watch('provePictures')}
                                            handlePress={() => handleImagePicker()}
                                            handleRemove={(uri) => removeImage(uri)}
                                            error={errors.provePictures?.message}
                                            loading={photoLoading}
                                        />
                                    )}
                                />
                            </>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                    <View style={styles.footer}>
                        {
                            error && <ErrorMessage error={error} />
                        }
                        <AppButton text={t('markAsDonated')} onPress={handleSubmit(handleSubmitForm)} />
                    </View>
                </View>

            </KeyboardAvoidingView>
            <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
                <ImageView renderHeader={() => (
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }}
                        onPress={() => setVisible(false)}
                    >
                        <MaterialIcons name="close" size={24} color="white" />
                    </TouchableOpacity>
                )} imageUrls={[{ url: selectedImage }]} onCancel={() => setVisible(false)} enableSwipeDown />
            </Modal>
        </SafeAreaWrapper>
    )
}

export const styles = ScaledSheet.create({
    topHeader: {
        marginTop: 20
    },
    infoContainer: {
        marginTop: 15,
    },
    scrollContent: {
        paddingBottom: '20@s',
    },
    flex: {
        flexDirection: 'row'
    },
    footer: {
        paddingVertical: '15@s',
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderColor: Colors.neutral[200],
    },
    essentialsNeedsContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    essentialsNeeds: {
        marginTop: 10,
    },
    financialNeedsContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: 200,
        margin: 'auto',
        marginTop: 20
    }
})

export default MarkDonationScreen