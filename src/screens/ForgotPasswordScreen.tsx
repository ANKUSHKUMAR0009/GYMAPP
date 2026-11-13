
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');

  const handleSendResetLink = () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      Alert.alert(
        'Missing Email',
        'Please enter your registered email address.',
      );
      return;
    }

    // TODO: Send the email to the Express backend.
    // The backend should verify the request and trigger a secure
    // password-reset email using the chosen authentication service.
    // Example with Firebase: sendPasswordResetEmail(auth, cleanEmail).
    // Do not put private service credentials in the mobile app.

    Alert.alert(
      'Reset Email Not Connected',
      'Your email has passed the basic check. Email reset functionality will be added with the backend.',
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>?</Text>
        </View>

        <Text style={styles.heading}>Forgot Password?</Text>

        <Text style={styles.subtitle}>
          Don't worry. We'll help you get back into your account.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Registered Email Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your registered email"
            placeholderTextColor="#8A938B"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSendResetLink}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendResetLink}
            activeOpacity={0.8}
          >
            <Text style={styles.sendButtonText}>Send Reset Link</Text>
          </TouchableOpacity>

          <View style={styles.noticeCard}>
            <Text style={styles.noticeText}>
              NOTE - A secure password reset link will be sent to your registered
              email address. Please check your inbox and spam folder.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>
            ← Back to Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111813',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#B7F34B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 22,
  },
  iconText: {
    color: '#111813',
    fontSize: 34,
    fontWeight: 'bold',
  },
  heading: {
    color: '#B7F34B',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#D4DAD5',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
  },
  formCard: {
    backgroundColor: '#1B241D',
    borderColor: '#38443B',
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    height: 52,
    backgroundColor: '#111813',
    borderColor: '#38443B',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  sendButton: {
    height: 52,
    backgroundColor: '#B7F34B',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  sendButtonText: {
    color: '#111813',
    fontSize: 15,
    fontWeight: 'bold',
  },
  noticeCard: {
    backgroundColor: '#252F23',
    borderColor: '#586B37',
    borderWidth: 1,
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
  },
  noticeText: {
    color: '#F0F3ED',
    fontSize: 13,
    lineHeight: 21,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 22,
  },
  backButtonText: {
    color: '#B7F34B',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
