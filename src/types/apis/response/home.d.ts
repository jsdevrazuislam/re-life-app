interface HomeSearchResult {
  statusCode: number;
  data: HomeSearchResultData;
  message: string;
  success: boolean;
}
interface HomeSearchResultData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data?: (HomeSearchResultDatas)[] | null;
}
interface HomeSearchResultDatas {
  _id: string;
  name: string;
  fullAddress: string;
  location: Location;
  masjidProfile?: (MasjidProfileEntityOrHouseImagesEntity)[] | null;
  imamDetails?: (MasjidImamDetailsEntity)[] | null;
  poorPeopleInformations: MasjidPoorPeopleInformations;
}
interface Location {
  district: string;
  upazila: string;
  union: string;
  village: string;
}
interface MasjidProfileEntityOrHouseImagesEntity {
  fileId: string;
  url: string;
  _id: string;
}
interface MasjidImamDetailsEntity {
  userId: string;
  emailOrPhone: string;
  name: string;
  address: string;
  isPresentImam: boolean;
  profilePicture: string;
  _id: string;
}
interface MasjidPoorPeopleInformations {
  name: string;
  age: number;
  gender: string;
  marriageStatus: string;
  photoUrl: string;
  photoUrlFileId: string;
  isWifeDead: string;
  husbandProfession: string;
  wifeProfession: string;
  isHusbandDead: string;
  isFatherDead: string;
  isMotherDead: string;
  numberOfChildren: number;
  overview: string;
  childrenDetails?: ChildrenDetails[] | null;
  homeDetails: HomeDetails;
  contactNumber: string;
  address: string;
  permanentAddress: string;
  receivingAssistance: string;
  receivingAssistanceFromMasjid: boolean;
  essentialsNeedsMonthly: EssentialsNeedsMonthly;
  notes: string;
  idProofDocuments?: (IdProofDocumentsEntity)[] | null;
  wifeIdProofDocuments?: (IdProofDocumentsEntity)[] | null;
  husbandIdProofDocuments?: (IdProofDocumentsEntity)[] | null;
  fatherIdProofDocuments?: (IdProofDocumentsEntity)[] | null;
  motherIdProofDocuments?: (IdProofDocumentsEntity)[] | null;
  _id: string;
  idCardNumber: string;
}
interface HomeDetails {
  hasHouse: string;
  houseType: string;
  hasLand: string;
  isOwnLand: string;
  landSize: string;
  houseImages?: (MasjidProfileEntityOrHouseImagesEntity)[] | null;
}
interface EssentialsNeedsMonthly {
  rice: FoodItem;
  lentils: FoodItem;
  oil: FoodItem;
  otherFoodItems: {
    name:string;
    quantity:string;
    unit:string
  }[];
  clothingForSelf: FoodItem;
  clothingForFamily: FoodItem;
  monthlyMedicineCost: number;
  ongoingTreatmentsDetails: string;
  financialNeeds: string;
}
interface IdProofDocumentsEntity {
  label: string;
  value: string;
  fileId: string;
  _id: string;
}

interface FoodItem{
  name:string,
  quantity:number
}

interface ChildrenDetails {
  name:string;
  age:number;
  profession:string;
  mobile:string;
  frequency:string;
  income:string;
  childrenProveDocument:string
  _id:string
}