import React from 'react'
import Cart from './Cart'
import CartTotal from './CartTotal'


const MainCartPage = () => {
  
  return (
    <>
      <div className='bg-gray-50 p-5'>
       <div className='grid grid-cols-4 gap-4'>
         <div className='col-span-3 h-[70vh] overflow-y-scroll'>
            <Cart/>
         </div>
         <div>
          
          <CartTotal/>
         </div>
       </div>
      </div>
    </>
  )
}

export default MainCartPage
