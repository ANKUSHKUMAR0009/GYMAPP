
import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'UserLogin'>;

function UserLoginScreen({navigation}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Details',
        'Please enter your email and password.',
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        'http://10.32.232.25:3000/api/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
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
          'Login Failed',
          data.message || 'Unable to login.',
        );
        return;
      }

      const accessToken = data.data?.accessToken;

      if (!accessToken) {
        Alert.alert(
          'Login Error',
          'The server did not return an access token.',
        );
        return;
      }

      Alert.alert(
        'Login Successful',
        data.message || 'Welcome back to Fitness Club!',
        [
          {
            text: 'Continue',
            onPress: () => navigation.replace('UserDashboard'),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        'Connection Error',
        'Could not connect to the server. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/fitness logo.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.heading}>User Login</Text>

      <Text style={styles.subtitle}>
        Welcome back to Fitness Club!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#A6B09F"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A6B09F"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}>
        <Text style={styles.loginButtonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.normalText}>
          Don't have an account?{' '}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('UserRegistration')}>
          <Text style={styles.registerText}>Register Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UserLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111813',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  logo: {
    width: 115,
    height: 115,
    alignSelf: 'center',
    marginBottom: 18,
    borderRadius: 60,
  },
  heading: {
    color: '#B7F34B',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#263329',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#43533D',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 15,
  },
  forgotText: {
    color: '#B7F34B',
    textAlign: 'right',
    marginBottom: 25,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#B7F34B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#111813',
    fontSize: 17,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  normalText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  registerText: {
    color: '#B7F34B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 25,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
