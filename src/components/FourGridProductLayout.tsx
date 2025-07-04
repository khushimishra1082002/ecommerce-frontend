import React,{useEffect} from 'react'
import FourGridProduct from './FourGridProduct'
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../ReduxToolkit/app/Store";
import { fetchAllProducts } from "../ReduxToolkit/Slices/ProductSlice";

const FourGridProductLayout = () => {

   const dispatch = useDispatch<AppDispatch>();
  
    const { products, loading, error } = useSelector(
      (state: RootState) => state.allproducts
    );
    console.log("products", products);
  
    useEffect(() => {
      dispatch(fetchAllProducts());
    }, [dispatch]);
    
  return (
    <>
      <div className='grid grid-cols-4 gap-2 bg-gray-100 m-3'>
        <FourGridProduct/>
        <FourGridProduct/>
        <FourGridProduct/>
        <FourGridProduct/>
      </div>
    </>
  )
}

export default FourGridProductLayout
