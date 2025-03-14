import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SelectDropdown from '../components/ui/Select';
import Input from '../components/ui/AppInput';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import styles from '../styles/addPeople.styles';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import AppButton from '../components/ui/AppButton';
import {
    assistanceTypes,
    clothNeeds,
    fieldType,
    frequencyOptions,
    genders,
    marriages,
    oliNeeds,
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

const EditPeopleScreen = () => {
    const { t } = useTranslation();
    const route = useRoute<ImamHomeScreenRouteProp>();
    const poorPeople = route.params?.item as PoorPeople;
    const { user } = useAuthStore();
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
        otherFood: '',
        clothingSelf: '',
        clothingFamily: '',
        medicineCost: '',
        treatments: '',
        financialNeeds: '',
        notes: '',
        fieldType: '',
        reason: ''

    });

    const [childrenDetails, setChildrenDetails] = useState<ChildDetail[]>([]);
    const { request, loading } = useApi();
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

        if (!formData?.reason || !formData?.fieldType) return;

        const excludedFields = ['herProfession', 'fieldType', 'reason'];

        const updateData = Object.fromEntries(
            Object.entries(formData)
                .filter(([key, value]) => value !== undefined && value !== null && value !== "" && !excludedFields.includes(key))
        );


        const payload = {
            userId: user?._id,
            masjidId: user?.masjid._id,
            fieldType: formData?.fieldType === 'কমিটির বিবরণ' ? 'committeeDetails' : 'poorPeopleInformations',
            reason: formData?.reason,
            recordId: poorPeople._id,
            updateData: childrenDetails.length > 0
                ? { ...updateData, childrenDetails }
                : updateData
        }

        const { message } = await request(
            'post',
            ApiStrings.REQUEST_TO_ADMIN,
            payload
        );

        showToast('success', message);
        navigation.navigate('ImamHomeScreen', { activeTab: t('beggers') });


    };


    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
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

                            <Input
                                label={t('beggerName')}
                                value={formData.name}
                                placeholder={t('beggerNamePlaceholder')}
                                style={{ marginTop: 20 }}
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
                                rootStyle={{ marginTop: -2, marginBottom: 10 }}
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
                                rootStyle={{ marginBottom: 10 }}
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
                                rootStyle={{ marginBottom: 10 }}
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
                                    rootStyle={{ marginBottom: 10 }}
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

                            <View style={styles.row}>
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
                            <View style={styles.row}>
                                <SelectDropdown
                                    value={formData.oil}
                                    onChange={text => setFormData({ ...formData, oil: text })}
                                    label={t('oilPerMonth')}
                                    data={oliNeeds}
                                    placeholder={t('selectPlaceholder')}
                                    rootStyle={styles.halfInput}
                                />
                                <SelectDropdown
                                    value={formData.clothingFamily}
                                    onChange={text =>
                                        setFormData({ ...formData, clothingFamily: text })
                                    }
                                    label={t('familyClothing')}
                                    data={clothNeeds}
                                    rootStyle={styles.halfInput}
                                    placeholder={t('selectPlaceholder')}
                                />
                            </View>
                            <SelectDropdown
                                value={formData.clothingSelf}
                                onChange={text => setFormData({ ...formData, clothingSelf: text })}
                                label={t('selfClothing')}
                                data={clothNeeds}
                                rootStyle={[styles.halfInput, { marginBottom: 10 }]}
                                placeholder={t('selectPlaceholder')}
                            />
                            <SelectDropdown
                                value={formData.otherFood}
                                onChange={text => setFormData({ ...formData, otherFood: text })}
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
                            <Input
                                label={t('financialNeeds')}
                                value={formData.financialNeeds}
                                placeholder={t('financialNeedPlaceholder')}
                                isNumber={true}
                                onChangeText={text =>
                                    setFormData({ ...formData, financialNeeds: text })
                                }
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
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default EditPeopleScreen;