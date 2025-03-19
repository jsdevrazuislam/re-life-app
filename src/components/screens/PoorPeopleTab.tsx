import React, { useCallback, useRef } from 'react';
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTranslation } from '../../hooks/useTranslation';
import ImageComponent from '../ui/Image';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../constants/route';
import { useAuthStore } from '../../store/store';
import { Colors } from '../../configs/colors';
import { convertNumber } from '../../utils/helper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ms, mvs } from 'react-native-size-matters';
import { EmptyState } from '../../screens/RequestAccessViewScreen';




const PeopleTab: React.FC<PeopleTabProps> = ({ data, onAdd, loading, refreshing, onRefresh, loadMore, page, totalPages, loadingMore }) => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { user } = useAuthStore()


  const viewabilityConfigRef = useRef({
    minimumViewTime: 100,
    viewAreaCoveragePercentThreshold: 50,
  });

  const renderItem = useCallback(({ item }: { item: PoorPeople }) => {
    return (
      <View style={imamStyles.infoCard}>
        <View style={imamStyles.cardContent}>
          <ImageComponent
            source={item?.photoUrl}
            style={imamStyles.infoPhoto}
            imageStyle={{ borderRadius: 3 }}
          />
          <View style={imamStyles.cardText}>
            <Paragraph level="Small" weight="Bold" style={[imamStyles.cardTitle, { marginBottom: 4 }]}>
              {item.name}
            </Paragraph>
            <View style={imamStyles.row}>
              <MaterialIcons name="calendar" size={ms(20)} color={Colors.primary} style={{ width: 25 }} />
              <Paragraph level="Small">{convertNumber(item?.age)} {t('years')}</Paragraph>
            </View>
            <View style={imamStyles.row}>
              <MaterialIcons name="map-marker" size={ms(20)} color={Colors.primary} style={{ width: 25 }} />
              <Paragraph level="Small">{item.presentAddress ?? item.permanentAddress}</Paragraph>
            </View>
          </View>
        </View>

        <View style={imamStyles.actionButtons}>
          <TouchableOpacity style={imamStyles.center} onPress={() => navigation.navigate('HomeViewDetailsInfo', {
            item: {
              _id: user?.masjid._id,
              name: user?.masjid.name,
              fullAddress: user?.masjid.fullAddress,
              location: user?.masjid.location,
              masjidProfile: user?.masjid.masjidProfile,
              imamDetails: user?.masjid.imamDetails,
              poorPeopleInformations: item
            }
          })}>
            <Icon name="remove-red-eye" size={20} color={Colors.primary} />
            <Paragraph level="Small">{t('view')}</Paragraph>
          </TouchableOpacity>

          {user?.role === 'imam' && (
            <>
               <TouchableOpacity style={imamStyles.center} onPress={() => navigation.navigate('MarkDonationScreen', { data: item })}>
                <Entypo name="heart" size={20} color={Colors.primary} />
                <Paragraph level="Small">{t('donation')}</Paragraph>
              </TouchableOpacity>
              <TouchableOpacity style={imamStyles.center} onPress={() => navigation.navigate('EditPoorPeopleScreen', { item })}>
                <Icon name="edit" size={20} color={Colors.primary} />
                <Paragraph level="Small">{t('edit')}</Paragraph>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  }, []);

  return (
    <View style={imamStyles.tabContainer}>
      {/* Add Button */}
      <TouchableOpacity style={imamStyles.addButton} onPress={onAdd}>
        <Text style={imamStyles.buttonText}>{t('addBegger')}</Text>
      </TouchableOpacity>

      {/* ✅ Use FlatList for large data */}
      <FlatList
        data={loading ? Array(5).fill({}) : data} // Show skeleton if loading
        keyExtractor={(item, index) => index.toString()}
        renderItem={loading ? () => (
          <SkeletonPlaceholder>
            <View style={imamStyles.infoCard}>
              <View style={[imamStyles.cardContent, { borderBottomWidth: 0}]}>
                <View style={imamStyles.skeletonPhoto} />
                <View style={{ marginLeft: 10 }}>
                  <View style={imamStyles.skeletonText} />
                  <View style={imamStyles.skeletonTextSmall} />
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
        ) : renderItem}

        // 🚀 Performance Optimizations
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}

        // 📌 Fix for blank screen
        viewabilityConfig={viewabilityConfigRef.current}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
        onEndReached={loadMore}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator color={Colors.primary} />
          ) : page < totalPages ? (
            <Paragraph level='Small' weight='Medium'>আরো লোড করুন...</Paragraph>
          ) : null
        }
        ListEmptyComponent={
          !loading && data.length === 0 ? <EmptyState title={t('emptyPeopleTitle')} description={t('emptyPeopleDescription')} viewStyle={{ marginTop: mvs(30)}} /> : null
        }
      />
    </View>
  );
};


export default PeopleTab;
