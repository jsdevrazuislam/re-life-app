interface StatCardProps {
  title: string;
  value: number;
  color: string;
}
interface Stats {
  totalCases: number;
  ongoing: number;
  completed: number;
  failed: number;
}

interface DashboardStats{
  totalPoorPeople?: number;
  totalCommittees?:number
}

interface PersonItemProps {
  _id: string;
  status: 'in-progress' | 'completed' | 'failed';
  details: string;
  story: string;
  financialSupport: number;
  endDate: string;
  rehabilitationType: string;
  startDate: string;
  personId: PoorPeople;
  provePictures: [{url: string}];
  followUpRecords: [{date: string; statusUpdate: string; comments: string, mediaFiles: [{ url:string, fileId:string}]}];
  masjidId: string;
  onPress?: () => void;
}


interface ChartDataPoint {
  value: number;
  label: string;
}

interface LineChartDataset {
  data: number[];
  color: (opacity?: number) => string;
  strokeWidth?: number;
}

interface BarChartDataset {
  data: number[];
  colors?: ((opacity?: number) => string)[];
}

interface LineChartData {
  labels: string[];
  datasets: LineChartDataset[];
  legend?: string[];
}

interface BarChartData {
  labels: string[];
  datasets: BarChartDataset[];
}

interface PeiChartData {
  name:string,
  population:number,
  color:string
}
