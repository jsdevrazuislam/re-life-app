export interface HeadingProps{
    level: 1 | 2 | 3 | 4 | 5;
    weight?: 'SemiBold' | 'Regular' | 'Medium' | 'Bold'; 
    style?: TextStyle; 
    children: React.ReactNode; 
}

