const validateCommitteeName = (value: string) => {
    if (!value) return 'Name is required';
    if (value.length < 3) return 'Name must be at least 5 characters';
    return null;
};
const validateCommitteeAddress = (value: string) => {
    if (!value) return 'Address is required';
    if (value.length < 5) return 'Address must be at least 5 characters';
    return null;
};
const validateCommitteeProfession = (value: string) => {
    if (!value) return 'Profession is required';
    return null;
};
const validateCommitteeProfile = (value: string) => {
    if (!value) return 'Profile picture is required';
    return null;
};

const validateCommitteeNumber = (value: string) => {
    if (!value) return 'Phone Number is required';
    if (value.length < 11) return 'Phone number must be at least 10 characters';
    return null;
};


export {
    validateCommitteeName,
    validateCommitteeAddress,
    validateCommitteeProfession,
    validateCommitteeNumber,
    validateCommitteeProfile
}