import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsCart  } from "react-icons/bs";
import { useSelector } from "react-redux";


const Navbar = () => {
  const { cartItem } = useSelector((state) => state.cart);

  return (
    <>
      <div className=' text-white bg-green-900 '>
        <div className='flex justify-between container mx-auto px-20 '>
          <div className='flex nav-item'>
            <div className='logo'>Recco</div>
            <nav>Store</nav>
            <nav>Order</nav>
            <nav>Analytics</nav>
          </div>

          <div className='flex cart nav-item'>
            <a to={"/cart"}>
              <BsCart  />
              <p>{cartItem?.length}</p>
            </a>
            <nav className='flex'>
              <span>James</span>
              <MdKeyboardArrowDown />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
