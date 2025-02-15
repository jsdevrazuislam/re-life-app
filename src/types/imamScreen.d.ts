interface Person {
    id: number;
    name: string;
    age: number;
    needs: string;
  }
  
  interface Committee {
    id: number;
    name: string;
    members: number;
    location: string;
  }
  
  interface PeopleTabProps {
    data: Person[];
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  interface CommitteeTabProps {
    data: Committee[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
  }
  