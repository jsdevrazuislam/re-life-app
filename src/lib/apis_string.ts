const ApiStrings = {
    LOGIN:'/users/login',
    ME:'/users/me',
    LOGOUT:'/users/logout',
    SIGNUP:'/users/register',
    OTP_VERIFY:'/users/otp-verify',
    KYC_VERIFY:'/users/kyc-verify',
    GET_COMMITTEE: (ID:string) => `committee/${ID}/committee`,
    GET_POOR_PEOPLE: (ID:string) => `poor-people/${ID}/poor-person`,
}

export default ApiStrings