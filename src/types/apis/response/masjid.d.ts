interface MasjidResponse {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}
interface Data {
  totalMasjids: number;
  totalPages: number;
  currentPage: number;
  masjids?: Masjids[] | null;
}
interface Masjids {
  location: Location;
  _id: string;
  name: string;
  masjidProfile: string;
  committeeDetails?: CommitteeDetailsData[] | null;
  imamDetails?: ImamDetails[] | null;
  poorPeopleInformations?: PoorPeople[] | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Location {
  district: string;
  upazila: string;
  union: string;
  village: string;
}
interface CommitteeDetailsData {
  name: string;
  address: string;
  profession: string;
  mobile: string;
  profilePicture: string;
  _id: string;
}
interface ImamDetails {
  userId: string;
  emailOrPhone: string;
  name: string;
  mobile: string;
  address: string;
  isPresentImam: boolean;
  profilePicture: string;
  _id: string;
}


interface PoorPeople {
  essentialsNeedsMonthly: EssentialsNeedsMonthly;
  name: string;
  age: number;
  gender: string;
  permanentAddress: string;
  marriageStatus: string;
  photoUrl: string;
  isWifeDead: string;
  amountOfAssistance: string;
  isFatherDead: string;
  isMotherDead: string;
  isHusbandDead: string;
  husbandProfession: string;
  wifeProfession: string;
  numberOfChildren: number;
  childrenDetails?: (ChildrenDetails)[] | null;
  contactNumber: string;
  address: string;
  receivingAssistance: string;
  receivingAssistanceFromMasjid: string;
  receivingAssistanceDate: string;
  assistanceType: string;
  presentAddress: string;
  frequency: string;
  assistanceLocation: string;
  notes: string;
  idProofDocuments?: (IdProofDocuments)[] | null;
  wifeIdProofDocuments?: (IdProofDocuments)[] | null;
  husbandIdProofDocuments?: (IdProofDocuments)[] | null;
  fatherIdProofDocuments?: (IdProofDocuments)[] | null;
  _id: string;
  otherFoodItems: string;
  overview: string;
  notes: string;
  monthlyMedicineCost: string;
  financialNeeds: string;
  ongoingTreatmentsDetails: string;
}
interface EssentialsNeedsMonthly {
  rice: number;
  lentils: number;
  oil: number;
  otherFoodItems: string;
  clothingForSelf: string;
  clothingForFamily: string;
  monthlyMedicineCost: number;
  ongoingTreatmentsDetails: string;
  financialNeeds: string;
}
interface ChildrenDetails {
  name: string;
  age: number;
  profession: string;
  mobile: string;
  frequency: string;
  income: number;
  _id: string;
}
interface IdProofDocuments {
  label: string;
  value: string;
  _id: string;
}

interface ScanResponse {
  data:{
    donations: boolean;
    registered: boolean;
    poorPeople: PoorPeople;
    masjidDetails: {
      _id: string;
      name: string;
      fullAddress: string;
      location: Location;
      masjidProfile?: (MasjidProfileEntityOrHouseImagesEntity)[] | null;
      imamDetails?: (MasjidImamDetailsEntity)[] | null;
    }
  }
  statusCode: number;
  success: boolean;
  message: string;
}

interface UpdateRequest {
  _id: string;
  masjidId: string;
  fieldType: string;
  recordId: string;
  reason: string;
  changes: UpdateChange[];
  adminComment: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
};

type UpdateChange = {
  field: string;
  previousValue: string | number;
  modifiedValue: string | number;
};
