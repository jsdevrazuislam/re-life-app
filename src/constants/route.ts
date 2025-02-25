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
    KYC_SCREEN:'KycScreen',
    KYC_VERIFY_SCREEN:'KycStartedScreen',
    ADD_POOR_PEOPLE_SCREEN:'AddPoorPeopleScreen',
    KYC_SUCCESS_SCREEN:'KycSuccessScreen',
    IMAM_SETTING_SCREEN:'ImamSettingsScreen',
    IMAM_PENDING_SCREEN:'ImamPendingScreen',
    CHANGE_PASSWORD:'ChangePasswordScreen',
    UPDATE_EMAIL:'UpdateEmailScreen',
    RESET_PASSWORD_SCREEN:'ResetPasswordScreen',
    BLOCK_SCREEN:'BlockScreen',
}

export type AppStackParamList = {
    OpeningScreen: undefined; 
    LoginScreen: undefined; 
    ImamSettingsScreen: undefined; 
    ResetPasswordScreen: { otp: string, email:string}; 
    HomeScreen: undefined; 
    ProfileScreen: undefined; 
    ForgotPasswordScreen: undefined; 
    ChangePasswordScreen: undefined; 
    UpdateEmailScreen: undefined; 
    ImamPendingScreen: undefined; 
    KycStartedScreen: undefined; 
    BlockScreen: undefined;
    AddPoorPeopleScreen: undefined;
    ImamHomeScreen: {
        activeTab?:string
    }; 
    SignupScreen: undefined; 
    HomeViewDetailsInfo: {
        item:Masjids
    }; 
    PoorPeopleView: {
        item:PoorPeople
    }; 
    KycSuccessScreen: undefined; 
    KycScreen: undefined; 
    AddCommitteeScreen: undefined; 
    OtpScreen: {
        email?:string
    }; 
  };