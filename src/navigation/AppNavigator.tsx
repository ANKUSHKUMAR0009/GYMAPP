
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import UserLoginScreen from '../screens/UserLoginScreen';
import UserRegistrationScreen from '../screens/UserRegistrationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ApprovalScreen from '../screens/ApprovalScreen';

// Define all screen names and their navigation parameters.
export type RootStackParamList = {
  Welcome: undefined;
  UserLogin: undefined;
  UserRegistration: undefined;
  ForgotPassword: undefined;

  ApprovalScreen: {
    status: 'pending' | 'inactive';
    userId: string;
  };

  UserDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: '#111813'},
        animation: 'slide_from_right',
      }}>

      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      <Stack.Screen name="UserLogin" component={UserLoginScreen} />

      <Stack.Screen
        name="UserRegistration"
        component={UserRegistrationScreen}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />

      <Stack.Screen
        name="ApprovalScreen"
        component={ApprovalScreen}
      />

      {/* Register UserDashboard here when its component is created. */}

    </Stack.Navigator>
  );
};

export default AppNavigator;
