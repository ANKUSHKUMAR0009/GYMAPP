
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../types/navigationTypes';
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  logoutUser,
} from '../../services/profileService';

type Props = NativeStackScreenProps<RootStackParamList, 'UserProfile'>;

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const COLORS = {
  background: '#111813',
  card: '#1B241D',
  lime: '#B7F34B',
  white: '#FFFFFF',
  muted: '#A4AEA5',
  border: '#303B32',
  danger: '#FF6B6B',
};

const UserProfileScreen = ({navigation}: Props) => {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await getUserProfile();

      // Supports either a direct profile object or an object containing "user".
      const user = response?.user ?? response;

      setProfile({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
      });
    } catch (error) {
      Alert.alert(
        'Unable to Load Profile',
        'Please check your connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!profile.firstName.trim() || !profile.email.trim()) {
      Alert.alert('Missing Information', 'First name and email are required.');
      return;
    }

    try {
      setSaving(true);

      await updateUserProfile({
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
      });

      setEditing(false);
      Alert.alert('Success', 'Your profile has been updated.');
    } catch (error) {
      Alert.alert('Update Failed', 'Unable to update your profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Missing Information', 'Please fill in all password fields.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Invalid Password', 'New password must contain at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Password Mismatch', 'New password and confirm password do not match.');
      return;
    }

    try {
      setSaving(true);

      await changeUserPassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setChangingPassword(false);

      Alert.alert('Success', 'Your password has been changed.');
    } catch (error) {
      Alert.alert(
        'Password Change Failed',
        'Unable to change your password. Please check your current password.',
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutUser();
            } catch (error) {
              // Continue to the Welcome screen even if the logout API fails.
            } finally {
              navigation.reset({
                index: 0,
                routes: [{name: 'Welcome'}],
              });
            }
          },
        },
      ],
    );
  };

  const updateField = (field: keyof ProfileData, value: string) => {
    setProfile(previous => ({
      ...previous,
      [field]: value,
    }));
  };

  const renderProfileField = (
    label: string,
    field: keyof ProfileData,
    placeholder: string,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default',
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, !editing && styles.readOnlyInput]}
        value={profile[field]}
        onChangeText={value => updateField(field, value)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        keyboardType={keyboardType}
        editable={editing}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.lime} />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>‹ Back</Text>
          </Pressable>

          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.profileHeading}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.firstName ? profile.firstName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>

          <Text style={styles.userName}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.userEmail}>{profile.email}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <Pressable
              onPress={() => {
                if (editing) {
                  loadProfile();
                  setEditing(false);
                } else {
                  setEditing(true);
                }
              }}>
              <Text style={styles.actionText}>
                {editing ? 'Cancel' : 'Edit'}
              </Text>
            </Pressable>
          </View>

          {renderProfileField('First Name', 'firstName', 'Enter first name')}
          {renderProfileField('Last Name', 'lastName', 'Enter last name')}
          {renderProfileField('Email Address', 'email', 'Enter email address', 'email-address')}
          {renderProfileField('Phone Number', 'phone', 'Enter phone number', 'phone-pad')}

          {editing && (
            <Pressable
              style={styles.primaryButton}
              onPress={handleSaveProfile}
              disabled={saving}>
              <Text style={styles.primaryButtonText}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          {!changingPassword ? (
            <Pressable
              style={styles.secondaryButton}
              onPress={() => setChangingPassword(true)}>
              <Text style={styles.secondaryButtonText}>Change Password</Text>
            </Pressable>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor={COLORS.muted}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />

              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor={COLORS.muted}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                placeholderTextColor={COLORS.muted}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <Pressable
                style={styles.primaryButton}
                onPress={handleChangePassword}
                disabled={saving}>
                <Text style={styles.primaryButtonText}>
                  {saving ? 'Updating...' : 'Update Password'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={() => {
                  setChangingPassword(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </>
          )}
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

        <Text style={styles.footerText}>Fitness Club</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.muted,
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  backText: {
    color: COLORS.lime,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 45,
  },
  profileHeading: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.lime,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: COLORS.background,
    fontSize: 34,
    fontWeight: 'bold',
  },
  userName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  userEmail: {
    color: COLORS.muted,
    fontSize: 14,
    marginTop: 5,
  },
  section: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionText: {
    color: COLORS.lime,
    fontSize: 15,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    color: COLORS.muted,
    fontSize: 13,
    marginBottom: 7,
  },
  input: {
    minHeight: 49,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 11,
    paddingHorizontal: 13,
    color: COLORS.white,
    backgroundColor: COLORS.background,
    fontSize: 15,
    marginBottom: 12,
  },
  readOnlyInput: {
    opacity: 0.8,
  },
  primaryButton: {
    minHeight: 49,
    backgroundColor: COLORS.lime,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryButton: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.lime,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.lime,
    fontSize: 15,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    padding: 13,
  },
  cancelButtonText: {
    color: COLORS.muted,
    fontSize: 14,
  },
  logoutButton: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 25,
    fontSize: 13,
  },
});

export default UserProfileScreen;
