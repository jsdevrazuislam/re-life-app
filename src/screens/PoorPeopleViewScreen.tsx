import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';
import ImageView from 'react-native-image-viewing';

// Define types
type ChildDetail = {
  name: string;
  age: number;
  profession: string;
  income: number;
};

type EssentialsNeedsMonthly = {
  rice: number;
  lentils: number;
  oil: number;
  otherFoodItems: string;
  clothingForSelf: string;
  clothingForFamily: string;
  monthlyMedicineCost: number;
  ongoingTreatmentsDetails: string;
  financialNeeds: string;
};

type SampleData = {
  name: string;
  age: number;
  gender: string;
  marriageStatus: string;
  photoUrl: string;
  isWifeDead: string;
  isHusbandDead: string;
  husbandProfession: string;
  wifeProfession: string;
  numberOfChildren: number;
  childrenDetails: ChildDetail[];
  contactNumber: string;
  address: string;
  receivingAssistance: string;
  assistanceType: string;
  frequency: string;
  assistanceLocation: string;
  essentialsNeedsMonthly: EssentialsNeedsMonthly;
  notes: string;
  idProofDocuments: string[];
  wifeIdProofDocuments: string[];
  husbandIdProofDocuments: string[];
};

const sampleData: SampleData = {
  name: 'John Doe',
  age: 35,
  gender: 'male',
  marriageStatus: 'Married',
  photoUrl: 'https://via.placeholder.com/150',
  isWifeDead: 'No',
  isHusbandDead: 'No',
  husbandProfession: 'Engineer',
  wifeProfession: 'Teacher',
  numberOfChildren: 2,
  childrenDetails: [
    { name: 'Alice', age: 10, profession: 'Student', income: 0 },
    { name: 'Bob', age: 8, profession: 'Student', income: 0 },
  ],
  contactNumber: '+1234567890',
  address: '123 Main St, City, Country',
  receivingAssistance: 'Yes',
  assistanceType: 'Food Supplies',
  frequency: 'Monthly',
  assistanceLocation: 'Local Community Center',
  essentialsNeedsMonthly: {
    rice: 10,
    lentils: 5,
    oil: 2,
    otherFoodItems: 'Vegetables, Fruits',
    clothingForSelf: '2 Shirts, 1 Pants',
    clothingForFamily: '5 Shirts, 3 Pants',
    monthlyMedicineCost: 50,
    ongoingTreatmentsDetails: 'None',
    financialNeeds: 'School Fees, Rent',
  },
  notes: 'Needs additional support for children’s education.',
  idProofDocuments: ['id1.jpg', 'id2.jpg'],
  wifeIdProofDocuments: ['wife_id1.jpg'],
  husbandIdProofDocuments: ['husband_id1.jpg'],
};


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

  const [isImageViewVisible, setIsImageViewVisible] = useState(false);

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => setIsImageViewVisible(true)}>
          <Image source={{ uri: sampleData.photoUrl }} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.name}>{sampleData.name}</Text>
        <View style={styles.detailRow}>
          <Icon name="person" size={20} color="#555" />
          <Text style={styles.detailText}>Age: {sampleData.age}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="wc" size={20} color="#555" />
          <Text style={styles.detailText}>Gender: {sampleData.gender}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="favorite" size={20} color="#555" />
          <Text style={styles.detailText}>Marriage Status: {sampleData.marriageStatus}</Text>
        </View>
      </View>

      {/* Spouse Details */}
      <TouchableOpacity onPress={() => toggleSection('spouse')} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Icon name="people" size={20} color="#333" />
          <Text style={styles.sectionTitle}> Spouse Details</Text>
        </View>
        <Icon name={collapsedSections.spouse ? 'expand-more' : 'expand-less'} size={24} color="#333" />
      </TouchableOpacity>
      <Collapsible collapsed={collapsedSections.spouse}>
        <View style={styles.sectionContent}>
          <View style={styles.detailRow}>
            <Icon name="work" size={20} color="#555" />
            <Text style={styles.detailText}>Husband Profession: {sampleData.husbandProfession}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="work" size={20} color="#555" />
            <Text style={styles.detailText}>Wife Profession: {sampleData.wifeProfession}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="warning" size={20} color="#555" />
            <Text style={styles.detailText}>Is Wife Deceased: {sampleData.isWifeDead}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="warning" size={20} color="#555" />
            <Text style={styles.detailText}>Is Husband Deceased: {sampleData.isHusbandDead}</Text>
          </View>
        </View>
      </Collapsible>

      {/* Children Details */}
      <TouchableOpacity onPress={() => toggleSection('children')} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Icon name="child-care" size={20} color="#333" />
          <Text style={styles.sectionTitle}> Children Details</Text>
        </View>
        <Icon name={collapsedSections.children ? 'expand-more' : 'expand-less'} size={24} color="#333" />
      </TouchableOpacity>
      <Collapsible collapsed={collapsedSections.children}>
        <View style={styles.sectionContent}>
          <View style={styles.detailRow}>
            <Icon name="group" size={20} color="#555" />
            <Text style={styles.detailText}>Number of Children: {sampleData.numberOfChildren}</Text>
          </View>
          {sampleData.childrenDetails.map((child, index) => (
            <View key={index} style={styles.childDetail}>
              <View style={styles.detailRow}>
                <Icon name="person" size={20} color="#555" />
                <Text style={styles.detailText}>Name: {child.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="cake" size={20} color="#555" />
                <Text style={styles.detailText}>Age: {child.age}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="work" size={20} color="#555" />
                <Text style={styles.detailText}>Profession: {child.profession}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="attach-money" size={20} color="#555" />
                <Text style={styles.detailText}>Income: ${child.income}</Text>
              </View>
            </View>
          ))}
        </View>
      </Collapsible>

      {/* Contact Information */}
      <TouchableOpacity onPress={() => toggleSection('contact')} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Icon name="phone" size={20} color="#333" />
          <Text style={styles.sectionTitle}> Contact Information</Text>
        </View>
        <Icon name={collapsedSections.contact ? 'expand-more' : 'expand-less'} size={24} color="#333" />
      </TouchableOpacity>
      <Collapsible collapsed={collapsedSections.contact}>
        <View style={styles.sectionContent}>
          <View style={styles.detailRow}>
            <Icon name="call" size={20} color="#555" />
            <Text style={styles.detailText}>Contact Number: {sampleData.contactNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="location-on" size={20} color="#555" />
            <Text style={styles.detailText}>Address: {sampleData.address}</Text>
          </View>
        </View>
      </Collapsible>

      {/* Assistance Details */}
      <TouchableOpacity onPress={() => toggleSection('assistance')} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Icon name="local-grocery-store" size={20} color="#333" />
          <Text style={styles.sectionTitle}> Assistance Details</Text>
        </View>
        <Icon name={collapsedSections.assistance ? 'expand-more' : 'expand-less'} size={24} color="#333" />
      </TouchableOpacity>
      <Collapsible collapsed={collapsedSections.assistance}>
        <View style={styles.sectionContent}>
          <View style={styles.detailRow}>
            <Icon name="check-circle" size={20} color="#555" />
            <Text style={styles.detailText}>Receiving Assistance: {sampleData.receivingAssistance}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="list-alt" size={20} color="#555" />
            <Text style={styles.detailText}>Assistance Type: {sampleData.assistanceType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="repeat" size={20} color="#555" />
            <Text style={styles.detailText}>Frequency: {sampleData.frequency}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="place" size={20} color="#555" />
            <Text style={styles.detailText}>Assistance Location: {sampleData.assistanceLocation}</Text>
          </View>
        </View>
      </Collapsible>

      {/* Essentials Needs */}
      <TouchableOpacity onPress={() => toggleSection('essentials')} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Icon name="shopping-basket" size={20} color="#333" />
          <Text style={styles.sectionTitle}> Monthly Essentials</Text>
        </View>
        <Icon name={collapsedSections.essentials ? 'expand-more' : 'expand-less'} size={24} color="#333" />
      </TouchableOpacity>
      <Collapsible collapsed={collapsedSections.essentials}>
        <View style={styles.sectionContent}>
          <View style={styles.detailRow}>
            <Icon name="rice-bowl" size={20} color="#555" />
            <Text style={styles.detailText}>Rice: {sampleData.essentialsNeedsMonthly.rice} kg</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="fastfood" size={20} color="#555" />
            <Text style={styles.detailText}>Lentils: {sampleData.essentialsNeedsMonthly.lentils} kg</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="local-drink" size={20} color="#555" />
            <Text style={styles.detailText}>Oil: {sampleData.essentialsNeedsMonthly.oil} L</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="restaurant-menu" size={20} color="#555" />
            <Text style={styles.detailText}>Other Food: {sampleData.essentialsNeedsMonthly.otherFoodItems}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="checkroom" size={20} color="#555" />
            <Text style={styles.detailText}>Clothing (Self): {sampleData.essentialsNeedsMonthly.clothingForSelf}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="family-restroom" size={20} color="#555" />
            <Text style={styles.detailText}>Clothing (Family): {sampleData.essentialsNeedsMonthly.clothingForFamily}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="medical-services" size={20} color="#555" />
            <Text style={styles.detailText}>Medicine Cost: ${sampleData.essentialsNeedsMonthly.monthlyMedicineCost}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="healing" size={20} color="#555" />
            <Text style={styles.detailText}>Treatments: {sampleData.essentialsNeedsMonthly.ongoingTreatmentsDetails}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="paid" size={20} color="#555" />
            <Text style={styles.detailText}>Financial Needs: {sampleData.essentialsNeedsMonthly.financialNeeds}</Text>
          </View>
        </View>
      </Collapsible>

      {/* Notes */}
      <TouchableOpacity onPress={() => toggleSection('notes')} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Icon name="notes" size={20} color="#333" />
          <Text style={styles.sectionTitle}> Notes</Text>
        </View>
        <Icon name={collapsedSections.notes ? 'expand-more' : 'expand-less'} size={24} color="#333" />
      </TouchableOpacity>
      <Collapsible collapsed={collapsedSections.notes}>
        <View style={styles.sectionContent}>
          <Text style={styles.detailText}>{sampleData.notes}</Text>
        </View>
      </Collapsible>

      {/* Documents */}
      <TouchableOpacity onPress={() => toggleSection('documents')} style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Icon name="folder" size={20} color="#333" />
          <Text style={styles.sectionTitle}> Documents</Text>
        </View>
        <Icon name={collapsedSections.documents ? 'expand-more' : 'expand-less'} size={24} color="#333" />
      </TouchableOpacity>
      <Collapsible collapsed={collapsedSections.documents}>
        <View style={styles.sectionContent}>
          <View style={styles.detailRow}>
            <Icon name="assignment" size={20} color="#555" />
            <Text style={styles.detailText}>ID Proofs: {sampleData.idProofDocuments.join(', ')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="assignment-ind" size={20} color="#555" />
            <Text style={styles.detailText}>Wife ID Proofs: {sampleData.wifeIdProofDocuments.join(', ')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="assignment-ind" size={20} color="#555" />
            <Text style={styles.detailText}>Husband ID Proofs: {sampleData.husbandIdProofDocuments.join(', ')}</Text>
          </View>
        </View>
      </Collapsible>

      {/* Image Viewer */}
      <ImageView
        images={[{ uri: sampleData.photoUrl }]}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
      />
    </ScrollView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    padding: '20@ms',
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: '20@ms',
  },
  profileImage: {
    width: '100@ms',
    height: '100@ms',
    borderRadius: '50@ms',
    marginBottom: '10@ms',
  },
  name: {
    fontSize: '24@ms',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10@ms',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@ms',
  },
  detailText: {
    fontSize: '14@ms',
    color: '#555',
    marginLeft: '10@ms',
    flexShrink: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '15@ms',
    borderRadius: '10@ms',
    elevation: 3,
    marginBottom: '10@ms',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '18@ms',
    fontWeight: 'bold',
    color: '#333',
    marginLeft: '10@ms',
  },
  sectionContent: {
    backgroundColor: '#fff',
    padding: '15@ms',
    borderRadius: '10@ms',
    marginBottom: '10@ms',
  },
  childDetail: {
    marginLeft: '20@ms',
    marginBottom: '15@ms',
  },
});

export default HomeScreen;