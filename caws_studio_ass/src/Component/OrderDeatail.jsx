import React, { useEffect } from "react";
import OrderSummary from "./OrderSummary";
import { useDispatch, useSelector } from "react-redux";

const OrderDeatail = () => {
  const dispatch = useDispatch();
  const { orderStatus, supplier, shippingDate, total, categories } =
    useSelector((state) => state.cart);

  useEffect(() => {
    dispatch({ type: "categoryList" });
    dispatch({ type: "calculatePrice" });
    dispatch({ type: "finalOrderStatus" })

  },[total]);

  console.log(categories)

  return (
    <div className='container mx-auto px-20 '>
      <div className=' order-summary-box mt-5'>
        <div className='order-summary-details grid grid-cols-6 gap-4'>
          <div className='col-span-1  p-1 h-16'>
            <span className='order-text'>Supplier</span>
            <span className='order-value'>{supplier}</span>
          </div>
          <div className='col-span-1 p-1 h-16'>
            <span className='order-text'>Shipping Date</span>
            <span className='order-value'>{shippingDate}</span>
          </div>
          <div className='col-span-1 p-1  h-16'>
            <span className='order-text'>Total</span>
            <span className='order-value'>${total}</span>
          </div>
          <div className='col-span-1 p-1  h-16'>
            <span className='order-text'>category</span>
            <span className='order-value'>{categories.map(i=>`${i} ,`)}</span>
          </div>
          <div className='col-span-1 p-1  h-16'>
            <span className='order-text'>Department</span>
            <span className='order-value'>300-22-33344-1</span>
          </div>
          <div className='col-span-1 p-1  h-16' style={{ border: "none" }}>
            <span className='order-text'>Status</span>
            <span className='order-value'>{orderStatus} </span>
          </div>
        </div>
      </div>

      <OrderSummary />
    </div>
  );
};

export default OrderDeatail;
