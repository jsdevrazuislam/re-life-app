interface CommitteeDetails {
  name: string,
  address: string,
  mobile: string,
  profession: string
  profilePicture: FileData | null
}

type FileData = {
  uri: string;
  name: string;
  type: string;
};

interface FileType {
  fileName: string,
  type: string,
  uri: string,
  fileSize?: number | null | undefined,
  width?: number | null | undefined,
  height?: number | null | undefined,
  isUpdate?: boolean | null | undefined,
}

interface StateForm {
  masjidProfile: IFile | null,
  profileUrl: IFile | null,
  address: string,
  location: {
    district: string,
    upazila: string,
    union: string,
    village: string,
  };
}

interface ILocation {
  location: {
    district: string,
    upazila: string,
    union: string,
    village: string,
  };
}

