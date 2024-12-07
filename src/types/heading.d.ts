export interface HeadingProps{
    level: 1 | 2 | 3;
    weight?: 'Regular' | 'Medium' | 'Bold'; 
    style?: TextStyle; 
    children: React.ReactNode; 
}

