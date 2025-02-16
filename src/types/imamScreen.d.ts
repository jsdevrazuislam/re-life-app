
  interface PeopleTabProps {
    data: PoorPeopleResponse[];
    onAdd: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  }
  
  interface CommitteeTabProps {
    data: CommitteeResponse[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  }
  