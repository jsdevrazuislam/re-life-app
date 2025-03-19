import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, Linking, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaWrapper from '../components/SafeAreaWrapper'
import globalStyles from '../styles/global.style'
import BackButton from '../components/BackButton'
import LoadingOverlay from '../components/LoadingOverlay'
import Heading from '../components/ui/Heading'
import Paragraph from '../components/ui/Paragraph'
import { useTranslation } from '../hooks/useTranslation'
import { ScaledSheet } from 'react-native-size-matters'
import { Controller, useForm } from 'react-hook-form'
import { UploadArea } from './KycScreen'
import { rehabilitationSchema } from '../validations/signup'
import { yupResolver } from '@hookform/resolvers/yup'
import { requestAndroidPermission } from '../utils/permission'
import { options } from './FaceScanScreen'
import * as ImagePicker from 'react-native-image-picker';
import { showToast } from '../utils/toast'
import CustomDatePicker from '../components/DatePicker'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import { rehabilitationType } from '../data/dump'
import Input from '../components/ui/AppInput'
import AppButton from '../components/ui/AppButton'
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from '../configs/colors'
import { useApi } from '../hooks/useApi'
import ApiStrings from '../lib/apis_string'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { formatFileData } from '../utils/file-format'
import { useAuthStore } from '../store/store'
import { AppStackParamList } from '../constants/route'



const RehabilitationScreen = () => {
    const route = useRoute<ImamHomeScreenRouteProp>();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const poorPeople = route.params?.item as PoorPeople;
    const [photoLoading, setPhotoLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(null);
    const { loading, request, error } = useApi()
    const { control, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(rehabilitationSchema),
        mode: 'onBlur'
    });
    const { t } = useTranslation()
    const { user, loadUserFromStorage } = useAuthStore()

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

        setPhotoLoading(true)
        ImagePicker.launchImageLibrary(
            { selectionLimit: 3, ...options },
            (response) => {
                setPhotoLoading(false)
                if (response.didCancel) return;
                if (response.errorMessage) {
                    showToast('error', response.errorMessage);
                    return;
                }
                if (response.assets && response.assets.length > 0) {
                    setValue('provePictures', response.assets as IFile[], { shouldValidate: true });
                }
            }
        );
    };

    const removeImage = (uri?: string) => {
        const existingImages = watch('provePictures') || [];
        setValue('provePictures', existingImages.filter((img: any) => img.uri !== uri), { shouldValidate: true });
    };

    const handleSubmitForm = async () => {
        const { message } = await request('post', ApiStrings.CREATE_REHEB, formDataToSubmit)
        showToast('success', message)
        reset()
        setModalVisible(false);
        navigation.navigate("RehabilitationDashboard")
        loadUserFromStorage()
    }

    const handleForm = (formData: any) => {
        setModalVisible(true);
        const formDataPayload = new FormData();
        formDataPayload.append("personId", poorPeople._id);
        formDataPayload.append("masjidId", user?.masjid._id);
        formDataPayload.append("rehabilitationType", formData.rehabilitationType);
        formDataPayload.append("details", formData.details);
        formDataPayload.append("financialSupport", formData.financialSupport);
        formDataPayload.append("startDate", String(formData.startDate));

        if (formData?.provePictures?.length > 0) {
            formData?.provePictures?.forEach((profile: any) => {
                if (profile.uri) {
                    formDataPayload.append(`provePictures`, formatFileData(profile));
                }
            });
        }

        setFormDataToSubmit(formDataPayload);
    };



    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={globalStyles.container}>
                    <BackButton />
                    <LoadingOverlay visible={loading} />
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Heading style={{ marginTop: 10 }} level={4} weight="Bold">
                            {t('rehabilitation.addPerson.title')}
                        </Heading>
                        <Paragraph level='Small'>{t('rehabilitation.addPerson.description')}</Paragraph>

                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.form}>
                                <Controller
                                    name='provePictures'
                                    control={control}
                                    render={() => (
                                        <UploadArea
                                            title={t('rehabilitation.pictures.label')}
                                            imageUri={watch('provePictures')}
                                            handlePress={() => handleImagePicker()}
                                            handleRemove={(uri) => removeImage(uri)}
                                            error={errors.provePictures?.message}
                                            loading={photoLoading}
                                        />
                                    )}
                                />
                                <Controller
                                    name='rehabilitationType'
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            label={t('rehabilitation.rehabilitationType.label')}
                                            placeholder={t('rehabilitation.rehabilitationType.placeholder')}
                                            value={field.value}
                                            onChange={field.onChange}
                                            data={rehabilitationType}
                                            rootStyle={{ marginTop: 20 }}
                                            error={errors.rehabilitationType?.message}
                                        />

                                    )}
                                />
                                <Controller
                                    name='financialSupport'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder={t('rehabilitation.financialSupport.label')}
                                            label={t('rehabilitation.financialSupport.placeholder')}
                                            value={field.value}
                                            onChangeText={field.onChange}
                                            keyboardType="numeric"
                                            isNumber={true}
                                            error={errors.financialSupport?.message}
                                        />

                                    )}
                                />
                                <Controller
                                    name='startDate'
                                    control={control}
                                    render={({ field }) => (
                                        <CustomDatePicker
                                            label={t('rehabilitation.startDate.label')}
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={errors.startDate?.message}

                                        />

                                    )}
                                />
                                <Controller
                                    name='details'
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            label={t('rehabilitation.details.label')}
                                            value={field.value ?? ''}
                                            onChangeText={field.onChange}
                                            placeholder={t('rehabilitation.details.placeholder')}
                                            maxLength={300}
                                            numberOfLines={5}
                                            error={errors.details?.message}
                                        />

                                    )}
                                />

                                <AppButton text={t('submit')} style={{ marginTop: 20 }} onPress={handleSubmit(handleForm)} />


                            </View>

                        </TouchableWithoutFeedback>

                    </ScrollView>


                    <Modal visible={modalVisible} transparent animationType="fade">
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Icon name="error-outline" size={40} color={Colors.warning} style={styles.icon} />
                                <Paragraph level='Medium' weight='Bold' style={styles.title}>নিশ্চিতকরণ</Paragraph>
                                <Paragraph level='Small' style={styles.message}>আপনি কি নিশ্চিত যে এই ব্যক্তি পুনর্বাসিত হয়েছেন?</Paragraph>

                                <AppButton text='হ্যাঁ, নিশ্চিত করুন' onPress={ async () => {
                                    if (formDataToSubmit) {
                                        setModalVisible(false)
                                        await handleSubmitForm();
                                    }
                                }} />
                                <AppButton style={{ marginTop: 15 }} text='বাতিল করুন' variant='outline' onPress={() => setModalVisible(false)} />

                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    )
}

export const styles = ScaledSheet.create({
    form: {
        marginTop: '20@vs',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContent: {
        paddingBottom: '20@s',
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    modalContent: {
        width: "90%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    message: {
        textAlign: "center",
        marginBottom: 20,
    },
    confirmText: {
        color: "white",
        fontWeight: "bold",
    },
    cancelText: {
        marginTop: 10,
        color: Colors.dark,
    },
})

export default RehabilitationScreen