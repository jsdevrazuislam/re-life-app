export const AppRoutes = {
    OPENING_SCREEN: "OpeningScreen",
    LOGIN_SCREEN: "LoginScreen",
    HOME_SCREEN: "HomeScreen",
    PROFILE_SCREEN: "ProfileScreen",
    FORGOT_PASSWORD: "ForgotPasswordScreen",
    SIGNUP_SCREEN: "SignupScreen",
    HOME_VIEW_DETAILS_INFO: "HomeViewDetailsInfo",
    POOR_PEOPLE_VIEW: "PoorPeopleView",
    OTP_SCREEN: "OtpScreen",
    IMAM_HOME_SCREEN:'ImamHomeScreen',
    ADD_COMMITTEE_SCREEN:'AddCommitteeScreen',
    REHABILITATION_SCREEN:'RehabilitationScreen',
    REHABILITATION_DASHBOARD:'RehabilitationDashboard',
    KYC_SCREEN:'KycScreen',
    KYC_VERIFY_SCREEN:'KycStartedScreen',
    REHABILITATION_DETAILS: 'RehabilitationDetails',
    ADD_POOR_PEOPLE_SCREEN:'AddPoorPeopleScreen',
    KYC_SUCCESS_SCREEN:'KycSuccessScreen',
    IMAM_SETTING_SCREEN:'ImamSettingsScreen',
    IMAM_PENDING_SCREEN:'ImamPendingScreen',
    CHANGE_PASSWORD:'ChangePasswordScreen',
    UPDATE_EMAIL:'UpdateEmailScreen',
    RESET_PASSWORD_SCREEN:'ResetPasswordScreen',
    BLOCK_SCREEN:'BlockScreen',
    NOTIFICATION_SCREEN:'NotificationScreen',
    FACE_SCAN_SCREEN:'FaceScanScreen',
    REQUEST_ACCESS_VIEW:'RequestAccessView',
    EDIT_POOR_PERSON:'EditPoorPeopleScreen',
    MARK_DONATION_SCREEN:'MarkDonationScreen',
    DONATION_HISTORY_SCREEN:'DonationHistoryScreen',
    ADD_FOLLOW_UP_SCREEN:'AddFollowUpScreen',
}

export type AppStackParamList = {
    FaceScanScreen: undefined; 
    MarkDonationScreen: {
        data?: PoorPeople
    }; 
    RehabilitationScreen: {
        item?: PoorPeople
    }; 
    RehabilitationDetails: {
        item?: PersonItemProps
    }; 
    AddFollowUpScreen: {
        item?: PersonItemProps
    }; 
    OpeningScreen: undefined; 
    RehabilitationDashboard: undefined; 
    RequestAccessView: undefined; 
    LoginScreen: undefined; 
    DonationHistoryScreen: undefined; 
    ImamSettingsScreen: undefined; 
    ResetPasswordScreen: { otp: string, email:string}; 
    HomeScreen: undefined; 
    ProfileScreen: undefined; 
    ForgotPasswordScreen: undefined; 
    ChangePasswordScreen: undefined; 
    UpdateEmailScreen: undefined; 
    ImamPendingScreen: undefined; 
    NotificationScreen: undefined; 
    KycStartedScreen: undefined; 
    BlockScreen: undefined;
    AddPoorPeopleScreen: undefined;
    EditPoorPeopleScreen:{
        item?: PoorPeople
    };
    ImamHomeScreen: {
        activeTab?:string
    }; 
    SignupScreen: undefined; 
    HomeViewDetailsInfo: {
        item:any
    }; 
    KycSuccessScreen: undefined; 
    KycScreen: undefined; 
    AddCommitteeScreen: undefined; 
    OtpScreen: {
        email?:string
    }; 
  };