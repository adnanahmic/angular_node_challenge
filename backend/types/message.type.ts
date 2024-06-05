export interface CREATE_MESSAGE_TYPE {
  fromUserId: string;
  toUserId: string;
  message: string;
}

export interface LIST_MESSAGE_PAYLOAD_TYPE {
  options: {
    pagination: boolean;
    limit?: number;
    page?: number;
    populate?: Array<Object>;
    orderBy?: Object;
  };
}
