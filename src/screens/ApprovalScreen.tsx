
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ApprovalScreen'>;

function ApprovalScreen({route, navigation}: Props) {
  const {status} = route.params;

  const isPending = status === 'pending';
  const isInactive = status === 'inactive';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>
          {isPending ? '⏳' : isInactive ? '⚠️' : 'ℹ️'}
        </Text>

        <Text style={styles.heading}>
          {isPending
            ? 'Account Pending'
            : isInactive
              ? 'Account Inactive'
              : 'Account Status'}
        </Text>

        <Text style={styles.message}>
          {isPending
            ? 'Your account is currently pending approval. Your registration has been received successfully. Please wait while the admin reviews your application.'
            : isInactive
              ? 'Your account is currently inactive. You cannot access the gym app at the moment. Please contact the gym administrator for further assistance.'
              : 'Your account status could not be identified. Please contact the gym administrator.'}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('UserLogin')}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ApprovalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111813',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 55,
    marginBottom: 20,
  },
  heading: {
    color: '#B7F34B',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 35,
  },
  button: {
    backgroundColor: '#B7F34B',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#111813',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
