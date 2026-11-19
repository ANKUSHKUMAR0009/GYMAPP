
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
import {
  getAttendanceSummary,
  getAttendanceHistory,
} from '../../services/attendanceService.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Attendance'>;

type AttendanceRecord = {
  id: string;
  date: string;
  status: string;
  checkInTime?: string;
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

const AttendanceScreen = ({navigation}: Props) => {
  const [totalDays, setTotalDays] = useState(0);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAttendance = async () => {
    try {
      setIsLoading(true);
      setError('');

      const [summaryResponse, historyResponse] = await Promise.all([
        getAttendanceSummary(),
        getAttendanceHistory(),
      ]);

      // Expected summary: { totalDays: number }
      const summary = summaryResponse?.summary ?? summaryResponse;

      // Expected history: an array or { records: [...] }
      const attendanceRecords = Array.isArray(historyResponse)
        ? historyResponse
        : historyResponse?.records ?? historyResponse?.history;

      if (!Array.isArray(attendanceRecords)) {
        throw new Error('Invalid attendance history response.');
      }

      setTotalDays(Number(summary?.totalDays ?? 0));
      setRecords(attendanceRecords);
    } catch (err) {
      setError(
        'Unable to load attendance details. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
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
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    return status?.toLowerCase() === 'present'
      ? COLORS.lime
      : COLORS.red;
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

        <Text style={styles.headerTitle}>My Attendance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.heading}>Attendance Overview</Text>

        <Text style={styles.subtitle}>
          Keep track of your fitness journey and gym visits.
        </Text>

        {isLoading && (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" color={COLORS.lime} />
            <Text style={styles.messageText}>
              Loading attendance...
            </Text>
          </View>
        )}

        {!isLoading && error !== '' && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.retryButton}
              onPress={loadAttendance}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && error === '' && (
          <>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>
                Total Days Present
              </Text>

              <Text style={styles.totalNumber}>{totalDays}</Text>

              <Text style={styles.summaryDescription}>
                Your recorded gym attendance
              </Text>
            </View>

            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>
                Attendance History
              </Text>

              <Text style={styles.recordCount}>
                {records.length} Records
              </Text>
            </View>

            {records.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                  No Attendance Records
                </Text>

                <Text style={styles.emptyText}>
                  Your attendance records will appear here once
                  the admin marks your attendance.
                </Text>
              </View>
            ) : (
              records.map(record => (
                <View key={record.id} style={styles.recordCard}>
                  <View style={styles.recordLeft}>
                    <Text style={styles.recordDate}>
                      {formatDate(record.date)}
                    </Text>

                    {record.checkInTime ? (
                      <Text style={styles.checkInText}>
                        Check-in: {record.checkInTime}
                      </Text>
                    ) : null}
                  </View>

                  <Text
                    style={[
                      styles.statusText,
                      {color: getStatusColor(record.status)},
                    ]}>
                    {record.status}
                  </Text>
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
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
  },
  summaryLabel: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  totalNumber: {
    color: COLORS.lime,
    fontSize: 48,
    fontWeight: '900',
    marginTop: 10,
  },
  summaryDescription: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  historyTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
  },
  recordCount: {
    color: COLORS.muted,
    fontSize: 12,
  },
  recordCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 17,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordLeft: {
    flex: 1,
    marginRight: 12,
  },
  recordDate: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  checkInText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize',
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
    lineHeight: 20,
    textAlign: 'center',
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

export default AttendanceScreen;
