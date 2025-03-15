import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, Linking, TouchableOpacity, TextInput } from 'react-native';
import SelectDropdown from '../components/ui/Select';
import Input from '../components/ui/AppInput';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import styles from '../styles/addPeople.styles';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import AppButton from '../components/ui/AppButton';
import * as ImagePicker from 'react-native-image-picker';
import {
    amountOfAssistance,
    assistanceTypes,
    clothNeeds,
    fieldType,
    frequencyOptions,
    genders,
    marriages,
    oliNeeds,
    othersFoods,
    othersFoodsOptions,
    professions,
    riceNeeds,
    yesNoOptions,
} from '../data/dump';
import Textarea from '../components/ui/Textarea';
import { useTranslation } from '../hooks/useTranslation';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import PhoneNumberInput from '../components/ui/PhoneNumberInput';
import { showToast } from '../utils/toast';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import LoadingOverlay from '../components/LoadingOverlay';
import BackButton from '../components/BackButton';
import rice from '../data/rice.json'
import oil from '../data/oil.json'
import cloth from '../data/cloth.json'
import { convertBengaliToEnglishNumber, getNameAndUnit } from '../utils/helper';
import RequestAlreadyMade from '../components/RequestAlreadyMade';
import { UploadArea } from './KycScreen';
import { requestAndroidPermission } from '../utils/permission';
import { options } from './FaceScanScreen';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../configs/colors';
import { formatFileData } from '../utils/file-format';


const EditPeopleScreen = () => {
    const { t } = useTranslation();
    const route = useRoute<ImamHomeScreenRouteProp>();
    const poorPeople = route.params?.item as PoorPeople;
    const { user } = useAuthStore();
    const [photoLoading, setPhotLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<IFile[]>([])
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        marriageStatus: '',
        isWifeDead: '',
        isHusbandDead: '',
        wifeProfession: '',
        husbandProfession: '',
        hasChildren: '',
        numberOfChildren: '',
        herProfession: 'ভিক্ষুক',
        contactNumber: '',
        address: '',
        receivingAssistance: '',
        assistanceType: '',
        frequency: '',
        assistanceLocation: '',
        rice: '',
        lentils: '',
        oil: '',
        otherFoodItems: '',
        clothingForSelf: '',
        clothingForFamily: '',
        medicineCost: '',
        treatments: '',
        financialNeeds: '',
        notes: '',
        fieldType: '',
        reason: '',
        dead: '',
        dateOfDeath: new Date(),
        causeOfDeath: '',

    });

    const [childrenDetails, setChildrenDetails] = useState<ChildDetail[]>([]);
    const { request, loading, error } = useApi();
    const [isError, setIsError] = useState(false)
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const handleAddChildren = (count: number) => {
        const numChildren = Math.max(0, count);
        const updatedChildren = Array.from({ length: numChildren }, (_, index) => ({
            name: childrenDetails[index]?.name || '',
            age: childrenDetails[index]?.age || '',
            profession: childrenDetails[index]?.profession || '',
            income: childrenDetails[index]?.income || '',
            mobile: childrenDetails[index]?.mobile || '',
            frequency: childrenDetails[index]?.frequency || 'Month',
        }));
        setChildrenDetails(updatedChildren);
    };

    const handleImagePicker = async () => {
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

        setPhotLoading(true);

        ImagePicker.launchImageLibrary({ selectionLimit: 3, ...options },
            response => {
                setPhotLoading(false);
                if (response.didCancel) return;
                if (response.errorMessage) {
                    showToast('error', response.errorMessage);
                    return;
                }
                if (response.assets && response.assets.length > 0) {
                    setImages(response.assets as IFile[])
                }
            },
        );
    };

    const removeImage = (uri?: string) => {
        const existingImages = images || [];
        setImages(existingImages.filter((img: any) => img.uri !== uri))
    };

    const handleSubmit = async () => {
        if (!formData?.reason || !formData?.fieldType) return;

        const formDataPayload = new FormData();

        const excludedFields = ['herProfession', 'fieldType', 'reason'];

        const appendIfExists = (key: string, value: any) => {
            if (value !== undefined && value !== null && value !== '') {
                formDataPayload.append(key, value);
            }
        };


        const formattedData = {
            rice: formData.rice ? getNameAndUnit(formData.rice, rice) : "",
            lentils: formData.lentils ? getNameAndUnit(formData.lentils, rice) : "",
            oil: formData.oil ? getNameAndUnit(formData.oil, oil) : "",
            otherFoodItems: othersFoods.find((item) => item.label === formData?.otherFoodItems)?.value ?? [],
            clothingForSelf: formData.clothingForSelf ? getNameAndUnit(formData.clothingForSelf, cloth) : "",
            clothingForFamily: formData.clothingForFamily ? getNameAndUnit(formData.clothingForFamily, cloth) : "",
            monthlyMedicineCost: formData.medicineCost || '',
            ongoingTreatmentsDetails: formData.treatments || '',
            financialNeeds: formData.financialNeeds ? convertBengaliToEnglishNumber(formData.financialNeeds) : "",
        };

        const cleanedFormattedData = Object.fromEntries(
            Object.entries(formattedData).filter(([_, value]) => {
                if (Array.isArray(value)) return value.length > 0;
                return value !== null && value !== "";
            })
        );

        const updateData = Object.fromEntries(
            Object.entries(formData)
                .filter(([key, value]) => value !== undefined && value !== null && value !== "" && !excludedFields.includes(key))
        );


        const finalUpdateData = {
            ...updateData,
            ...cleanedFormattedData,
            childrenDetails: childrenDetails.length > 0 ? childrenDetails : undefined
        };


        const deathInfo = {
            dateOfDeath: formData.dateOfDeath,
            causeOfDeath: formData.causeOfDeath,
        }

        appendIfExists('userId', user?._id);
        appendIfExists('masjidId', user?.masjid._id);
        appendIfExists('fieldType', formData?.fieldType === 'কমিটির বিবরণ' ? 'committeeDetails' : 'poorPeopleInformations');
        appendIfExists('reason', formData?.reason);
        appendIfExists('recordId', poorPeople._id);
        appendIfExists('dead', formData.dead === 'হ্যাঁ' ? 'true' : 'false');
        appendIfExists('updateData', JSON.stringify(finalUpdateData));
        if (formData.dead === 'হ্যাঁ') {
            appendIfExists('deathInfo', JSON.stringify(deathInfo));
        }
        images?.forEach((deathProof) => {
            if (deathProof) {
                formDataPayload.append(`deathProofImage`, formatFileData(deathProof));
            }
        });


        const { message } = await request('post', ApiStrings.REQUEST_TO_ADMIN, formDataPayload);
        showToast('success', message);
        navigation.navigate('ImamHomeScreen', { activeTab: 'beggers' });
    };

    const handleDateChange = (newDate: Date) => {
        setOpen(false)
        setFormData({ ...formData, dateOfDeath: newDate });
    };

    useEffect(() => {
        if (error) {
            setIsError(true)
        }
    }, [error])

    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {
                    isError ? <RequestAlreadyMade tryAgain={() => setIsError(false)} /> : <ScrollView
                        contentContainerStyle={{
                            paddingBottom: 40
                        }}
                    >
                        <LoadingOverlay visible={loading} />
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={globalStyles.container}>
                                <BackButton />
                                <Heading level={6} weight="Bold" style={[styles.sectionTitle, { marginTop: 20 }]}>
                                    {t('vikhukEditRequesttitle')}
                                </Heading>
                                <Paragraph
                                    level="Small"
                                    weight="Medium"
                                    style={styles.sectionDescription}>
                                    {t('vikhukEditRequestdescription')}
                                </Paragraph>

                                <SelectDropdown
                                    label={t('isVikhukDeadLabel')}
                                    placeholder={t('isVikhukDeadPlaceholder')}
                                    value={formData.dead}
                                    onChange={value => setFormData({ ...formData, dead: value })}
                                    data={yesNoOptions}
                                    rootStyle={{ marginTop: 20 }}
                                />

                                {
                                    formData.dead === 'হ্যাঁ' && (
                                        <>

                                            <Paragraph
                                                level="Small"
                                                weight="Medium"
                                                style={[styles.sectionDescription, { marginBottom: 6 }]}>
                                                {t('deathDateLabel')}
                                            </Paragraph>
                                            <TouchableOpacity onPress={() => setOpen(true)} style={styles.inputContainer}>
                                                <TextInput
                                                    style={styles.input}
                                                    value={formData.dateOfDeath.toLocaleDateString()}
                                                    editable={false}
                                                    placeholder="Select a Date"

                                                />
                                                <Icon name="calendar-today" size={24} color={Colors.neutral[300]} />
                                            </TouchableOpacity>

                                            {open && (
                                                <DatePicker
                                                    modal
                                                    open={open}
                                                    date={formData.dateOfDeath}
                                                    onConfirm={handleDateChange}
                                                    onCancel={() => setOpen(false)}
                                                />
                                            )}
                                            <Textarea
                                                label={t('howDidVikhukDieLabel')}
                                                value={formData.causeOfDeath}
                                                onChangeText={text => setFormData({ ...formData, causeOfDeath: text })}
                                                placeholder={t('howDidVikhukDiePlaceholder')}
                                                maxLength={300}
                                                numberOfLines={5}
                                            />

                                            <Heading level={6} weight="Bold" style={[styles.sectionTitle, { marginTop: 15 }]}>
                                                {t('vikhukErTitle')}
                                            </Heading>
                                            <Paragraph
                                                level="Small"
                                                weight="Medium"
                                                style={[styles.sectionDescription, { marginBottom: 20 }]}>
                                                {t('vikhukErDescription')}
                                            </Paragraph>

                                            <UploadArea
                                                title={t('beggerPhoto')}
                                                imageUri={images}
                                                handlePress={() => handleImagePicker()}
                                                handleRemove={(uri) => removeImage(uri)}
                                                loading={photoLoading}
                                                style={{ marginBottom: 20 }}
                                            />
                                        </>
                                    )
                                }



                                <Input
                                    label={t('beggerName')}
                                    value={formData.name}
                                    placeholder={t('beggerNamePlaceholder')}
                                    onChangeText={text => setFormData({ ...formData, name: text })}
                                />
                                <Input
                                    placeholder={t('beggerAgePlaceholder')}
                                    label={t('beggerAge')}
                                    value={formData.age}
                                    onChangeText={text => setFormData({ ...formData, age: text })}
                                    keyboardType="numeric"
                                    isNumber={true}
                                />

                                <SelectDropdown
                                    label={t('beggerGender')}
                                    placeholder={t('beggerGender')}
                                    value={formData.gender}
                                    onChange={value => setFormData({ ...formData, gender: value })}
                                    data={genders}
                                />

                                {/* Marriage Status Section */}
                                <SelectDropdown
                                    label={t('beggerMarriageStatus')}
                                    placeholder={t('beggerMarriageStatus')}
                                    value={formData.marriageStatus}
                                    onChange={value =>
                                        setFormData({ ...formData, marriageStatus: value })
                                    }
                                    data={marriages}
                                />

                                <SelectDropdown
                                    label={formData.gender === 'পুরুষ' ? t('isWifeDead') : t('isHusbandDead')}
                                    value={
                                        formData.gender === 'পুরুষ'
                                            ? formData.isWifeDead
                                            : formData.isHusbandDead
                                    }
                                    onChange={value =>
                                        setFormData({
                                            ...formData,
                                            ...(formData.gender === 'পুরুষ'
                                                ? { isWifeDead: value }
                                                : { isHusbandDead: value }),
                                        })
                                    }
                                    data={yesNoOptions}
                                    placeholder={formData.gender === 'পুরুষ' ? t('isWifeDead') : t('isHusbandDead')}
                                />

                                {(formData.isWifeDead || formData.isHusbandDead) === 'না' && (
                                    <SelectDropdown
                                        label={formData.gender === 'পুরুষ' ? t('wifeProfession') : t('husbandProfession')}
                                        value={
                                            formData.gender === 'পুরুষ'
                                                ? formData.wifeProfession
                                                : formData.husbandProfession
                                        }
                                        onChange={value =>
                                            setFormData({
                                                ...formData,
                                                ...(formData.gender === 'পুরুষ'
                                                    ? { wifeProfession: value }
                                                    : { husbandProfession: value }),
                                            })
                                        }
                                        data={professions}
                                        search={true}
                                        searchPlaceholder="Enter your search"
                                        placeholder={formData.gender === 'পুরুষ' ? t('wifeProfessionPlaceholder') : t('husbandProfessionPlaceholder')}
                                    />
                                )}

                                <SelectDropdown
                                    label={t('hasChildren')}
                                    value={formData.hasChildren}
                                    onChange={value => setFormData({ ...formData, hasChildren: value })}
                                    data={yesNoOptions}
                                    placeholder={t('selectPlaceholder')}
                                    rootStyle={{ marginBottom: 10 }}
                                />

                                <Input
                                    label={t('numberOfChildren')}
                                    placeholder={t('numberOfChildren')}
                                    value={formData.numberOfChildren}
                                    keyboardType="numeric"
                                    onChangeText={text => {
                                        const count = parseInt(text) || 0;
                                        setFormData({ ...formData, numberOfChildren: text });
                                        handleAddChildren(count);
                                    }}
                                />

                                {childrenDetails.map((child, index) => (
                                    <View key={index} style={styles.childSection}>
                                        <Text style={styles.childHeader}>
                                            {t('childrenDetails')} {index + 1}
                                        </Text>
                                        <Input
                                            placeholder={t('childName')}
                                            label={t('childName')}
                                            value={child.name}
                                            onChangeText={text => {
                                                const updated = [...childrenDetails];
                                                updated[index].name = text;
                                                setChildrenDetails(updated);
                                            }}
                                        />
                                        <Input
                                            placeholder={t('childAge')}
                                            label={t('childAge')}
                                            value={child.age}
                                            isNumber={true}
                                            keyboardType="numeric"
                                            onChangeText={text => {
                                                const updated = [...childrenDetails];
                                                updated[index].age = text;
                                                setChildrenDetails(updated);
                                            }}
                                        />
                                        {
                                            Number(child.age) >= 15 && (
                                                <>
                                                    <PhoneNumberInput
                                                        label={t('childNumber')}
                                                        placeholder={t('childNumber')}
                                                        value={child.mobile}
                                                        onChangeText={text => {
                                                            const updated = [...childrenDetails];
                                                            updated[index].mobile = text;
                                                            setChildrenDetails(updated);
                                                        }}
                                                    />
                                                    <SelectDropdown
                                                        label={t('childProfession')}
                                                        value={child.profession}
                                                        onChange={value => {
                                                            const updated = [...childrenDetails];
                                                            updated[index].profession = value;
                                                            setChildrenDetails(updated);
                                                        }}
                                                        data={professions}
                                                        rootStyle={[styles.halfInput, { marginTop: -3, marginBottom: 12 }]}
                                                        search={true}
                                                        searchPlaceholder="Enter your search"
                                                        placeholder={t('selectPlaceholder')}
                                                    />
                                                    <View style={styles.income}>
                                                        <Input
                                                            label={t('childIncome')}
                                                            placeholder={t('childIncome')}
                                                            value={child.income}
                                                            isNumber={true}
                                                            keyboardType="numeric"
                                                            onChangeText={text => {
                                                                const updated = [...childrenDetails];
                                                                updated[index].income = text;
                                                                setChildrenDetails(updated);
                                                            }}
                                                            style={{ width: '65%' }}
                                                        />
                                                        <SelectDropdown
                                                            label={t('childrenIncome')}
                                                            value={child.frequency}
                                                            placeholder={t('selectPlaceholder')}
                                                            onChange={value => {
                                                                const updated = [...childrenDetails];
                                                                updated[index].frequency = value;
                                                                setChildrenDetails(updated);
                                                            }}
                                                            data={frequencyOptions}
                                                            rootStyle={{ flex: 1, marginTop: 4 }}
                                                        />
                                                    </View>
                                                </>
                                            )
                                        }
                                    </View>
                                ))}


                                <SelectDropdown
                                    label={t('receivingAssistance')}
                                    value={formData.receivingAssistance}
                                    onChange={value =>
                                        setFormData({ ...formData, receivingAssistance: value })
                                    }
                                    data={yesNoOptions}
                                    placeholder={t('selectPlaceholder')}
                                    rootStyle={{ marginBottom: 10 }}
                                />

                                {formData.receivingAssistance === 'হ্যাঁ' && (
                                    <>
                                        <SelectDropdown
                                            label={t('assistanceType')}
                                            value={formData.assistanceType}
                                            onChange={value =>
                                                setFormData({ ...formData, assistanceType: value })
                                            }
                                            data={assistanceTypes}
                                            placeholder={t('selectPlaceholder')}

                                        />
                                        <SelectDropdown
                                            label={t('assistanceFrequency')}
                                            value={formData.frequency}
                                            onChange={value => setFormData({ ...formData, frequency: value })}
                                            data={frequencyOptions}
                                            placeholder={t('selectPlaceholder')}
                                            rootStyle={{ marginBottom: 10 }}
                                        />
                                        <Input
                                            label={t('assistanceLocation')}
                                            value={formData.assistanceLocation}
                                            onChangeText={text =>
                                                setFormData({ ...formData, assistanceLocation: text })
                                            }
                                        />
                                    </>
                                )}

                                <Input
                                    label={t('currentAddress')}
                                    value={formData.address}
                                    onChangeText={text => setFormData({ ...formData, address: text })}
                                    placeholder={t('currentAddressPlaceholder1')}
                                />
                                <PhoneNumberInput
                                    label={t('phoneNumber')}
                                    placeholder={t('phoneNumberPlaceholder1')}
                                    value={formData.contactNumber}
                                    onChangeText={text =>
                                        setFormData({ ...formData, contactNumber: text })
                                    }
                                />
                                {/* Essentials Needs Section */}
                                <Heading level={6} weight="Bold" style={styles.sectionTitle}>
                                    {t('monthlyNeedsTitle')}
                                </Heading>
                                <Paragraph
                                    level="Small"
                                    weight="Medium"
                                    style={styles.sectionDescription}>
                                    {t('monthlyNeedsDescription')}
                                </Paragraph>

                                <View style={[styles.row]}>
                                    <SelectDropdown
                                        value={formData.rice}
                                        onChange={text => setFormData({ ...formData, rice: text })}
                                        label={t('ricePerMonth')}
                                        data={riceNeeds}
                                        placeholder={t('selectPlaceholder')}
                                        rootStyle={styles.halfInput}
                                    />
                                    <SelectDropdown
                                        value={formData.lentils}
                                        onChange={text => setFormData({ ...formData, lentils: text })}
                                        label={t('lentilsPerMonth')}
                                        data={riceNeeds}
                                        rootStyle={styles.halfInput}
                                        placeholder={t('selectPlaceholder')}
                                    />
                                </View>
                                <View style={[styles.row, { marginTop: 0 }]}>
                                    <SelectDropdown
                                        value={formData.oil}
                                        onChange={text => setFormData({ ...formData, oil: text })}
                                        label={t('oilPerMonth')}
                                        data={oliNeeds}
                                        placeholder={t('selectPlaceholder')}
                                        rootStyle={styles.halfInput}
                                    />
                                    <SelectDropdown
                                        value={formData.clothingForFamily}
                                        onChange={text =>
                                            setFormData({ ...formData, clothingForFamily: text })
                                        }
                                        label={t('familyClothing')}
                                        data={clothNeeds}
                                        rootStyle={styles.halfInput}
                                        placeholder={t('selectPlaceholder')}
                                    />
                                </View>
                                <SelectDropdown
                                    value={formData.clothingForSelf}
                                    onChange={text => setFormData({ ...formData, clothingForSelf: text })}
                                    label={t('selfClothing')}
                                    data={clothNeeds}
                                    rootStyle={[styles.halfInput, { marginBottom: 10 }]}
                                    placeholder={t('selectPlaceholder')}
                                />
                                <SelectDropdown
                                    value={formData.otherFoodItems}
                                    onChange={text => setFormData({ ...formData, otherFoodItems: text })}
                                    label={t('otherFoodItems')}
                                    data={othersFoodsOptions}
                                    rootStyle={styles.halfInput}
                                    placeholder={t('otherFoodPlaceholder')}
                                />
                                <Input
                                    label={t('monthlyMedicineCost')}
                                    placeholder={t('monthlyMedicineCost')}
                                    value={formData.medicineCost}
                                    isNumber={true}
                                    onChangeText={text =>
                                        setFormData({ ...formData, medicineCost: text })
                                    }
                                />
                                <SelectDropdown
                                    value={formData.financialNeeds}
                                    onChange={text =>
                                        setFormData({ ...formData, financialNeeds: text })
                                    }
                                    label={t('financialNeeds')}
                                    data={amountOfAssistance}
                                    placeholder={t('financialNeedPlaceholder')}
                                />

                                <Textarea
                                    label={t('ongoingTreatmentDetails')}
                                    value={formData.treatments}
                                    onChangeText={text => setFormData({ ...formData, treatments: text })}
                                    placeholder={t('treatmentDetailsPlaceholder')}
                                    maxLength={300}
                                    numberOfLines={5}
                                />
                                <Textarea
                                    label={t('notes')}
                                    value={formData.notes}
                                    onChangeText={text => setFormData({ ...formData, notes: text })}
                                    placeholder={t('notesPlaceholder')}
                                    maxLength={300}
                                    numberOfLines={5}
                                />
                                <SelectDropdown
                                    label={t('fieldTypeLabel')}
                                    placeholder={t('fieldTypePlaceholder')}
                                    value={formData.fieldType}
                                    onChange={text =>
                                        setFormData({ ...formData, fieldType: text })
                                    }
                                    data={fieldType}
                                    error={!formData.fieldType ? 'আবশ্যক' : ''}
                                />
                                <Textarea
                                    label={t('reasonLabel')}
                                    value={formData.reason}
                                    onChangeText={text => setFormData({ ...formData, reason: text })}
                                    placeholder={t('reasonPlaceholder')}
                                    maxLength={300}
                                    numberOfLines={5}
                                    error={!formData.reason ? 'আবশ্যক' : ''}
                                />

                                <AppButton
                                    onPress={handleSubmit}
                                    text={t('submit')}
                                    style={{ marginTop: 30 }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                }
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default EditPeopleScreen;