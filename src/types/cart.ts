// types/cart.ts
export interface CartItemDTO {
  _id: string;
  quantity: number;
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface CartSummary {
  totalPrice: number;
  totalDiscount: number;
  totalTax: number;
  finalTotal: number;
}


export interface CartDTO {
  _id: string;
  userId: string;
  items: CartItemDTO[];
  summary: CartSummary;
  __v?: number;
}

export interface CartStateDTO {
  cart: CartDTO | null;
  loading: boolean;
  error: string | null;
}
