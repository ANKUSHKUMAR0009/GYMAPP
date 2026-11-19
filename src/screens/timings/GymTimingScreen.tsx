
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
import {getGymTimings} from '../../services/timingService';

type Props = NativeStackScreenProps<RootStackParamList, 'GymTimings'>;

type GymDay = {
  day: string;
  openingTime?: string;
  closingTime?: string;
  isClosed: boolean;
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

const GymTimingsScreen = ({navigation}: Props) => {
  const [schedule, setSchedule] = useState<GymDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTimings = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await getGymTimings();

      // The backend can return an array directly
      // or an array inside a "schedule" property.
      const receivedSchedule = Array.isArray(response)
        ? response
        : response?.schedule;

      if (!Array.isArray(receivedSchedule)) {
        throw new Error('Invalid gym timings response.');
      }

      setSchedule(receivedSchedule);
    } catch (err) {
      setError(
        'Unable to load gym timings. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTimings();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Gym Timings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.heading}>Weekly Schedule</Text>

        <Text style={styles.subtitle}>
          Check the opening and closing hours of Fitness Club.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Plan Your Workout</Text>
          <Text style={styles.infoText}>
            Check the weekly schedule before visiting the gym.
            Timings are managed by the Fitness Club administration.
          </Text>
        </View>

        {isLoading && (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" color={COLORS.lime} />
            <Text style={styles.messageText}>
              Loading gym timings...
            </Text>
          </View>
        )}

        {!isLoading && error !== '' && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.retryButton}
              onPress={loadTimings}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && error === '' && (
          <>
            <Text style={styles.scheduleTitle}>
              Opening Hours
            </Text>

            {schedule.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                  Timings Not Available
                </Text>
                <Text style={styles.emptyText}>
                  The weekly schedule has not been added yet.
                </Text>
              </View>
            ) : (
              schedule.map((item, index) => (
                <View key={`${item.day}-${index}`} style={styles.dayCard}>
                  <Text style={styles.dayName}>{item.day}</Text>

                  {item.isClosed ? (
                    <Text style={styles.closedText}>Closed</Text>
                  ) : (
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeText}>
                        {item.openingTime || '--:--'}
                      </Text>

                      <Text style={styles.toText}>to</Text>

                      <Text style={styles.timeText}>
                        {item.closingTime || '--:--'}
                      </Text>
                    </View>
                  )}
                </View>
              ))
            )}
          </>
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
    marginBottom: 22,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 18,
    marginBottom: 27,
  },
  infoTitle: {
    color: COLORS.lime,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  infoText: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
  },
  scheduleTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 15,
  },
  dayCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 17,
    paddingVertical: 19,
    marginBottom: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  timeText: {
    color: COLORS.lime,
    fontSize: 13,
    fontWeight: '700',
  },
  toText: {
    color: COLORS.muted,
    fontSize: 12,
  },
  closedText: {
    color: COLORS.red,
    fontSize: 13,
    fontWeight: '800',
  },
  messageContainer: {
    alignItems: 'center',
    paddingVertical: 35,
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
  emptyContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 9,
    lineHeight: 20,
  },
});

export default GymTimingsScreen;
