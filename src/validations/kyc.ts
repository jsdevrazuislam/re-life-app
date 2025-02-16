const validateForm = (formData: {
    documentType: string;
    idProofFront: IFile | null;
    idProofBack: IFile | null;
    imamDocument: IFile | null;
  }) => {
    const errors: Record<string, string> = {};
  
    if (!formData.documentType.trim()) {
      errors.documentType = "Please select a document type.";
    }
  
    if (!formData.idProofFront) {
      errors.idProofFront = "Front side of ID proof is required.";
    }
    if (!formData.idProofBack) {
      errors.idProofBack = "Back side of ID proof is required.";
    }
    if (!formData.imamDocument) {
      errors.imamDocument = "Imam document is required.";
    }
  
    return errors;
  };
  

  export default validateForm