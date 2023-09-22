import React from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderHeader = () => {


  return (
    <div className=' shadow-2xl py-2'>
      <div className='container mx-auto px-20 '>
        <div className=' flex text-[0.7rem]'>
          <span className='pr-2 ml-1'>order</span>
          <span className='pr-2'>{">"}</span>
          <span>
            Order <span className='underline'>32345555645</span>
          </span>
        </div>

        <div className='flex p-2 justify-between items-center mt-5'>
          <span className='text-2xl font-semibold'>
            Order <span>32345555645</span>
          </span>
          <div>
            <button className='mx-1 '> Back</button>
            <button
              onClick={() => {
                dispatch({ type: "categoryList" });
              }}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
