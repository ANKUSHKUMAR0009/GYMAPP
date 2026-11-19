
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
import {getMembershipPlans} from '../../services/membershipService';

type Props = NativeStackScreenProps<RootStackParamList, 'Membership'>;

type MembershipPlan = {
  id: string;
  name: string;
  durationInMonths: number;
  price: number;
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

const PLAN_OPTIONS = [
  {name: 'Monthly', duration: 1},
  {name: 'Quarterly', duration: 3},
  {name: 'Half-Yearly', duration: 6},
  {name: 'Yearly', duration: 12},
];

const MembershipScreen = ({navigation}: Props) => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [selectedPlan, setSelectedPlan] =
    useState<MembershipPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPlans = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await getMembershipPlans();

      // The backend should return an array of membership plans.
      // It may also return the array inside a "plans" property.
      const receivedPlans = Array.isArray(response)
        ? response
        : response?.plans;

      if (!Array.isArray(receivedPlans)) {
        throw new Error('Invalid membership plans response.');
      }

      setPlans(receivedPlans);
      setSelectedPlan(null);
    } catch (err) {
      setPlans([]);
      setSelectedPlan(null);
      setError(
        'Unable to load membership plans. Please check your connection and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const getPlanForDuration = (duration: number) => {
    return plans.find(
      plan => Number(plan.durationInMonths) === duration,
    );
  };

  const handleContinue = () => {
    if (!selectedPlan) {
      return;
    }

    navigation.navigate('Payment', {
  planId: selectedPlan.id,
  planName: selectedPlan.name,
  durationInMonths: selectedPlan.durationInMonths,
  amount: Number(selectedPlan.price),
});
  };

  const formatPrice = (price: number) => {
    return `₹${Number(price).toLocaleString('en-IN')}`;
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

        <Text style={styles.headerTitle}>Membership Plans</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.heading}>Choose Your Plan</Text>

        <Text style={styles.subtitle}>
          Select a membership that fits your fitness goals.
        </Text>

        {isLoading && (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" color={COLORS.lime} />
            <Text style={styles.messageText}>
              Loading membership plans...
            </Text>
          </View>
        )}

        {!isLoading && error !== '' && (
          <View style={styles.messageContainer}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.retryButton}
              onPress={loadPlans}>
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        )}

        {!isLoading && error === '' && (
          <>
            <View style={styles.plansContainer}>
              {PLAN_OPTIONS.map(option => {
                const plan = getPlanForDuration(option.duration);
                const isSelected =
                  selectedPlan?.id === plan?.id && !!plan;

                return (
                  <Pressable
                    key={option.name}
                    disabled={!plan}
                    onPress={() => plan && setSelectedPlan(plan)}
                    style={[
                      styles.planCard,
                      isSelected && styles.selectedPlanCard,
                      !plan && styles.unavailableCard,
                    ]}>

                    <View style={styles.planTopRow}>
                      <View>
                        <Text style={styles.planName}>
                          {option.name}
                        </Text>

                        <Text style={styles.durationText}>
                          {option.duration}{' '}
                          {option.duration === 1 ? 'month' : 'months'}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.selectionCircle,
                          isSelected && styles.selectedCircle,
                        ]}>
                        {isSelected && (
                          <View style={styles.selectionDot} />
                        )}
                      </View>
                    </View>

                    <View style={styles.priceContainer}>
                      {plan ? (
                        <Text style={styles.priceText}>
                          {formatPrice(plan.price)}
                        </Text>
                      ) : (
                        <Text style={styles.unavailableText}>
                          Price unavailable
                        </Text>
                      )}
                    </View>

                    {isSelected && (
                      <Text style={styles.selectedLabel}>
                        Selected Plan
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>

            {plans.length === 0 && (
              <Text style={styles.noPlansText}>
                No membership plans are currently available.
              </Text>
            )}

            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>
                Membership prices are provided by Fitness Club.
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[
            styles.continueButton,
            !selectedPlan && styles.disabledButton,
          ]}
          disabled={!selectedPlan}
          onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            Continue to Payment
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
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
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
  plansContainer: {
    gap: 14,
  },
  planCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 18,
  },
  selectedPlanCard: {
    borderColor: COLORS.lime,
    backgroundColor: '#202B20',
  },
  unavailableCard: {
    opacity: 0.55,
  },
  planTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  durationText: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 5,
  },
  selectionCircle: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderColor: COLORS.lime,
  },
  selectionDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.lime,
  },
  priceContainer: {
    marginTop: 18,
  },
  priceText: {
    color: COLORS.lime,
    fontSize: 25,
    fontWeight: '800',
  },
  unavailableText: {
    color: COLORS.muted,
    fontSize: 14,
  },
  selectedLabel: {
    color: COLORS.lime,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
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
    lineHeight: 21,
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
  noPlansText: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 20,
  },
  noteContainer: {
    marginTop: 22,
  },
  noteText: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  continueButton: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: COLORS.lime,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.4,
  },
  continueButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default MembershipScreen;
