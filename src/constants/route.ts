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
}

export type AppStackParamList = {
    OpeningScreen: undefined; 
    LoginScreen: undefined; 
    ImamSettingsScreen: undefined; 
    HomeScreen: undefined; 
    ProfileScreen: undefined; 
    ForgotPasswordScreen: undefined; 
    ImamPendingScreen: undefined; 
    KycStartedScreen: undefined; 
    AddPoorPeopleScreen: {
        item?:PoorPeopleResponse
    }; 
    ImamHomeScreen: undefined; 
    SignupScreen: undefined; 
    HomeViewDetailsInfo: undefined; 
    PoorPeopleView: undefined; 
    KycSuccessScreen: undefined; 
    KycScreen: undefined; 
    AddCommitteeScreen: undefined; 
    OtpScreen: undefined; 
  };