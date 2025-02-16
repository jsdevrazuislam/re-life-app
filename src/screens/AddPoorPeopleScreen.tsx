import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from '../components/ui/Select';
import Input from '../components/ui/AppInput';
import { UploadArea } from './KycScreen';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import { Colors } from '../configs/colors';
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

interface ChildDetail {
    name: string;
    age: string;
    profession: string;
    income: string;
    frequency: string;
}

const AddPeopleScreen = () => {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'male',
        marriageStatus: 'single',
        isWifeDead: 'no',
        wifeProfession: '',
        hasChildren: 'no',
        numberOfChildren: '0',
        herProfession: '',
        contactNumber: '',
        address: '',
        receivingAssistance: 'no',
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
    });

    const [childrenDetails, setChildrenDetails] = useState<ChildDetail[]>([]);

    const handleAddChildren = (count: number) => {
        const numChildren = Math.max(0, count);
        const updatedChildren = Array.from({ length: numChildren }, (_, index) => ({
            name: childrenDetails[index]?.name || '',
            age: childrenDetails[index]?.age || '',
            profession: childrenDetails[index]?.profession || '',
            income: childrenDetails[index]?.income || '',
            frequency: childrenDetails[index]?.frequency || 'Month',
        }));
        setChildrenDetails(updatedChildren);
    };

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
                    <View style={styles.uploadPhotoContainer}>
                        <TouchableOpacity style={styles.uploadButton}>
                            <Icon name="camera-alt" size={40} color={Colors.primary} />
                            <Text style={styles.uploadText}>Upload Photo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Basic Information */}
                    <Input
                        label="Name"
                        value={formData.name}
                        onChangeText={text => setFormData({ ...formData, name: text })}
                    />
                    <Input
                        label="Age"
                        value={formData.age}
                        onChangeText={text => setFormData({ ...formData, age: text })}
                        keyboardType="numeric"
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
                                value={formData.isWifeDead}
                                onChange={value =>
                                    setFormData({ ...formData, isWifeDead: value })
                                }
                                data={yesNoOptions}
                            />

                            {formData.isWifeDead === 'no' && (
                                <SelectDropdown
                                    label={`${formData.gender === 'male' ? 'Wife' : 'Husband'
                                        } Profession`}
                                    value={formData.wifeProfession}
                                    onChange={value =>
                                        setFormData({ ...formData, wifeProfession: value })
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
                                        keyboardType="numeric"
                                        onChangeText={text => {
                                            const updated = [...childrenDetails];
                                            updated[index].age = text;
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
                                            value={formData.frequency}
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
                    <Input
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
                        onChangeText={text =>
                            setFormData({ ...formData, medicineCost: text })
                        }
                    />
                    <Input
                        label="Financial Needs"
                        value={formData.medicineCost}
                        onChangeText={text =>
                            setFormData({ ...formData, medicineCost: text })
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
                        Capture ID Proof
                    </Paragraph>
                    <View style={styles.row}>
                        <UploadArea
                            title="Front Side"
                            handlePress={() => console.log('hello')}
                        />
                        <UploadArea
                            title="Back Side"
                            handlePress={() => console.log('hello')}
                        />
                    </View>

                    <Paragraph
                        level="Medium"
                        weight="Bold"
                        style={[styles.sectionTitle, { marginTop: 15 }]}>
                        Capture Wife ID Proof
                    </Paragraph>
                    <View style={styles.row}>
                        <UploadArea
                            title="Front Side"
                            handlePress={() => console.log('hello')}
                        />
                        <UploadArea
                            title="Back Side"
                            handlePress={() => console.log('hello')}
                        />
                    </View>

                    <AppButton text="Submit" style={{ marginTop: 30 }} />
                </View>
            </ScrollView>
        </SafeAreaWrapper>
    );
};

export default AddPeopleScreen;
