import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paragraph from '../components/ui/Paragraph';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import Header from '../components/Header';
import { Colors } from '../configs/colors';
import { styles } from '../styles/notification.styles';
import { ms } from 'react-native-size-matters';
import { useAuthStore } from '../store/store';
import timeAgo from '../utils/helper';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import { useTranslation } from '../hooks/useTranslation';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

const NotificationsScreen = () => {
  const { t } = useTranslation();
  const [selectedSegment, setSelectedSegment] = useState<'All' | 'Unread'>('All');
  const { notifications, setNotifications } = useAuthStore();
  const { request } = useApi();

  async function notificationReadHandler(id: string) {
    const updatedNotifications = notifications.map(notification =>
      notification._id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    await request('put', ApiStrings.READ_NOTIFICATION(id));
  }

  async function notificationDeleteHandler(id: string) {
    const updatedNotifications = notifications.filter(notification => notification._id !== id);
    setNotifications(updatedNotifications);
    await request('delete', ApiStrings.DELETE_NOTIFICATION(id));
  }

  const filteredNotifications =
    selectedSegment === 'All'
      ? notifications
      : notifications.filter(notification => !notification.read);

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, id: string) => {
    return (
      <TouchableOpacity
        onPress={() => notificationDeleteHandler(id)}
        style={[styles.deleteButton]}
      >
        <Ionicons style={{ marginLeft: 2}} name="trash-outline" size={ms(24)} color="white" />
      </TouchableOpacity>
    );
  };

  const renderLeftActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, id: string) => {
    return (
      <TouchableOpacity
        onPress={() => notificationDeleteHandler(id)}
        style={[styles.deleteButton]}
      >
        <Ionicons style={{ marginRight: 2}} name="trash-outline" size={ms(24)} color="white" />
      </TouchableOpacity>
    );
  };

  const renderNotificationItem = ({ item }: { item: NotificationResponseData }) => (
    <Swipeable
      renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item._id)}
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item._id)}
    >
      <TouchableOpacity
        onPress={() => {
          if (!item.read) {
            notificationReadHandler(item._id);
          }
        }}
        style={[
          styles.notificationItem,
          !item.read && styles.unreadNotification,
          { padding: ms(15) },
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={
              item.type === 'prayer'
                ? 'time-outline'
                : item.type === 'event'
                  ? 'calendar-outline'
                  : 'megaphone-outline'
            }
            size={ms(24)}
            color={Colors.primary}
          />
        </View>
        <View style={styles.contentContainer}>
          <Paragraph level="Small" weight="Bold">
            {item.title}
          </Paragraph>
          <Paragraph
            level="Small"
            style={[styles.notificationMessage, item.read && styles.readMessage]}
          >
            {item.message}
          </Paragraph>
          <Paragraph level="XSmall" style={styles.timestamp}>
            {timeAgo(item.timestamp)}
          </Paragraph>
        </View>
        {!item.read && <View style={styles.unreadIndicator} />}
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaWrapper>
        <View style={globalStyles.container}>
          <Header title={t('title')} />

          <View style={styles.segmentContainer}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                selectedSegment === 'All' && styles.activeSegment,
              ]}
              onPress={() => setSelectedSegment('All')}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedSegment === 'All' && styles.activeSegmentText,
                ]}
              >
                {t('all')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentButton,
                selectedSegment === 'Unread' && styles.activeSegment,
              ]}
              onPress={() => setSelectedSegment('Unread')}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedSegment === 'Unread' && styles.activeSegmentText,
                ]}
              >
                {t('unread')}
              </Text>
            </TouchableOpacity>
          </View>

          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../assets/no-notifications.png')}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyText}>
                {selectedSegment === 'All' ? t('noNotifications') : t('noUnread')}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredNotifications}
              renderItem={renderNotificationItem}
              keyExtractor={item => item?._id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>
      </SafeAreaWrapper>
    </GestureHandlerRootView>
  );
};

export default NotificationsScreen;
