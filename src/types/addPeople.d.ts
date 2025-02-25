
interface ChildDetail {
    name: string;
    age: string;
    profession: string;
    income: string;
    frequency: string;
    mobile: string;
}

type AddPoorPeopleScreenRouteProp = RouteProp<AppStackParamList, "AddPoorPeopleScreen">;
type ImamHomeScreenRouteProp = RouteProp<AppStackParamList, 'ImamHomeScreen'>;
type HomeViewDetailsInfoRouteProp = RouteProp<AppStackParamList, 'HomeViewDetailsInfo'>;
type AddCommitteeScreenRouteProp = RouteProp<AppStackParamList, 'AddCommitteeScreen'>;


interface AddPoorPeopleScreenFormState{
        name: string,
        age: string,
        gender: string,
        marriageStatus: string,
        isWifeDead: string,
        isHusbandDead: string,
        wifeProfession: string,
        husbandProfession: string,
        hasChildren: string,
        numberOfChildren: string,
        herProfession: string,
        contactNumber: string,
        address: string,
        receivingAssistance: string,
        assistanceType: string,
        frequency: string,
        assistanceLocation: string,
        rice: string,
        lentils: string,
        oil: string,
        otherFood: string,
        clothingSelf: string,
        clothingFamily: string,
        medicineCost: string,
        treatments: string,
        financialNeeds: string,
        notes: string,
        photoUrl: IFile | null,
        idProofFront: IFile | null,
        idProofBack: IFile | null,
        idProofFrontWife: IFile | null,
        idProofBackWife: IFile | null,
        idProofFrontHusband: IFile | null,
        idProofBackHusband: IFile | null,
        idProofBackFather: IFile | null,
        idProofFrontFather: IFile | null,
}