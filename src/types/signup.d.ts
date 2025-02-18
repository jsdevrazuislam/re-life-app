interface CommitteeDetails{
    name:string,
    address:string,
    mobile:string,
    profession:string
    profilePicture:FileData | null
}

type FileData = {
    uri: string;
    name: string;
    type: string;
  };

interface StateForm{
    profileUrl: IFile | null,
    address:string,
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

