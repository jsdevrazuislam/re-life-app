
  interface PeopleTabProps {
    data: PoorPeopleResponse[];
    onAdd: () => void;
    onEdit: (item: PoorPeopleResponse) => void;
    onDelete: (id: string) => void;
    loading:boolean
  }
  
  interface CommitteeTabProps {
    data: CommitteeResponse[];
    onEdit: (item:CommitteeResponse) => void;
    onDelete: (id: string) => void;
    loading:boolean
  }
  