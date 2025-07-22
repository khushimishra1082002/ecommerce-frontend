
export interface PopulatedProduct {
  _id: string;
  name: string;
  price: number;
  image: string[]; 
}

// Each item in an order
export interface OrderItemDTO {
  productId: PopulatedProduct; 
  quantity: number;
}

 export interface OrderStateDTO {
orders: OrderDTO[];
  loading: boolean;
  error: string | null;
}

export interface OrderDTO {
  _id: string;
  userId: string;
  items: OrderItemDTO[];
  deliveryInfo: {
    address: string;
    city: string;
    pincode: string;
    phone: string;
  };
  summary: {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
  paymentMethod: string;
  status: string;
  createdAt: string;
}
