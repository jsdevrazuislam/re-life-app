const ApiStrings = {
    LOGIN:'/users/login',
    ME:'/users/me',
    LOGOUT:'/users/logout',
    DELETE_PROFILE:'/users/profile-image',
    UPDATE_PROFILE:'/users/update-profile',
    SIGNUP:'/users/register',
    OTP_VERIFY:'/users/otp-verify',
    KYC_VERIFY:'/users/kyc-verify',
    GET_COMMITTEE: (ID:string) => `committee/${ID}/committee`,
    GET_POOR_PEOPLE: (ID:string) => `poor-people/${ID}/poor-person`,
    CREATE_PEOPLE: (ID:string) => `poor-people/${ID}/poor-person`,
    COMMITTEE_PROFILE_DELETE: (masjidId:string, committeeId:string) => `committee/${masjidId}/committee/${committeeId}/image`,
    CREATE_COMMITTEE:'/committee/create',
    UPDATE_COMMITTEE: '/committee/update'
}

export default ApiStrings