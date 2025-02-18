import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform, Alert, Linking } from 'react-native';
import SelectDropdown from '../components/ui/Select';
import Input from '../components/ui/AppInput';
import { UploadArea } from './KycScreen';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import styles from '../styles/addPeople.styles';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import AppButton from '../components/ui/AppButton';
import {
    assistanceTypes,
    frequencyOptions,
    genders,
    marriages,
    needs,
    professions,
    yesNoOptions,
} from '../data/dump';
import Textarea from '../components/ui/Textarea';
import committeeStyles from '../styles/committee.styles';
import BackButton from '../components/BackButton';
import { useTranslation } from '../hooks/useTranslation';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import PhoneNumberInput from '../components/ui/PhoneNumberInput';
import { requestAndroidPermission } from '../utils/permission';
import * as ImagePicker from 'react-native-image-picker';
import { showToast } from '../utils/toast';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import { formatFileData } from '../utils/file-format';



const AddPeopleScreen = () => {
    const { t } = useTranslation()
    const { user } = useAuthStore()
    const route = useRoute<AddPoorPeopleScreenRouteProp>();
    const personData = route.params?.item;
    const [formData, setFormData] = useState<AddPoorPeopleScreenFormState>({
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
        herProfession: '',
        contactNumber: '',
        address: '',
        receivingAssistance: '',
        assistanceType: '',
        frequency: '',
        assistanceLocation: '',
        rice: '',
        lentils: '',
        oil: '',
        otherFood: '',
        clothingSelf: '',
        clothingFamily: '',
        medicineCost: '',
        treatments: '',
        financialNeeds: '',
        notes: '',
        photoUrl: null,
        idProofFront: null,
        idProofBack: null,
        idProofFrontWife: null,
        idProofBackWife: null,
        idProofFrontHusband: null,
        idProofBackHusband: null,
    });

    const [childrenDetails, setChildrenDetails] = useState<ChildDetail[]>([]);
    const { request, loading } = useApi()
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

    const handleSubmit = async () => {

        if (!formData.name || !formData.age || !formData.gender || !formData.contactNumber || !formData.address || !formData.rice || !formData.lentils || !formData.oil || !formData.clothingFamily || !formData.clothingSelf || !formData.otherFood || !formData.medicineCost || !formData.financialNeeds) {
            showToast('error', 'Please fill all required fields.');
            return;
        }

        const numberOfChildren = Number(formData.numberOfChildren);
        if (isNaN(numberOfChildren) || numberOfChildren < 0) {
            showToast('error', 'Number of children must be a valid number.');
            return;
        }

        if (numberOfChildren !== childrenDetails.length) {
            showToast('error', `Please provide details for exactly ${numberOfChildren} children.`);
            return;
        }

        for (let i = 0; i < childrenDetails.length; i++) {
            const child = childrenDetails[i];
            if (!child.name || !child.age || !child.profession || !child.income || !child.mobile || !child.frequency) {
                showToast('error', `Please fill all details for child ${i + 1}.`);
                return;
            }
        }

        const formDataPayload = new FormData();
        formDataPayload.append('name', formData.name)
        formDataPayload.append('age', formData.age)
        formDataPayload.append('gender', formData.gender)
        formDataPayload.append('marriageStatus', formData.marriageStatus)
        formDataPayload.append('profileUrl', formatFileData(formData.photoUrl))
        formDataPayload.append('isWifeDead', formData.isWifeDead)
        formDataPayload.append('wifeProfession', formData.wifeProfession)
        formDataPayload.append('husbandProfession', formData.husbandProfession)
        formDataPayload.append('numberOfChildren', formData.numberOfChildren)
        formDataPayload.append('childrenDetails', JSON.stringify(childrenDetails))
        formDataPayload.append('contactNumber', formData.contactNumber)
        formDataPayload.append('address', formData.address)
        formDataPayload.append('assistanceType', formData.assistanceType)
        formDataPayload.append('frequency', formData.frequency)
        formDataPayload.append('receivingAssistance', formData.receivingAssistance)
        formDataPayload.append('assistanceLocation', formData.assistanceLocation)
        formDataPayload.append('notes', formData.notes)
        formDataPayload.append('essentialsNeedsMonthly', JSON.stringify({
            rice: formData.rice,
            lentils: formData.lentils,
            oil: formData.oil,
            otherFoodItems: formData.otherFood,
            clothingForSelf: formData.clothingSelf,
            clothingForFamily: formData.clothingFamily,
            monthlyMedicineCost: formData.medicineCost,
            ongoingTreatmentsDetails: formData.treatments,
            financialNeeds: formData.financialNeeds
        }))
        formDataPayload.append('idProofFront', formatFileData(formData.idProofFront))
        formDataPayload.append('idProofBack', formatFileData(formData.idProofBack))
        formDataPayload.append('idProofFrontWife', formatFileData(formData.idProofFrontWife))
        formDataPayload.append('idProofBackWife', formatFileData(formData.idProofBackWife))

        const { message } = await request('post', ApiStrings.CREATE_PEOPLE(user?.masjid?._id || ""), formDataPayload);
        showToast('success', message)
        navigation.navigate('ImamHomeScreen', { activeTab: 'Poor People'})
    }

    const handleImagePicker = async (
        field: 'idProofFront' | 'idProofBack' | 'idProofFrontWife' | 'idProofBackWife' | 'photoUrl' | 'idProofFrontHusband' | 'idProofBackHusband',
    ) => {
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

        ImagePicker.launchImageLibrary(
            { mediaType: 'photo', quality: 0.8 },
            response => {
                if (response.didCancel) return;
                if (response.errorMessage) {
                    showToast('error', response.errorMessage);
                    return;
                }
                if (response.assets && response.assets.length > 0) {
                    setFormData({ ...formData, [field]: response.assets[0] });
                }
            },
        );
    };

    const removeImage = (
        field: 'idProofFront' | 'idProofBack' | 'idProofFrontWife' | 'idProofBackWife' | 'photoUrl' | 'idProofFrontHusband' | 'idProofBackHusband',
    ) => {
        setFormData({ ...formData, [field]: '' });
    };

    useEffect(() => {
        console.log("personData", personData)
    }, [personData])

    return (
        <SafeAreaWrapper>
            <ScrollView>
                <View style={globalStyles.container}>
                    <View style={committeeStyles.flexLayout}>
                        <BackButton />
                        <Heading level={5} weight="Bold">
                            {t('signIn')}
                        </Heading>
                        <View />
                    </View>
                    {/* Photo Upload */}
                    <UploadArea
                        title="Her Photo"
                        imageUri={formData.photoUrl}
                        handlePress={() => handleImagePicker('photoUrl')}
                        handleRemove={() => removeImage('photoUrl')}
                    />

                    {/* Basic Information */}
                    <Input
                        label="Name"
                        value={formData.name}
                        style={{ marginTop: 20 }}
                        onChangeText={text => setFormData({ ...formData, name: text })}
                    />
                    <Input
                        label="Age"
                        value={formData.age}
                        onChangeText={text => setFormData({ ...formData, age: text })}
                        keyboardType="numeric"
                        isNumber={true}
                    />

                    <SelectDropdown
                        label="Select Gender"
                        value={formData.gender}
                        onChange={value => setFormData({ ...formData, gender: value })}
                        data={genders}
                    />

                    {/* Marriage Status Section */}
                    <SelectDropdown
                        label="Marriage Status"
                        value={formData.marriageStatus}
                        onChange={value =>
                            setFormData({ ...formData, marriageStatus: value })
                        }
                        data={marriages}
                    />

                    {/* Conditional Sections */}
                    {formData.marriageStatus === 'married' && (
                        <>
                            <SelectDropdown
                                label={`Is ${formData.gender === 'male' ? 'Wife' : 'Husband'
                                    } Dead?`}
                                value={formData.gender === 'male' ? formData.isWifeDead : formData.isHusbandDead}
                                onChange={value =>
                                    setFormData({
                                        ...formData,
                                        ...(formData.gender === 'male'
                                            ? { isWifeDead: value }
                                            : { isHusbandDead: value })
                                    })
                                }
                                data={yesNoOptions}
                            />

                            {formData.isWifeDead === 'no' && (
                                <SelectDropdown
                                    label={`${formData.gender === 'male' ? 'Wife' : 'Husband'
                                        } Profession`}
                                    value={formData.gender === 'male' ? formData.wifeProfession : formData.husbandProfession}
                                    onChange={value =>
                                        setFormData({
                                            ...formData,
                                            ...(formData.gender === 'male'
                                                ? { wifeProfession: value }
                                                : { husbandProfession: value })
                                        })
                                    }
                                    data={professions}
                                />
                            )}
                        </>
                    )}

                    {/* Children Section */}
                    <SelectDropdown
                        label="Has Children?"
                        value={formData.hasChildren}
                        onChange={value => setFormData({ ...formData, hasChildren: value })}
                        data={yesNoOptions}
                    />

                    {formData.hasChildren === 'yes' && (
                        <>
                            <Input
                                label="Number of Children"
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
                                        Child {index + 1} Details
                                    </Text>
                                    <Input
                                        label="Name"
                                        value={child.name}
                                        onChangeText={text => {
                                            const updated = [...childrenDetails];
                                            updated[index].name = text;
                                            setChildrenDetails(updated);
                                        }}
                                    />
                                    <Input
                                        label="Age"
                                        value={child.age}
                                        isNumber={true}
                                        keyboardType="numeric"
                                        onChangeText={text => {
                                            const updated = [...childrenDetails];
                                            updated[index].age = text;
                                            setChildrenDetails(updated);
                                        }}
                                    />
                                    <PhoneNumberInput
                                        label="Phone Number"
                                        placeholder="Enter your phone number"
                                        value={child.mobile}
                                        onChangeText={text => {
                                            const updated = [...childrenDetails];
                                            updated[index].mobile = text;
                                            setChildrenDetails(updated);
                                        }}
                                    />
                                    <SelectDropdown
                                        label="Profession"
                                        value={child.profession}
                                        onChange={value => {
                                            const updated = [...childrenDetails];
                                            updated[index].profession = value;
                                            setChildrenDetails(updated);
                                        }}
                                        data={professions}
                                        style={styles.halfInput}
                                    />
                                    <View style={styles.income}>
                                        <Input
                                            label="Income"
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
                                            label="Month"
                                            placeholder="Month"
                                            value={child.frequency}
                                            onChange={value => {
                                                const updated = [...childrenDetails];
                                                updated[index].frequency = value;
                                                setChildrenDetails(updated);
                                            }}
                                            data={frequencyOptions}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                </View>
                            ))}
                        </>
                    )}

                    {/* Assistance Section */}
                    <SelectDropdown
                        label="Receiving Assistance"
                        value={formData.receivingAssistance}
                        onChange={value =>
                            setFormData({ ...formData, receivingAssistance: value })
                        }
                        data={yesNoOptions}
                    />

                    {formData.receivingAssistance === 'yes' && (
                        <>
                            <SelectDropdown
                                label="Assistance Type"
                                value={formData.assistanceType}
                                onChange={value =>
                                    setFormData({ ...formData, assistanceType: value })
                                }
                                data={assistanceTypes}
                            />
                            <SelectDropdown
                                label="Frequency"
                                value={formData.frequency}
                                onChange={value => setFormData({ ...formData, frequency: value })}
                                data={frequencyOptions}
                            />
                            <Input
                                label="Assistance Location"
                                value={formData.assistanceLocation}
                                onChangeText={text =>
                                    setFormData({ ...formData, assistanceLocation: text })
                                }
                            />
                        </>
                    )}

                    <Input
                        label="Address"
                        value={formData.address}
                        onChangeText={text => setFormData({ ...formData, address: text })}
                    />
                    <PhoneNumberInput
                        label="Contact Number"
                        value={formData.contactNumber}
                        onChangeText={text => setFormData({ ...formData, contactNumber: text })}
                    />
                    <SelectDropdown
                        label={`Her Profession`}
                        value={formData.herProfession}
                        onChange={value =>
                            setFormData({ ...formData, herProfession: value })
                        }
                        data={professions}
                    />

                    {/* Essentials Needs Section */}
                    <Heading level={6} weight="Bold" style={styles.sectionTitle}>
                        Essentials Needs Monthly
                    </Heading>
                    <Paragraph
                        level="Small"
                        weight="Medium"
                        style={styles.sectionDescription}>
                        Please specify your monthly requirements for essential items...
                    </Paragraph>

                    <View style={styles.row}>
                        <SelectDropdown
                            value={formData.rice}
                            onChange={text => setFormData({ ...formData, rice: text })}
                            label="Rice (kg/month)"
                            data={needs}
                            style={styles.halfInput}
                        />
                        <SelectDropdown
                            value={formData.lentils}
                            onChange={text => setFormData({ ...formData, lentils: text })}
                            label="Lentils (kg/month)"
                            data={needs}
                            style={styles.halfInput}
                        />
                    </View>
                    <View style={styles.row}>
                        <SelectDropdown
                            value={formData.oil}
                            onChange={text => setFormData({ ...formData, oil: text })}
                            label="Oil (liters/month)"
                            data={needs}
                            style={styles.halfInput}
                        />
                        <SelectDropdown
                            value={formData.clothingFamily}
                            onChange={text =>
                                setFormData({ ...formData, clothingFamily: text })
                            }
                            label="Family Clothing"
                            data={needs}
                            style={styles.halfInput}
                        />
                    </View>
                    <SelectDropdown
                        value={formData.clothingSelf}
                        onChange={text => setFormData({ ...formData, clothingSelf: text })}
                        label="Self Clothing"
                        data={needs}
                        style={styles.halfInput}
                    />
                    <Input
                        label="Other Foods Items"
                        value={formData.otherFood}
                        onChangeText={text => setFormData({ ...formData, otherFood: text })}
                    />
                    <Input
                        label="Monthly Medicine Cost (BDT)"
                        value={formData.medicineCost}
                        isNumber={true}
                        onChangeText={text =>
                            setFormData({ ...formData, medicineCost: text })
                        }
                    />
                    <Input
                        label="Financial Needs"
                        value={formData.financialNeeds}
                        isNumber={true}
                        onChangeText={text =>
                            setFormData({ ...formData, financialNeeds: text })
                        }
                    />
                    <Textarea
                        label="Ongoing Treatments Details"
                        value={formData.treatments}
                        onChangeText={text => setFormData({ ...formData, treatments: text })}
                        placeholder="Enter details..."
                        maxLength={300}
                        numberOfLines={5}
                    />
                    <Textarea
                        label="Notes"
                        value={formData.notes}
                        onChangeText={text => setFormData({ ...formData, notes: text })}
                        placeholder="Write your notes here..."
                        maxLength={300}
                        numberOfLines={5}
                    />

                    {/* ID Proof Sections */}
                    <Paragraph level="Medium" weight="Bold" style={styles.sectionTitle}>
                        Capture Her ID Proof
                    </Paragraph>
                    <View style={styles.row}>
                        <UploadArea
                            title="Front Side"
                            imageUri={formData.idProofFront}
                            handlePress={() => handleImagePicker('idProofFront')}
                            handleRemove={() => removeImage('idProofFront')}
                        />
                        <UploadArea
                            title="Back Side"
                            imageUri={formData.idProofBack}
                            handlePress={() => handleImagePicker('idProofBack')}
                            handleRemove={() => removeImage('idProofBack')}
                        />
                    </View>

                    {formData.gender === 'female' ? (
                        <>
                            <Paragraph level="Medium" weight="Bold" style={[styles.sectionTitle, { marginTop: 15 }]}>
                                Capture Husband ID Proof
                            </Paragraph>
                            <View style={styles.row}>
                                <UploadArea
                                    title="Front Side"
                                    imageUri={formData.idProofFrontHusband}
                                    handlePress={() => handleImagePicker('idProofFrontHusband')}
                                    handleRemove={() => removeImage('idProofFrontHusband')}
                                />
                                <UploadArea
                                    title="Back Side"
                                    imageUri={formData.idProofBackHusband}
                                    handlePress={() => handleImagePicker('idProofBackHusband')}
                                    handleRemove={() => removeImage('idProofBackHusband')}
                                />
                            </View>
                        </>
                    ) : <>
                        <Paragraph
                            level="Medium"
                            weight="Bold"
                            style={[styles.sectionTitle, { marginTop: 15 }]}>
                            Capture Wife ID Proof
                        </Paragraph>
                        <View style={styles.row}>
                            <UploadArea
                                title="Front Side"
                                imageUri={formData.idProofFrontWife}
                                handlePress={() => handleImagePicker('idProofFrontWife')}
                                handleRemove={() => removeImage('idProofFrontWife')}
                            />
                            <UploadArea
                                title="Back Side"
                                imageUri={formData.idProofBackWife}
                                handlePress={() => handleImagePicker('idProofBackWife')}
                                handleRemove={() => removeImage('idProofBackWife')}
                            />
                        </View>
                    </>}


                    <AppButton loading={loading} disabled={loading} onPress={handleSubmit} text="Submit" style={{ marginTop: 30 }} />
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    );
};

export default AddPeopleScreen;
