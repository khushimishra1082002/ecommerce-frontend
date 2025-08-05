import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { decodeToken } from "../utils/decodeToken";
import { useNavigate } from "react-router-dom";
import { fetchcartProduct } from "../ReduxToolkit/Slices/CartSlice";
import { fetchDeliveryInfo } from "../ReduxToolkit/Slices/DeliveryInfoSlice";
import { placeOrderData } from "../services/OrderService";
import OnlinePaymentForm from "./OnlinePaymentForm";
import { setPaymentMethod } from "../ReduxToolkit/Slices/PaymentSlice";

const PaymentMethod = ({ onComplete }) => {
  
  return (
   <div></div>
  );
};

export default PaymentMethod;
