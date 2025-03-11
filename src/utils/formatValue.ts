export const formatValue = (value: any) => {
    if (typeof value === 'string') {
        return value;
    } else if (Array.isArray(value)) {
        return value
            .map((item: any) => {
                if (typeof item === 'object') {
                    return Object.entries(item)
                        .map(([key, val]) => `${key}: ${val}`)
                        .join('\n');
                }
                return item;
            })
            .join('\n');
    } else if (typeof value === 'object') {
        return Object.entries(value)
            .map(([key, val]) => `${key}: ${val}`)
            .join('\n');
    } else {
        return value;
    }
};
