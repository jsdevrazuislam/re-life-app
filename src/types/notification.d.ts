 interface NotificationResponse {
    data?: (DataEntity)[] | null;
    message: string;
    statusCode: number;
    success: boolean;
  }
   interface NotificationResponseData {
    __v: number;
    _id: string;
    createdAt: string;
    message: string;
    read: boolean;
    timestamp: string;
    title: string;
    type: string;
    updatedAt: string;
    userId: string;
  }
  