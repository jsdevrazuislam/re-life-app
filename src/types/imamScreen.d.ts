
  interface PeopleTabProps {
    data: PoorPeople[];
    onAdd: () => void;
    loading:boolean
  }
  
  interface CommitteeTabProps {
    data: CommitteeResponse[];
    loading:boolean
  }
  