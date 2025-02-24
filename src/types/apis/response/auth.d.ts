 interface IUser {
    __v: number;
    _id: string;
    createdAt: string;
    documentType: string;
    email: string;
    address: string;
    rejectionReason: string;
    fullName: string;
    isBlocked: boolean;
    kycDocuments: KycDocuments;
    kycStatus: string;
    masjid: Masjid;
    phoneNumber: string;
    profileUrl: string;
    role: string;
    signupStep: string;
    updatedAt: string;
    verified: boolean;
  }

  interface TempUser{
    name:string;
    phoneNumber:string;
    email:string,
    status:string
  }

   interface KycDocuments {
    _id: string;
    imam_document_url: string;
    mobileOrEmail: string;
    name: string;
    pincode: string;
    smart_card_back_url: string;
    smart_card_front_url: string;
  }
   interface Masjid {
    _id: string;
    location: Location;
    name: string;
  }
   interface Location {
    district: string;
    union: string;
    upazila: string;
    village: string;
  }

  interface MasjidNames{
    label:string,
    value:string
  }