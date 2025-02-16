import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../configs/colors';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Input from '../components/ui/AppInput';
import globalStyles from '../styles/global.style';
import Heading from '../components/ui/Heading';
import AppButton from '../components/ui/AppButton';
import { useTranslation } from '../hooks/useTranslation';
import Paragraph from '../components/ui/Paragraph';
import styles from '../styles/kycScreen.styles'

const KycScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { t } = useTranslation()
  const [selectedDocType, setSelectedDocType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    pincode: '',
  });

  const documentTypes = ['Smart Card', 'Passport', 'Driving License'];

  const handleSubmit = () => {
    // Handle form submission
  };

  function handleStep() {
    setCurrentStep(2)
  }

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={styles.header}>
            <Heading level={5} weight='Bold'>Upload KYC</Heading>
          </View>

          {/* Stepper */}
          <View style={styles.stepperContainer}>
            <View style={[styles.step, currentStep >= 1 && styles.activeStep]} />
            <View style={[styles.step, currentStep >= 2 && styles.activeStep]} />
          </View>

          {currentStep === 1 ? (
            <View style={styles.firstStep}>
              <Input
                label="Name"
                value={formData.name}
                onChangeText={text => setFormData({ ...formData, name: text })}
                placeholder={t('Your Name')}
                inputStyles={styles.appInput}
              />
              <Input
                label="Mobile"
                value={formData.mobile}
                keyboardType="phone-pad"
                onChangeText={text => setFormData({ ...formData, mobile: text })}
                placeholder={t('Your Phone Number')}
                inputStyles={styles.appInput}
              />
              <Input
                label="Email"
                value={formData.email}
                keyboardType="email-address"
                onChangeText={text => setFormData({ ...formData, email: text })}
                placeholder={t('Your Email')}
                inputStyles={styles.appInput}
              />
              <Input
                label="Pincode"
                value={formData.pincode}
                keyboardType="numeric"
                onChangeText={text => setFormData({ ...formData, pincode: text })}
                placeholder={t('Your Area Zip')}
                inputStyles={styles.appInput}
              />

              <AppButton onPress={handleStep} text='Next' style={{ marginTop: '30%' }} />
            </View>
          ) : (
            /* Step 2 Content */
            <View style={styles.formContainer}>
              <Heading level={6} weight='Bold' style={styles.sectionTitle}>Choose Document Type</Heading>
              <View style={styles.docTypeContainer}>
                {documentTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.docTypeButton,
                      selectedDocType === type && styles.selectedDocType,
                    ]}
                    onPress={() => setSelectedDocType(type)}>
                    <Paragraph
                      level='Small'
                      weight='Medium'
                      style={[
                        styles.docTypeText,
                        selectedDocType === type && styles.selectedDocTypeText,
                      ]}>
                      {type}
                    </Paragraph>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.uploadSection}>
                <Heading level={6} weight='Bold' style={styles.sectionTitle}>Capture Id Proof</Heading>
                <Paragraph level='Small' weight='Medium' style={styles.uploadDescription}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </Paragraph>

                <View style={styles.uploadRow}>
                  <UploadArea title="ID Front" handlePress={() => console.log("hello")} />
                  <UploadArea title="ID Back" handlePress={() => console.log("yex")} />
                </View>

                <View style={styles.uploadCard}>
                  <Paragraph level='Small' weight='Bold' style={styles.uploadCardTitle}>Immam Document</Paragraph>
                  <TouchableOpacity style={styles.uploadButton}>
                    <Icon name="camera-alt" size={30} color={Colors.primary} />
                    <Text style={styles.uploadButtonText}>Upload Document</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {currentStep === 2 && (
            <AppButton text='Submit KYC' style={{ marginTop: 40 }} onPress={handleSubmit} />
          )}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export const UploadArea = ({ title, handlePress }: { title: string, handlePress:() => void }) => (
  <TouchableOpacity style={styles.uploadArea} onPress={handlePress}>
    <Icon name="camera-alt" size={30} color={Colors.primary} />
    <Paragraph level='Small' style={styles.uploadAreaText}>{title}</Paragraph>
  </TouchableOpacity>
);


export default KycScreen;
