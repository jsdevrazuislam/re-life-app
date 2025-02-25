export interface ParagraphProps{
    level: 'Large' | 'Medium' | 'Small' | 'XSmall';
    weight?: 'SemiBold' | 'Regular' | 'Medium' | 'Bold'; 
    style?: TextStyle; 
    children: React.ReactNode; 
    numberOfLines?: number | undefined;
    ellipsizeMode?: "head" | "tail" | "middle" | "clip" | undefined
}

