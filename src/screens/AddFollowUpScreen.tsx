import { View, Text, Platform, Alert, Linking, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useApi } from '../hooks/useApi';
import { requestAndroidPermission } from '../utils/permission';
import { launchImageLibrary } from "react-native-image-picker";
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { Colors } from '../configs/colors';
import Video from 'react-native-video';
import { followUpStatus } from '../data/dump';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScaledSheet } from 'react-native-size-matters';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import AppButton from '../components/ui/AppButton';
import ApiStrings from '../lib/apis_string';
import LoadingOverlay from '../components/LoadingOverlay';
import { showToast } from '../utils/toast';
import { AppStackParamList } from '../constants/route';




const AddFollowUpScreen = () => {

    const { t } = useTranslation()
    const route = useRoute<ImamHomeScreenRouteProp>();
    const poorPeople = route.params?.item as PersonItemProps;
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const [newFollowUp, setNewFollowUp] = useState({
        date: format(new Date(), "yyyy-MM-dd"),
        statusUpdate: "",
        comments: "",
        mediaFiles: [] as Array<{ uri: string; type: string, name: string }>,
    });
    const { request, loading } = useApi()
    const [photoLoading, setPhotoLoading] = useState(false);


    const handleMediaPicker = async () => {
        if (Platform.OS === 'android') {
            const hasPermission = await requestAndroidPermission();
            if (!hasPermission) {
                Alert.alert(
                    'Permission Denied',
                    'Please enable photo access in Settings to continue.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Open Settings',
                            onPress: () => Linking.openSettings(),
                        },
                    ],
                );
                return;
            }
        }
        setPhotoLoading(true)
        launchImageLibrary({ selectionLimit: 3, mediaType: 'mixed', quality: 1 }, (response) => {
            setPhotoLoading(false)
            if (response.didCancel) return;
            if (response.errorMessage) {
                console.error("Image Picker Error:", response.errorMessage);
                return;
            }

            if (response.assets) {
                const selectedFiles = response.assets.map((file) => ({
                    uri: file.uri!,
                    type: file.type!,
                    name: file.fileName!
                }));

                setNewFollowUp((prev) => ({
                    ...prev,
                    mediaFiles: [...prev.mediaFiles, ...selectedFiles],
                }));
            }
        });
    };

    const removeImage = (uri?: string) => {
        const updatedImages = newFollowUp.mediaFiles.filter(
            (image) => image.uri !== uri
        );
        setNewFollowUp((prev) => ({
            ...prev,
            mediaFiles: updatedImages,
        }));
    };

    const handleAddFollowUp = async () => {
        if (!newFollowUp.statusUpdate || !newFollowUp.comments) return;

        const formData = new FormData();
        formData.append("date", String(newFollowUp.date));
        formData.append("statusUpdate", newFollowUp.statusUpdate);
        formData.append("comments", newFollowUp.comments);

        newFollowUp.mediaFiles.forEach((file, index) => {
            formData.append("mediaFiles", {
                uri: file.uri,
                type: file.type,
                name: `${Math.random()}${file.name}`,
            });
        });

        const { message } = await request("post", ApiStrings.ADD_FOLLOWUP(poorPeople._id), formData);
        showToast('success', message)
        navigation.navigate('RehabilitationDashboard')
        if (message) {
            setNewFollowUp({ date: format(new Date(), "yyyy-MM-dd"), statusUpdate: "", comments: "", mediaFiles: [] });
        }
    };



    return (
        <SafeAreaWrapper>
            <LoadingOverlay visible={loading} />
            <View style={globalStyles.container}>
                <BackButton />
                <ScrollView contentContainerStyle={{ paddingBottom: 60, marginTop: 20 }}>
                    <Heading level={4} weight="Bold">
                        {t('rehabilitation.updateStatus.title')}
                    </Heading>
                    <Paragraph level='Small'>{t('rehabilitation.updateStatus.description')}</Paragraph>
                    <Select
                        placeholder={t('rehabilitation.status.placeholder')}
                        label={t('rehabilitation.status.label')}
                        value={newFollowUp.statusUpdate}
                        onChange={(text) => setNewFollowUp({ ...newFollowUp, statusUpdate: text })}
                        data={followUpStatus}
                        rootStyle={{ marginTop: 20 }}
                    />
                    <Textarea
                        style={{ width: '100%' }}
                        placeholder={t('rehabilitation.statusDescription.placeholder')}
                        label={t('rehabilitation.statusDescription.label')}
                        value={newFollowUp.comments}
                        onChangeText={(text) => setNewFollowUp({ ...newFollowUp, comments: text })}
                    />

                    <Heading level={6} weight="Bold">
                        {t('rehabilitation.mediaUpload.label')}
                    </Heading>
                    <Paragraph level='Small'>{t('rehabilitation.mediaUpload.description')}</Paragraph>
                    <TouchableOpacity onPress={handleMediaPicker} style={{
                        borderWidth: 1, borderColor: Colors.primary, borderStyle: 'dashed', width: '100%', height: 150, justifyContent: 'center',
                        alignItems: 'center', borderRadius: 8, marginTop: 20, flexDirection: 'row', gap: 4
                    }}>
                        {
                            photoLoading ? <ActivityIndicator size='large' color={Colors.primary} /> : newFollowUp.mediaFiles?.length > 0 ? newFollowUp.mediaFiles.map((file, index) => (
                                <View key={index} style={{ position: 'relative' }}>
                                    {file.type.startsWith("image") ? (
                                        <Image source={{ uri: file.uri }} style={{ width: 90, height: 90, borderRadius: 10 }} />
                                    ) : (
                                        <Video
                                            source={{ uri: file.uri }}
                                            style={{ width: 90, height: 90 }}
                                            resizeMode="cover"
                                        />
                                    )}
                                    <TouchableOpacity style={[styles.deleteButton, {
                                        top: '17%',
                                        left: '35%'
                                    }]} onPress={() => removeImage(file?.uri)}>
                                        <Icon name="restore-from-trash" size={20} color={Colors.white} />
                                    </TouchableOpacity>
                                </View>
                            )) : <TouchableOpacity>
                                <Icon name="camera-alt" size={30} color={Colors.primary} />
                            </TouchableOpacity>
                        }

                    </TouchableOpacity>
                    <AppButton style={{ marginTop: 20}} text={t('submit')} onPress={handleAddFollowUp} />
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    )
}

export const styles = ScaledSheet.create({
    deleteButton: {
        width: '30@ms',
        height: '30@ms',
        backgroundColor: Colors.danger,
        borderRadius: '50@ms',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
})

export default AddFollowUpScreen