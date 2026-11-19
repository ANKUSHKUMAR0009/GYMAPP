
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../types/navigationTypes';
import {getAnnouncements} from '../../services/announcementService';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Announcements'
>;

type Announcement = {
  id: string;
  title: string;
  message: string;
  date: string;
};

const COLORS = {
  background: '#111813',
  card: '#1B241D',
  lime: '#B7F34B',
  white: '#FFFFFF',
  muted: '#A4AEA5',
  border: '#303B32',
  red: '#FF7777',
};

const AnnouncementsScreen = ({navigation}: Props) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await getAnnouncements();

      // The backend can return an array directly
      // or an array inside an "announcements" property.
      const receivedAnnouncements = Array.isArray(response)
        ? response
        : response?.announcements;

      if (!Array.isArray(receivedAnnouncements)) {
        throw new Error('Invalid announcements response.');
      }

      setAnnouncements(receivedAnnouncements);
    } catch (err) {
      setError(
        'Unable to load announcements. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const formatDate = (date: string) => {
    if (!date) {
      return 'Date unavailable';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Date unavailable';
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const openAnnouncement = (announcementId: string) => {
    navigation.navigate('AnnouncementDetails', {
      announcementId,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Announcements</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.heading}>Latest Updates</Text>

        <Text style={styles.subtitle}>
          Stay updated with the latest news and information from
          Fitness Club.
        </Text>

        {isLoading && (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" color={COLORS.lime} />
            <Text style={styles.messageText}>
              Loading announcements...
            </Text>
          </View>
        )}

        {!isLoading && error !== '' && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.retryButton}
              onPress={loadAnnouncements}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        )}

        {!isLoading &&
          error === '' &&
          announcements.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                No Announcements Yet
              </Text>

              <Text style={styles.emptyText}>
                New announcements from Fitness Club will appear here.
              </Text>
            </View>
          )}

        {!isLoading &&
          error === '' &&
          announcements.map(announcement => (
            <Pressable
              key={announcement.id}
              style={({pressed}) => [
                styles.announcementCard,
                pressed && styles.cardPressed,
              ]}
              onPress={() => openAnnouncement(announcement.id)}>

              <View style={styles.cardTopRow}>
                <View style={styles.announcementIcon}>
                  <Text style={styles.iconText}>!</Text>
                </View>

                <Text style={styles.dateText}>
                  {formatDate(announcement.date)}
                </Text>
              </View>

              <Text style={styles.announcementTitle}>
                {announcement.title}
              </Text>

              <Text
                style={styles.announcementMessage}
                numberOfLines={3}>
                {announcement.message}
              </Text>

              <View style={styles.cardFooter}>
                <Text style={styles.readMoreText}>
                  Read More
                </Text>

                <Text style={styles.arrowText}>›</Text>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    color: COLORS.white,
    fontSize: 34,
  },
  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },
  heading: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 24,
  },
  announcementCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    padding: 18,
    marginBottom: 15,
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },
  announcementIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#303D25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: COLORS.lime,
    fontSize: 20,
    fontWeight: '900',
  },
  dateText: {
    color: COLORS.muted,
    fontSize: 12,
  },
  announcementTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
  },
  announcementMessage: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 9,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 17,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  readMoreText: {
    color: COLORS.lime,
    fontSize: 13,
    fontWeight: '700',
  },
  arrowText: {
    color: COLORS.lime,
    fontSize: 24,
  },
  emptyContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 9,
  },
  messageContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 14,
  },
  messageText: {
    color: COLORS.muted,
    fontSize: 14,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    borderWidth: 1,
    borderColor: COLORS.lime,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryText: {
    color: COLORS.lime,
    fontWeight: '700',
  },
});

export default AnnouncementsScreen;
