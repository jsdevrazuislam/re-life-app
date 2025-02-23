interface IFile{
    fileName: string,
    fileSize?: number,
    height?: number,
    type: string,
    uri: string,
    width?:number
    isUpdate?:boolean
}

interface FormState {
  name:string,
  mobile:string,
  email:string,
  pincode:string,
  documentType:string,
  idProofFront: IFile | null,
  idProofBack: IFile | null,
  imamDocument: IFile | null
}