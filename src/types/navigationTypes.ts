
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

  // Membership
  Membership: undefined;
  MembershipHistory: undefined;
Payment: {
  planId: string;
  planName: string;
  durationInMonths: number;
  amount: number;
};

  // Attendance
  Attendance: undefined;

  // Announcements
  Announcements: undefined;
  AnnouncementDetails: {
    announcementId: string;
  };

  // Gym timings
  GymTimings: undefined;

  // Profile
  UserProfile: undefined;
};
