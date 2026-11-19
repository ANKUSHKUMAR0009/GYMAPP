
import React from 'react';
import {
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

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const COLORS = {
  background: '#111813',
  card: '#1B241D',
  lime: '#B7F34B',
  white: '#FFFFFF',
  muted: '#A4AEA5',
  border: '#303B32',
};

const PaymentScreen = ({navigation, route}: Props) => {
  const {planId, planName, durationInMonths, amount} = route.params;

  const formatPrice = (price: number) =>
    `₹${Number(price).toLocaleString('en-IN')}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.heading}>Order Summary</Text>

        <Text style={styles.subtitle}>
          Review your selected membership before proceeding.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Selected Membership</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plan</Text>
            <Text style={styles.detailValue}>{planName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>
              {durationInMonths}{' '}
              {durationInMonths === 1 ? 'Month' : 'Months'}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              {formatPrice(amount)}
            </Text>
          </View>
        </View>

        <View style={styles.informationCard}>
          <Text style={styles.informationTitle}>
            Secure Payment
          </Text>

          <Text style={styles.informationText}>
            Your payment will be processed through the payment gateway
            connected by Fitness Club.
          </Text>

          <Text style={styles.informationText}>
            Your membership will be activated only after the backend
            verifies the payment successfully.
          </Text>
        </View>

        <Text style={styles.planReference}>
          Plan reference: {planId}
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pendingNotice}>
          <Text style={styles.pendingText}>
            Payment gateway integration is pending.
          </Text>
        </View>

        <Pressable
          style={styles.disabledButton}
          disabled>
          <Text style={styles.buttonText}>
            Proceed to Payment
          </Text>
        </Pressable>
      </View>
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
  },
  heading: {
    color: COLORS.white,
    fontSize: 26,
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
    padding: 20,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 22,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  detailLabel: {
    color: COLORS.muted,
    fontSize: 14,
  },
  detailValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  totalLabel: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  totalAmount: {
    color: COLORS.lime,
    fontSize: 24,
    fontWeight: '800',
  },
  informationCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginTop: 22,
    gap: 12,
  },
  informationTitle: {
    color: COLORS.lime,
    fontSize: 16,
    fontWeight: '700',
  },
  informationText: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
  },
  planReference: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 18,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  pendingNotice: {
    marginBottom: 12,
  },
  pendingText: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: 'center',
  },
  disabledButton: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: COLORS.lime,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default PaymentScreen;
