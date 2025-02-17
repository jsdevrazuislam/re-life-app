interface CommitteeDetails{
    name:string,
    address:string,
    mobile:string,
    profession:string
}

interface StateForm{
    profileUrl: IFile | null,
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

