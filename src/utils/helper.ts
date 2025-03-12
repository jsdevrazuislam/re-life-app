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
    
    return str.split('').map(char => {
        const index = bengaliNumbers.indexOf(char);
        return index !== -1 ? englishNumbers[index] : char;
    }).join('');
};

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

  
  export default timeAgo;
  