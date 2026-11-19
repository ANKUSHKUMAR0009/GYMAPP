
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
import {getAnnouncementDetails} from '../../services/announcementService';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AnnouncementDetails'
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

const AnnouncementDetailsScreen = ({navigation, route}: Props) => {
  const {announcementId} = route.params;

  const [announcement, setAnnouncement] =
    useState<Announcement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAnnouncement = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await getAnnouncementDetails(announcementId);

      // The backend may return the announcement directly
      // or inside an "announcement" property.
      const receivedAnnouncement =
        response?.announcement ?? response;

      if (
        !receivedAnnouncement ||
        !receivedAnnouncement.title ||
        !receivedAnnouncement.message
      ) {
        throw new Error('Invalid announcement response.');
      }

      setAnnouncement(receivedAnnouncement);
    } catch (err) {
      setError(
        'Unable to load this announcement. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncement();
  }, [announcementId]);

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
      month: 'long',
      year: 'numeric',
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

        <Text style={styles.headerTitle}>Announcement</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {isLoading && (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" color={COLORS.lime} />
            <Text style={styles.messageText}>
              Loading announcement...
            </Text>
          </View>
        )}

        {!isLoading && error !== '' && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.retryButton}
              onPress={loadAnnouncement}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && error === '' && announcement && (
          <View style={styles.announcementCard}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>!</Text>
            </View>

            <Text style={styles.dateText}>
              {formatDate(announcement.date)}
            </Text>

            <Text style={styles.title}>
              {announcement.title}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.message}>
              {announcement.message}
            </Text>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Fitness Club
              </Text>
            </View>
          </View>
        )}
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
    padding: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },
  announcementCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 22,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#303D25',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconText: {
    color: COLORS.lime,
    fontSize: 25,
    fontWeight: '900',
  },
  dateText: {
    color: COLORS.muted,
    fontSize: 13,
    marginBottom: 13,
  },
  title: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 31,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 22,
  },
  message: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 27,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 30,
    paddingTop: 17,
  },
  footerText: {
    color: COLORS.lime,
    fontSize: 13,
    fontWeight: '700',
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

export default AnnouncementDetailsScreen;
