interface CardItem {
    name: string;
    address?: string;
    profession?: string;
    mobile?: string;
    photo?: string;
  }
  
  interface HorizontalCardListProps {
    title: string;
    subTitle?: string;
    data: DataItem[];
    onPress?:() => void
    imageKey?: string; 
  }

  interface DataItem {
    [key: string]: string; 
  }
  