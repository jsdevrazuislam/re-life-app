
  interface PeopleTabProps {
    data: PoorPeopleResponse[];
    onAdd: () => void;
    loading:boolean
  }
  
  interface CommitteeTabProps {
    data: CommitteeResponse[];
    loading:boolean
  }
  