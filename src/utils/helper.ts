import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

const timeAgo = (timestamp: string | Date): string => {
    const now: Date = new Date();
    const past: Date = new Date(timestamp);
    const diffInSeconds: number = Math.floor((now.getTime() - past.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
  
    const diffInMinutes: number = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
  
    const diffInHours: number = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
  
    const diffInDays: number = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    }
  
    const diffInMonths: number = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }
  
    const diffInYears: number = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  };

  export const bengaliToEnglishNumber = (str: string): string => {
    const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return str?.split('')?.map(char => {
        const index = bengaliNumbers.indexOf(char);
        return index !== -1 ? englishNumbers[index] : char;
    }).join('');
};


export function getTimeDifference(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const years = differenceInYears(end, start);
    const months = differenceInMonths(end, start) % 12;
    const days = differenceInDays(end, start) % 30; 

    const parts: string[] = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0 || parts.length === 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);

    return parts.join(', ');
}


export const convertNumber = (num: string | number, toBangla: boolean = true): string => {
  const engNums = '0123456789';
  const bngNums = '০১২৩৪৫৬৭৮৯';

  const from = toBangla ? engNums : bngNums;
  const to = toBangla ? bngNums : engNums;

  return num
    .toString()
    .split('')
    .map((char) => (from.includes(char) ? to[from.indexOf(char)] : char))
    .join('');
};


export function getNameAndUnit(value: string, array: any[]): { name: string, quantity: number } {
  const item = array.filter((item) => item.label === value)[0];
    return { name: item.name, quantity: parseFloat(item.quantity) };
}

export function convertBengaliToEnglishNumber(input: string): number | null {
  const bengaliToEnglishMap: { [key: string]: string } = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9"
  };

  const extractedDigits = input.replace(/[^\u09E6-\u09EF]/g, "");
  const englishNumber = extractedDigits
    .split("")
    .map(char => bengaliToEnglishMap[char] || char)
    .join("");

  return englishNumber ? parseInt(englishNumber, 10) : null;
}


  
  export default timeAgo;
  