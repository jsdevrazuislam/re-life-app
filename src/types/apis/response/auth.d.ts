interface IUser {
  __v: number;
  _id: string;
  fileId: string;
  createdAt: string;
  documentType: string;
  emailOrPhone: string;
  address: string;
  rejectionReason: string;
  fullName: string;
  isBlocked: boolean;
  kycDocuments: KycDocuments;
  kycStatus: string;
  masjid: Masjid;
  masjids: Masjid[];
  phoneNumber: string;
  profileUrl: string;
  role: string;
  signupStep: string;
  updatedAt: string;
  verified: boolean;
}

interface TempUser {
  name: string;
  phoneNumber?: string;
  email?: string,
  status?: string
  emailOrPhone: string
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
  masjidProfile?: (MasjidProfileEntityOrHouseImagesEntity)[] | null;
  fullAddress: string
  imamDetails: MasjidImamDetailsEntity
}
interface Location {
  district: string;
  union: string;
  upazila: string;
  village: string;
}

interface MasjidNames {
  label: string,
  value: string
}

interface Notification {
  title: string,
  message: string
}

interface SignupPayload {
  permanentAddress: string;
  fullAddress: string;
  address: string;
  sameAsCurrent: boolean;
  committeeDetails?: (CommitteeDetailsEntity)[] | null;
  emailOrPhone: string;
  isChecked: boolean;
  location: Location;
  masjidProfile: MasjidProfileOrProfileUrl[];
  mobile: string;
  name: string;
  numberOfCommittee: string;
  password: string;
  profileUrl: MasjidProfileOrProfileUrl;
  username: string;
}
interface CommitteeDetailsEntity {
  address: string;
  mobile: string;
  name: string;
  profession: string;
  profilePicture: MasjidProfileOrProfileUrl;
}
interface Location {
  district: string;
  union: string;
  upazila: string;
  village: string;
}
interface MasjidProfileOrProfileUrl {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
}


interface ModeratorResponse {
  location: Location;
  _id: string;
  name: string;
  fullAddress: string;
  masjidProfile: MasjidProfileEntity[];
}
interface Location {
  district: string;
  upazila: string;
  union: string;
  village: string;
}
interface MasjidProfileEntity {
  fileId: string;
  url: string;
  _id: string;
}
