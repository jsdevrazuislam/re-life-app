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
  email: string;
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
  marriageStatus: string;
  photoUrl: string;
  isWifeDead: string;
  isHusbandDead: string;
  husbandProfession: string;
  wifeProfession: string;
  numberOfChildren: number;
  childrenDetails?: (ChildrenDetails)[] | null;
  contactNumber: string;
  address: string;
  receivingAssistance: string;
  assistanceType: string;
  frequency: string;
  assistanceLocation: string;
  notes: string;
  idProofDocuments?: (IdProofDocuments)[] | null;
  wifeIdProofDocuments?: (IdProofDocuments)[] | null;
  husbandIdProofDocuments?: (IdProofDocuments)[] | null;
  fatherIdProofDocuments?: (IdProofDocuments)[] | null;
  _id: string;
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
interface IdProofDocuments{
  label: string;
  value: string;
  _id: string;
}
