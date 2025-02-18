
  
  export const formatFileData = (file: any): FileData | null => {
    if (!file) return null;
    return {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    };
  };
  