interface IUser {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    verified: boolean;
    kycStatus: string;
    documentType: string;
    masjid: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    kycDocuments: KycDocuments;
}

interface KycDocuments {
    name: string;
    mobileOrEmail: string;
    pincode: string;
    smart_card_front_url: string;
    smart_card_back_url: string;
    imam_document_url: string;
    _id: string;
}
