import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Image, Platform, Alert, Linking, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { api } from '../lib/api'
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestAndroidPermission, requestAndroidPermissionCamera } from '../utils/permission';
import { Colors } from '../configs/colors';
import Paragraph from '../components/ui/Paragraph';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTranslation } from '../hooks/useTranslation';
import { showToast } from '../utils/toast';

export const options: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: false,
    maxWidth: 1080,
    maxHeight: 1920,
};

const { height } = Dimensions.get('window');


const FaceScanScreen = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [selectedImage, setSelectedImage] = useState<IFile | null>(null);
    const scanLinePosition = useSharedValue(0);
    const [person, setPerson] = useState<ScanResponse | null>(null)
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const { t } = useTranslation()
    const personData = person?.data;

    const startFaceScan = async () => {
        if (!selectedImage) {
            showToast('error','Please select a photo first');
            return;
        }

        setIsScanning(true);
        scanLinePosition.value = withRepeat(withTiming(height - 200, { duration: 1000, easing: Easing.linear }), -1, true);

        makeFaceScanApiCall();
    };

    const makeFaceScanApiCall = async () => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: selectedImage?.uri,
                type: selectedImage?.type,
                name: selectedImage?.fileName,
            });

            const response = await api.post<ScanResponse>('/users/verify-face', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setPerson(response.data);
        } catch (error) {
            console.error('Error scanning face:', error);
        }
        setIsScanning(false);
    };

    const pickImage = async () => {

        if (Platform.OS === 'android') {
            const hasPermission = await requestAndroidPermission();
            if (!hasPermission) {
                Alert.alert(
                    'Permission Denied',
                    'Please enable photo access in Settings to continue.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open Settings', onPress: () => Linking.openSettings() },
                    ],
                );
                return;
            }
        }


        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                setSelectedImage(response.assets[0] as IFile);
            }
        });
    };

    const takePhoto = async () => {

        if (Platform.OS === 'android') {
            const hasPermission = await requestAndroidPermissionCamera();
            if (!hasPermission) {
                Alert.alert(
                    'Permission Denied',
                    'Please enable photo access in Settings to continue.',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Open Settings', onPress: () => Linking.openSettings() },
                    ],
                );
                return;
            }
        }

        launchCamera(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                setSelectedImage(response.assets[0] as IFile);
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color={Colors.white} />
            </TouchableOpacity>

            {selectedImage ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedImage.uri }} style={styles.fullImage} />

                    {isScanning && (
                        <Animated.View
                            style={[
                                styles.scanLine,
                                { transform: [{ translateY: scanLinePosition }] },
                            ]}
                        />
                    )}
                </View>
            ) : (
                <Text style={styles.title}>{t('faceScan')}</Text>
            )}

            <View style={styles.buttonContainer}>
                {!selectedImage ? (
                    <>
                        <Button color={Colors.primary} title={t('pickImage')} onPress={pickImage} />
                        <Button color={Colors.primary} title={t('pickPhoto')} onPress={takePhoto} />
                    </>
                ) : (
                    <>
                        {!isScanning && !person && (
                            <Button color={Colors.primary} title="Start Face Scan" onPress={startFaceScan} />
                        )}
                    </>
                )}
            </View>

            {isScanning && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.white} />
                    <Paragraph level='Small' style={styles.loadingText}>Scanning...</Paragraph>
                </View>
            )}

            {
                !person?.data?.registered && <Paragraph weight='Bold' level='Small' style={styles.resultText}>{person?.message}</Paragraph>
            }

            {person?.data?.registered && (
                <View style={styles.resultButton}>
                    <Paragraph weight='Bold' level='Small' style={styles.resultText}>
                        {person.message}
                    </Paragraph>
                    <TouchableOpacity style={{ backgroundColor: Colors.secondary, padding: 10, marginTop: 10 }} onPress={() => navigation.navigate('HomeViewDetailsInfo', {
                        item: {
                            _id: personData?.masjidDetails._id,
                            name: personData?.masjidDetails?.name,
                            fullAddress: personData?.masjidDetails?.fullAddress,
                            location: personData?.masjidDetails?.location,
                            masjidProfile: personData?.masjidDetails?.masjidProfile,
                            imamDetails: personData?.masjidDetails?.imamDetails,
                            poorPeopleInformations: personData?.poorPeople
                        }
                    })}>
                        <Paragraph weight='Bold' level='Small' style={styles.resultText}>
                            {t('details')}
                        </Paragraph>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
    },
    imageContainer: {
        width: '100%',
        height: '80%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    scanLine: {
        position: 'absolute',
        width: '90%',
        height: 4,
        backgroundColor: Colors.danger,
        borderRadius: 2,
        left: '5%',
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    loadingContainer: {
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
    },
    loadingText: {
        color: Colors.white,
        marginTop: 10,
    },
    resultButton: {
        position: 'absolute',
        bottom: 150,
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
    },
    resultText: {
        color: Colors.white,
        textAlign: 'center',
        marginTop: 2
    },
});

export default FaceScanScreen;
