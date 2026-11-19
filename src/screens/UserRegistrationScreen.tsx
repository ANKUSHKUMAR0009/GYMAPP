
import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'UserRegistration'
>;

function UserRegistrationScreen({navigation}: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !password.trim()
    ) {
      Alert.alert('Missing Details', 'Please fill in all the fields.');
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile.trim())) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid 10-digit mobile number.',
      );
      return;
    }

    // Validate password
    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must contain at least 6 characters.',
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        'http://10.32.232.25:3000/api/user/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            mobileNo: mobile.trim(),
            password,
          }),
        },
      );

      const responseText = await response.text();

      let data: any = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = {message: responseText};
      }

      if (!response.ok) {
        Alert.alert(
          'Registration Failed',
          data.message || 'Unable to create your account.',
        );
        return;
      }

      Alert.alert(
        'Registration Successful',
        data.message || 'Your account has been created successfully.',
        [
          {
            text: 'Go to Login',
            onPress: () => navigation.replace('UserLogin'),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Connection Error',
        'Could not connect to the server. Please check your internet connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">

        <View style={styles.formContainer}>
          <Image
            source={require('../assets/fitness logo.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.heading}>Create Account</Text>

          <Text style={styles.subtitle}>
            Join Fitness Club
          </Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#A6B09F"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#A6B09F"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#A6B09F"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#A6B09F"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A6B09F"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}>
            <Text style={styles.registerButtonText}>
              {loading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.normalText}>
              Already have an account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('UserLogin')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default UserRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111813',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  formContainer: {
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 55,
  },
  heading: {
    color: '#B7F34B',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#263329',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#43533D',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 13,
  },
  registerButton: {
    backgroundColor: '#B7F34B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#111813',
    fontSize: 17,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 23,
    flexWrap: 'wrap',
  },
  normalText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginText: {
    color: '#B7F34B',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
