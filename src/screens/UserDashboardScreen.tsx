
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const COLORS = {
  background: '#111813',
  card: '#1B241D',
  lime: '#B7F34B',
  white: '#FFFFFF',
  muted: '#A4AEA5',
  border: '#303B32',
};

const UserDashboardScreen = ({navigation}: any) => {
  // Temporary sample data. We will replace this with backend API data.
  const membershipStatus = 'Not Purchased';
  const attendanceCount = 12;
  const latestAnnouncement = 'Welcome to Fitness Club! Stay consistent with your fitness journey.';

  const openScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const quickAccessItems = [
    {title: 'Attendance', subtitle: 'View your records', icon: '📅', screen: 'Attendance'},
    {title: 'Membership', subtitle: 'Plans and details', icon: '💳', screen: 'Membership'},
    {title: 'Notices', subtitle: 'Club announcements', icon: '📢', screen: 'Announcements'},
    {title: 'Gym Timings', subtitle: 'Weekly schedule', icon: '🕒', screen: 'GymTimings'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome Back!</Text>
            <Text style={styles.headerSubtitle}>Let's get stronger today.</Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() => openScreen('UserProfile')}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </Pressable>
        </View>

        {/* Membership Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Membership</Text>

          <View style={styles.membershipCard}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardLabel}>MEMBERSHIP STATUS</Text>
              <Text style={styles.statusBadge}>{membershipStatus}</Text>
            </View>

            <Text style={styles.membershipTitle}>
              Your Fitness Journey
            </Text>

            <Text style={styles.cardDescription}>
              Explore our membership plans and find the right option for you.
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() => openScreen('Membership')}
            >
              <Text style={styles.primaryButtonText}>View Membership</Text>
              <Text style={styles.primaryButtonText}> → </Text>
            </Pressable>
          </View>
        </View>

        {/* Attendance Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Attendance</Text>

          <View style={styles.attendanceCard}>
            <View style={styles.attendanceInfo}>
              <Text style={styles.cardLabel}>TOTAL ATTENDANCE</Text>
              <Text style={styles.attendanceNumber}>{attendanceCount}</Text>
              <Text style={styles.cardDescription}>
                Recorded attendance days
              </Text>
            </View>

            <Text style={styles.attendanceIcon}>📊</Text>

            <Pressable
              style={styles.outlineButton}
              onPress={() => openScreen('Attendance')}
            >
              <Text style={styles.outlineButtonText}>View History →</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>

          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map(item => (
              <Pressable
                key={item.title}
                style={({pressed}) => [
                  styles.quickAccessCard,
                  pressed && styles.pressed,
                ]}
                onPress={() => openScreen(item.screen)}
              >
                <Text style={styles.quickAccessIcon}>{item.icon}</Text>
                <Text style={styles.quickAccessTitle}>{item.title}</Text>
                <Text style={styles.quickAccessSubtitle}>{item.subtitle}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Latest Announcement */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Announcement</Text>

            <Pressable onPress={() => openScreen('Announcements')}>
              <Text style={styles.viewAllText}>View All →</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.announcementCard}
            onPress={() => openScreen('Announcements')}
          >
            <View style={styles.announcementTopRow}>
              <Text style={styles.announcementTag}>LATEST NOTICE</Text>
              <Text style={styles.announcementIcon}>📢</Text>
            </View>

            <Text style={styles.announcementTitle}>
              Fitness Club Update
            </Text>

            <Text style={styles.cardDescription}>
              {latestAnnouncement}
            </Text>

            <Text style={styles.readMoreText}>Read Announcements →</Text>
          </Pressable>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>⌂</Text>
          <Text style={styles.navActiveText}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => openScreen('Attendance')}
        >
          <Text style={styles.navIcon}>▦</Text>
          <Text style={styles.navText}>Attendance</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => openScreen('Membership')}
        >
          <Text style={styles.navIcon}>▣</Text>
          <Text style={styles.navText}>Membership</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => openScreen('UserProfile')}
        >
          <Text style={styles.navIcon}>◉</Text>
          <Text style={styles.navText}>Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 25,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  greeting: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 5,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileIcon: {
    fontSize: 23,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 13,
  },

  membershipCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  statusBadge: {
    color: COLORS.lime,
    fontSize: 11,
    fontWeight: '800',
    backgroundColor: '#303F25',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  membershipTitle: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: '800',
    marginTop: 22,
  },

  cardDescription: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  primaryButton: {
    backgroundColor: COLORS.lime,
    borderRadius: 12,
    minHeight: 46,
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: '800',
  },

  attendanceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  attendanceInfo: {
    flex: 1,
  },

  attendanceNumber: {
    color: COLORS.lime,
    fontSize: 36,
    fontWeight: '900',
    marginTop: 8,
  },

  attendanceIcon: {
    position: 'absolute',
    right: 20,
    top: 24,
    fontSize: 36,
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.lime,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 18,
  },

  outlineButtonText: {
    color: COLORS.lime,
    fontWeight: '800',
    fontSize: 13,
  },

  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  quickAccessCard: {
    width: '48%',
    minHeight: 125,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    justifyContent: 'center',
  },

  quickAccessIcon: {
    fontSize: 25,
    marginBottom: 10,
  },

  quickAccessTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
  },

  quickAccessSubtitle: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 5,
  },

  pressed: {
    opacity: 0.7,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewAllText: {
    color: COLORS.lime,
    fontSize: 12,
    fontWeight: '800',
  },

  announcementCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 17,
  },

  announcementTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  announcementTag: {
    color: COLORS.lime,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },

  announcementIcon: {
    fontSize: 24,
  },

  announcementTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 15,
  },

  readMoreText: {
    color: COLORS.lime,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 16,
  },

  bottomNavigation: {
    minHeight: 68,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
  },

  navIcon: {
    color: COLORS.muted,
    fontSize: 22,
    marginBottom: 3,
  },

  navText: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '600',
  },

  navActiveText: {
    color: COLORS.lime,
    fontSize: 10,
    fontWeight: '800',
  },
});

export default UserDashboardScreen;
