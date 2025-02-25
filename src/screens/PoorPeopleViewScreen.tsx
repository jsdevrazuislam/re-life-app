import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';
import styles from '../styles/poorPeopleView.styles';
import {useRoute} from '@react-navigation/native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import {baseURLPhoto} from '../lib/api';
import ImageView from 'react-native-image-zoom-viewer';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import BackButton from '../components/BackButton';
import {useTranslation} from '../hooks/useTranslation';

const HomeScreen = () => {
  const [collapsedSections, setCollapsedSections] = useState({
    spouse: true,
    children: true,
    contact: true,
    assistance: true,
    essentials: true,
    notes: true,
    documents: true,
  });

  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const route = useRoute<HomeViewDetailsInfoRouteProp>();
  const singleData = route?.params?.item as PoorPeople;
  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({...prev, [section]: !prev[section]}));
  };
  const {t} = useTranslation();
  const documents = singleData?.idProofDocuments || [];
  const wifeIdProofDocuments = singleData?.wifeIdProofDocuments || [];
  const husbandIdProofDocuments = singleData?.husbandIdProofDocuments || [];

  const openImage = (imageUrl: string) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setVisible(true);
    }
  };

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View style={globalStyles.container}>
          <BackButton />
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(baseURLPhoto(singleData?.photoUrl));
                setVisible(true);
              }}>
              <Image
                source={{uri: baseURLPhoto(singleData?.photoUrl)}}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Heading level={5} weight="Bold" style={styles.name}>
              {singleData?.name}
            </Heading>
            <View style={styles.detailRow}>
              <Icon name="person" size={20} color="#555" />
              <Paragraph
                level="Small"
                weight="Medium"
                style={styles.detailText}>
                {t('beggerAge')}: {singleData?.age} {t('years')}
              </Paragraph>
            </View>
            <View style={styles.detailRow}>
              <Icon name="wc" size={20} color="#555" />
              <Paragraph
                level="Small"
                weight="Medium"
                style={styles.detailText}>
                {t('beggerGender1')}: {singleData?.gender}
              </Paragraph>
            </View>
            <View style={styles.detailRow}>
              <Icon name="favorite" size={20} color="#555" />
              <Paragraph
                level="Small"
                weight="Medium"
                style={styles.detailText}>
                {t('beggerMarriageStatus1')}: {singleData?.marriageStatus}
              </Paragraph>
            </View>
          </View>

          {/* Spouse Details */}
          <TouchableOpacity
            onPress={() => toggleSection('spouse')}
            style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Icon name="people" size={20} color="#333" />
              <Paragraph
                level="Large"
                weight="Bold"
                style={styles.sectionTitle}>
                {t('supportDetails')}
              </Paragraph>
            </View>
            <Icon
              name={collapsedSections.spouse ? 'expand-more' : 'expand-less'}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections.spouse}>
            <View style={styles.sectionContent}>
              {singleData?.gender === 'পুরুষ' ? (
                <View style={styles.detailRow}>
                  <Icon name="work" size={20} color="#555" />
                  <Paragraph
                    level="Small"
                    weight="Medium"
                    style={styles.detailText}>
                    {t('wifeProfession')}: {singleData?.wifeProfession}
                  </Paragraph>
                </View>
              ) : (
                <View style={styles.detailRow}>
                  <Icon name="work" size={20} color="#555" />
                  <Paragraph
                    level="Small"
                    weight="Medium"
                    style={styles.detailText}>
                    {t('husbandProfession')}: {singleData?.husbandProfession}
                  </Paragraph>
                </View>
              )}

              {singleData?.gender === 'পুরুষ' ? (
                <View style={styles.detailRow}>
                  <Icon name="warning" size={20} color="#555" />
                  <Paragraph
                    level="Small"
                    weight="Medium"
                    style={styles.detailText}>
                    {t('isWifeDead')} : {singleData?.isWifeDead}
                  </Paragraph>
                </View>
              ) : (
                <View style={styles.detailRow}>
                  <Icon name="warning" size={20} color="#555" />
                  <Paragraph
                    level="Small"
                    weight="Medium"
                    style={styles.detailText}>
                    {t('isHusbandDead')} : {singleData?.isHusbandDead}
                  </Paragraph>
                </View>
              )}
            </View>
          </Collapsible>

          {/* Children Details */}
          {singleData.numberOfChildren > 0 && (
            <>
              <TouchableOpacity
                onPress={() => toggleSection('children')}
                style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <Icon name="child-care" size={20} color="#333" />
                  <Paragraph
                    level="Large"
                    weight="Bold"
                    style={styles.sectionTitle}>
                    {' '}
                    {t('childrenDetails')}
                  </Paragraph>
                </View>
                <Icon
                  name={
                    collapsedSections.children ? 'expand-more' : 'expand-less'
                  }
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
              <Collapsible collapsed={collapsedSections.children}>
                <View style={styles.sectionContent}>
                  <View style={styles.detailRow}>
                    <Icon name="group" size={20} color="#555" />
                    <Paragraph
                      level="Small"
                      weight="Medium"
                      style={styles.detailText}>
                      {t('numberOfChildren')}: {singleData?.numberOfChildren}
                    </Paragraph>
                  </View>
                  {singleData?.childrenDetails?.map((child, index) => (
                    <View key={index} style={styles.childDetail}>
                      <View style={styles.detailRow}>
                        <Icon name="person" size={20} color="#555" />
                        <Paragraph
                          level="Small"
                          weight="Medium"
                          style={styles.detailText}>
                          {t('name')}: {child.name}
                        </Paragraph>
                      </View>
                      <View style={styles.detailRow}>
                        <Icon name="cake" size={20} color="#555" />
                        <Paragraph
                          level="Small"
                          weight="Medium"
                          style={styles.detailText}>
                          {t('age')}: {child.age} {t('years')}
                        </Paragraph>
                      </View>
                      <View style={styles.detailRow}>
                        <Icon name="work" size={20} color="#555" />
                        <Paragraph
                          level="Small"
                          weight="Medium"
                          style={styles.detailText}>
                          {t('profession')}: {child.profession}
                        </Paragraph>
                      </View>
                      <View style={styles.detailRow}>
                        <Icon name="attach-money" size={20} color="#555" />
                        <Paragraph
                          level="Small"
                          weight="Medium"
                          style={styles.detailText}>
                          {t('childIncome')}: ৳{child.income} {child.frequency}
                        </Paragraph>
                      </View>
                    </View>
                  ))}
                </View>
              </Collapsible>
            </>
          )}

          {/* Contact Information */}
          <TouchableOpacity
            onPress={() => toggleSection('contact')}
            style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Icon name="phone" size={20} color="#333" />
              <Paragraph
                level="Large"
                weight="Bold"
                style={styles.sectionTitle}>
                {' '}
                {t('contactInformation')}
              </Paragraph>
            </View>
            <Icon
              name={collapsedSections.contact ? 'expand-more' : 'expand-less'}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections.contact}>
            <View style={styles.sectionContent}>
              <View style={styles.detailRow}>
                <Icon name="call" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('phoneNumberPlaceholder2')}: {singleData?.contactNumber}
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="location-on" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('currentAddress')}: {singleData?.address}
                </Paragraph>
              </View>
            </View>
          </Collapsible>

          {/* Assistance Details */}
          {singleData.receivingAssistance !== 'না' && (
            <>
              <TouchableOpacity
                onPress={() => toggleSection('assistance')}
                style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <Icon name="local-grocery-store" size={20} color="#333" />
                  <Paragraph
                    level="Large"
                    weight="Bold"
                    style={styles.sectionTitle}>
                    {' '}
                    {t('assistanceDetails')}
                  </Paragraph>
                </View>
                <Icon
                  name={
                    collapsedSections.assistance ? 'expand-more' : 'expand-less'
                  }
                  size={24}
                  color="#333"
                />
              </TouchableOpacity>
              <Collapsible collapsed={collapsedSections.assistance}>
                <View style={styles.sectionContent}>
                  <View style={styles.detailRow}>
                    <Icon name="check-circle" size={20} color="#555" />
                    <Paragraph
                      level="Small"
                      weight="Medium"
                      style={styles.detailText}>
                      {t('receivingAssistance')}: {singleData?.receivingAssistance}
                    </Paragraph>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="list-alt" size={20} color="#555" />
                    <Paragraph
                      level="Small"
                      weight="Medium"
                      style={styles.detailText}>
                      {t('assistanceType1')}: {singleData?.assistanceType}
                    </Paragraph>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="repeat" size={20} color="#555" />
                    <Paragraph
                      level="Small"
                      weight="Medium"
                      style={styles.detailText}>
                      {t('assistanceFrequency1')}: {singleData?.frequency}
                    </Paragraph>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="place" size={20} color="#555" />
                    <Paragraph
                      level="Small"
                      weight="Medium"
                      style={styles.detailText}>
                      {t('assistanceLocation1')}: {singleData?.assistanceLocation}
                    </Paragraph>
                  </View>
                </View>
              </Collapsible>
            </>
          )}

          {/* Essentials Needs */}
          <TouchableOpacity
            onPress={() => toggleSection('essentials')}
            style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Icon name="shopping-basket" size={20} color="#333" />
              <Paragraph
                level="Large"
                weight="Bold"
                style={styles.sectionTitle}>
                {' '}
                {t('monthlyEssentials')}
              </Paragraph>
            </View>
            <Icon
              name={
                collapsedSections.essentials ? 'expand-more' : 'expand-less'
              }
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections.essentials}>
            <View style={styles.sectionContent}>
              <View style={styles.detailRow}>
                <Icon name="rice-bowl" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('rice')}: {singleData?.essentialsNeedsMonthly?.rice}
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="fastfood" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('lentils')}: {singleData?.essentialsNeedsMonthly?.lentils}{' '}
                  
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="local-drink" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('oil')}: {singleData?.essentialsNeedsMonthly?.oil}
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="restaurant-menu" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('otherFoodItems1')}:{' '}
                  {singleData?.essentialsNeedsMonthly?.otherFoodItems}
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="checkroom" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('selfClothing')}:{' '}
                  {singleData?.essentialsNeedsMonthly?.clothingForSelf}
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="family-restroom" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('familyClothing')} :{' '}
                  {singleData?.essentialsNeedsMonthly?.clothingForFamily}
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="medical-services" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('monthlyMedicineCost1')}: ৳
                  {singleData?.essentialsNeedsMonthly?.monthlyMedicineCost}
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="healing" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('treatmentDetailsPlaceholder1')}:{' '}
                  {singleData?.essentialsNeedsMonthly?.ongoingTreatmentsDetails}
                </Paragraph>
              </View>
              <View style={styles.detailRow}>
                <Icon name="paid" size={20} color="#555" />
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.detailText}>
                  {t('financialNeedPlaceholder1')}: ৳
                  {singleData?.essentialsNeedsMonthly?.financialNeeds}
                </Paragraph>
              </View>
            </View>
          </Collapsible>

          {/* Notes */}
          <TouchableOpacity
            onPress={() => toggleSection('notes')}
            style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Icon name="notes" size={20} color="#333" />
              <Paragraph
                level="Large"
                weight="Bold"
                style={styles.sectionTitle}>
                {t('notes')}
              </Paragraph>
            </View>
            <Icon
              name={collapsedSections.notes ? 'expand-more' : 'expand-less'}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections.notes}>
            <View style={styles.sectionContent}>
              <Paragraph
                level="Small"
                weight="Medium"
                style={styles.detailText}>
                {singleData?.notes}
              </Paragraph>
            </View>
          </Collapsible>

          {/* Documents */}
          <TouchableOpacity
            onPress={() => toggleSection('documents')}
            style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Icon name="folder" size={20} color="#333" />
              <Paragraph
                level="Large"
                weight="Bold"
                style={styles.sectionTitle}>
                {t('documentTypeLabel')}
              </Paragraph>
            </View>
            <Icon
              name={collapsedSections.documents ? 'expand-more' : 'expand-less'}
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <Collapsible collapsed={collapsedSections.documents}>
            <View style={styles.sectionContent}>
              <View style={styles.docImageRow}>
                {documents?.map((doc, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.docImageContainer}
                    onPress={() => openImage(baseURLPhoto(doc?.value))}>
                    <Paragraph
                      style={{marginBottom: 10}}
                      level="Small"
                      weight="Bold">
                      {doc?.label}
                    </Paragraph>
                    <Image
                      style={styles.docImage}
                      source={{uri: baseURLPhoto(doc?.value)}}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {singleData.gender === 'পুরুষ' ? (
                <View style={styles.docImageRow}>
                  {wifeIdProofDocuments?.map((doc, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.docImageContainer}
                      onPress={() => openImage(baseURLPhoto(doc?.value))}>
                      <Paragraph
                        style={{marginBottom: 10}}
                        level="Small"
                        weight="Bold">
                        {doc?.label}
                      </Paragraph>
                      <Image
                        style={styles.docImage}
                        source={{uri: baseURLPhoto(doc?.value)}}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.docImageRow}>
                  {husbandIdProofDocuments?.map((doc, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.docImageContainer}
                      onPress={() => openImage(baseURLPhoto(doc?.value))}>
                      <Paragraph
                        style={{marginBottom: 10}}
                        level="Small"
                        weight="Bold">
                        {doc?.label}
                      </Paragraph>
                      <Image
                        style={styles.docImage}
                        source={{uri: baseURLPhoto(doc?.value)}}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </Collapsible>
          
          <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => setVisible(false)}>
            <ImageView
              imageUrls={[{url: selectedImage}]}
              onCancel={() => setVisible(false)}
              enableSwipeDown
            />
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
