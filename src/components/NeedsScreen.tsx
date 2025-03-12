import React from 'react';
import { View, ScrollView } from 'react-native';
import { ms } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Paragraph from './ui/Paragraph';
import { Colors } from '../configs/colors';
import { useTranslation } from '../hooks/useTranslation';
import { styles } from './PersonalScreen'
import Heading from './ui/Heading';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import { convertNumber } from '../utils/helper';

const DetailItem = ({ label, value }: { label: string, value: string }) => {

  if(!value) return;

  return (
    <View style={styles.detailItem}>
      <Paragraph level='Small' weight='Bold'>{label}</Paragraph>
      <Paragraph level='Small' weight='Regular'>{value}</Paragraph>
    </View>
  )
};


const NeedsScreen = ({ data }: { data: HomeSearchResultDatas}) => {

  const needsData = data.poorPeopleInformations.essentialsNeedsMonthly;
  const { t } = useTranslation()


  const essentials = [
    { icon: 'rice', label: t('rice'), value: needsData.rice },
    { icon: 'bowl-mix', label: t('lentils'), value: needsData.lentils },
    { icon: 'water', label: t("oil"), value: needsData.oil },
    { icon: 'food', label: t('otherFoodItems1'), value: needsData.otherFoodItems },
    { icon: 'tshirt-crew', label: t('selfClothing'), value: needsData.clothingForSelf },
    { icon: 'account-group', label: t('familyClothing'), value: needsData.clothingForFamily },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>

      <Paragraph level='Large' style={{ maxWidth: 200}} weight="Bold">
        {t('monthlyNeedsTitle')}
      </Paragraph>
      <Paragraph
        level="Small"
        weight="Medium"
      >
        {t('monthlyNeedsDescription')}
      </Paragraph>


      <View style={[styles.card, styles.medicalCard]}>
        <View style={styles.cardHeader}>
          <MaterialIcons name="medical-bag" size={ms(24)} color={Colors.danger} />
          <Paragraph level='Medium' weight='Bold' style={styles.cardTitle}>{t('medicalNeeds')}</Paragraph>
        </View>

        <DetailItem label={t('monthlyMedicineCost1')} value={`৳${convertNumber(needsData.monthlyMedicineCost)}`} />
        <DetailItem label={t('ongoingTreatmentDetails1')} value={needsData.ongoingTreatmentsDetails} />
      </View>

      <View style={[styles.card, styles.financialCard]}>
        <View style={styles.cardHeader}>
          <FontAwesome5Icon name="money" size={ms(24)} color={Colors.success} />
          <Paragraph level='Medium' weight='Bold' style={styles.cardTitle}>{t('financialNeeds1')}</Paragraph>
        </View>

        <DetailItem label={t('totalFinancialNeeds')} value={`৳${convertNumber(needsData.financialNeeds)}`} />
        <View >
          <Paragraph level='Medium' weight='Bold' style={styles.label}>{t('receivingAssistance')}</Paragraph>
          <View>
            <Paragraph level='Medium' weight='Regular' style={styles.label}>
              <MaterialIcons
                name={data.poorPeopleInformations.receivingAssistance ? "check-circle" : "cancel"}
                size={ms(20)}
                color={data.poorPeopleInformations.receivingAssistance ? Colors.success : Colors.danger}
              />
              {t('হ্যাঁ')}
            </Paragraph>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        {essentials.map((item, index) => (
          item.value && (
            <View key={index} style={styles.detailItem}>
              <MaterialIcons
                name={item.icon}
                size={ms(20)}
                color={Colors.primary}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Paragraph level='Small' weight='Bold' style={styles.label}>{item.label}</Paragraph>
                <Paragraph level='Small' weight='Medium' style={styles.value}>{item.value}</Paragraph>
              </View>
            </View>
          )
        ))}
      </View>

    </ScrollView>
  );
};

export default NeedsScreen;
