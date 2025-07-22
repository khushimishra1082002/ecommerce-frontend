import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Slices/CategorySlice";
import productReducer from "../Slices/ProductSlice";
import cartReducer from "../Slices/CartSlice";
import subcategoryReducer from "../Slices/SubcategorySlice"
import brandReducer from "../Slices/BrandSlice"
import priceRangeReducer from "../Slices/PriceRangeSlice"
import discountOptionsReducer from "../Slices/DiscountOptionsSlice"
import filterReducer from "../Slices/FilterSlice"
import deliveryInfoReducer from "../Slices/DeliveryInfoSlice"
import orderReducer from "../Slices/OrderSlice"

export const store = configureStore({
  reducer: {
    allcategory: categoryReducer,
    allproducts: productReducer,
    cart: cartReducer,
    subcategory:subcategoryReducer,
    brand:brandReducer,
    priceRange:priceRangeReducer,
    discount:discountOptionsReducer,
    filter:filterReducer,
    deliveryInfo:deliveryInfoReducer,
    order:orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
