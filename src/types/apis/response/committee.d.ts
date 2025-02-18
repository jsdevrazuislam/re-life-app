interface CommitteeResponse {
    name: string;
    address: string;
    profession: string;
    mobile: string;
    profilePicture: string;
    _id: string;
}

interface PoorPeopleResponse {
    essentialsNeedsMonthly: EssentialsNeedsMonthly;
    name: string;
    age: number;
    gender: string;
    marriageStatus: string;
    photoUrl?: null;
    isWifeDead: string;
    isHusbandDead: string;
    wifeProfession: string;
    numberOfChildren: number;
    contactNumber: string;
    address: string;
    receivingAssistance: string;
    assistanceType: string;
    frequency: string;
    assistanceLocation: string;
    notes: string;
    idProofDocuments?: (string)[] | null;
    wifeIdProofDocuments?: (string)[] | null;
    husbandIdProofDocuments?: (null)[] | null;
    _id: string;
    childrenDetails?: (null)[] | null;
}

interface EssentialsNeedsMonthly {
    rice: number;
    lentils: number;
    oil: number;
    monthlyMedicineCost: number;
}
