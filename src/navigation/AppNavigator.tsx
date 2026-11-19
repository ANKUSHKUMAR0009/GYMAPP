
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/navigationTypes';

// Main screens
import WelcomeScreen from '../screens/WelcomeScreen';
import UserLoginScreen from '../screens/UserLoginScreen';
import UserRegistrationScreen from '../screens/UserRegistrationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ApprovalScreen from '../screens/ApprovalScreen';
import UserDashboardScreen from '../screens/UserDashboardScreen';

// Membership screens
import MembershipScreen from '../screens/membership/MembershipScreen';
import MembershipHistoryScreen from '../screens/membership/MembershipHistoryScreen';
import PaymentScreen from '../screens/membership/PaymentScreen';

// Attendance screens
import AttendanceScreen from '../screens/attendence/AttendenceScreen';

// Announcement screens
import AnnouncementsScreen from '../screens/announcements/AnnouncementScreen';
import AnnouncementDetailsScreen from '../screens/announcements/AnnouncementDetailsScreen';

// Gym timings screen
import GymTimingsScreen from '../screens/timings/GymTimingScreen';

// Profile screen
import UserProfileScreen from '../screens/profile/UserProfileScreen';

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

      {/* Authentication */}
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
      <Stack.Screen name="ApprovalScreen" component={ApprovalScreen} />

      {/* User dashboard */}
      <Stack.Screen
        name="UserDashboard"
        component={UserDashboardScreen}
      />

      {/* Membership */}
      <Stack.Screen name="Membership" component={MembershipScreen} />
      <Stack.Screen
        name="MembershipHistory"
        component={MembershipHistoryScreen}
      />
      <Stack.Screen name="Payment" component={PaymentScreen} />

      {/* Attendance */}
      <Stack.Screen name="Attendance" component={AttendanceScreen} />

      {/* Announcements */}
      <Stack.Screen
        name="Announcements"
        component={AnnouncementsScreen}
      />
      <Stack.Screen
        name="AnnouncementDetails"
        component={AnnouncementDetailsScreen}
      />

      {/* Gym timings */}
      <Stack.Screen name="GymTimings" component={GymTimingsScreen} />

      {/* Profile */}
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
