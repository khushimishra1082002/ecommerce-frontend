export interface DeliveryInfoDTO {
  _id: string;
  fullname: string;
  email: string;
  phoneNo: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

export interface DeliveryInfoStateDTO {
  deliveryInfo: DeliveryInfoDTO[];
  loading: boolean;
  error: string | null;
}

export interface DeliveryInfoFormDTO {
  fullname: string;
  email: string;
  phoneNo: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}
