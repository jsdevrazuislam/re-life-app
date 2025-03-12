interface DonationResponse {
    statusCode: number;
    data?: (DonationResponseData)[] | null;
    message: string;
    success: boolean;
}
interface DonationResponseData {
    _id: string;
    masjid: string;
    poorPersonId: string;
    donatedConfirmationBy: DonatedConfirmationBy;
    remarks: string;
    provePictures?: (ProvePicturesEntityOrHouseImagesEntity)[] | null;
    donationDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    poorPerson: PoorPeople;
}
interface DonatedConfirmationBy {
    _id: string;
    role: string;
    fullName: string;
}
interface ProvePicturesEntityOrHouseImagesEntity {
    fileId: string;
    url: string;
    _id: string;
}
