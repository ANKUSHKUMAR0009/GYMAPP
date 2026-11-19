
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
import {getMembershipHistory} from '../../services/membershipService';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'MembershipHistory'
>;

type MembershipRecord = {
  id: string;
  name: string;
  durationInMonths: number;
  price: number;
  startDate: string;
  endDate: string;
  status: string;
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

const MembershipHistoryScreen = ({navigation}: Props) => {
  const [history, setHistory] = useState<MembershipRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await getMembershipHistory();

      // The backend can return an array directly
      // or an array inside "memberships" or "history".
      const records = Array.isArray(response)
        ? response
        : response?.memberships ?? response?.history;

      if (!Array.isArray(records)) {
        throw new Error('Invalid membership history response.');
      }

      setHistory(records);
    } catch (err) {
      setError(
        'Unable to load membership history. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const formatDate = (date: string) => {
    if (!date) {
      return 'Not available';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Not available';
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  const getStatusColor = (status: string) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === 'active') {
      return COLORS.lime;
    }

    if (
      normalizedStatus === 'expired' ||
      normalizedStatus === 'cancelled'
    ) {
      return COLORS.red;
    }

    return COLORS.muted;
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

        <Text style={styles.headerTitle}>Membership History</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.heading}>Your Memberships</Text>

        <Text style={styles.subtitle}>
          View all your previous and current membership records.
        </Text>

        {isLoading && (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" color={COLORS.lime} />
            <Text style={styles.messageText}>
              Loading your membership history...
            </Text>
          </View>
        )}

        {!isLoading && error !== '' && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.retryButton}
              onPress={loadHistory}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && error === '' && history.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>▤</Text>

            <Text style={styles.emptyTitle}>
              No Membership History
            </Text>

            <Text style={styles.emptyText}>
              Your membership purchases will appear here.
            </Text>

            <Pressable
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Membership')}>
              <Text style={styles.exploreButtonText}>
                Explore Membership Plans
              </Text>
            </Pressable>
          </View>
        )}

        {!isLoading &&
          error === '' &&
          history.map(record => (
            <View key={record.id} style={styles.historyCard}>
              <View style={styles.cardTopRow}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>
                    {record.name}
                  </Text>

                  <Text style={styles.durationText}>
                    {record.durationInMonths}{' '}
                    {record.durationInMonths === 1
                      ? 'Month'
                      : 'Months'}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.statusText,
                    {color: getStatusColor(record.status)},
                  ]}>
                  {record.status}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount Paid</Text>
                <Text style={styles.amountText}>
                  {formatPrice(record.price)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Start Date</Text>
                <Text style={styles.detailValue}>
                  {formatDate(record.startDate)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>End Date</Text>
                <Text style={styles.detailValue}>
                  {formatDate(record.endDate)}
                </Text>
              </View>
            </View>
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
    fontSize: 19,
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
  historyCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  durationText: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 5,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 17,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  detailLabel: {
    color: COLORS.muted,
    fontSize: 13,
  },
  detailValue: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  amountText: {
    color: COLORS.lime,
    fontSize: 16,
    fontWeight: '800',
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
    textAlign: 'center',
    fontSize: 14,
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
    alignItems: 'center',
    paddingVertical: 45,
    paddingHorizontal: 15,
  },
  emptyIcon: {
    color: COLORS.lime,
    fontSize: 45,
    marginBottom: 15,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: '700',
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 9,
    lineHeight: 21,
  },
  exploreButton: {
    backgroundColor: COLORS.lime,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginTop: 22,
  },
  exploreButtonText: {
    color: COLORS.background,
    fontWeight: '800',
    fontSize: 14,
  },
});

export default MembershipHistoryScreen;
