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
    data: any[];
    onPress?:(data:any) => void
    imageKey: string; 
    keyIndex?:number,
  }

  interface DataItem {
    [key: string]: string; 
  }
  