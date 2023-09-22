import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPrinter } from "react-icons/bs";
import apple from "../assets/Apple.png";
import { useDispatch, useSelector } from "react-redux";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

const OrderSummary = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [product, setProduct] = useState({});
  const [status, setStatus] = useState("");

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const openEditModal = () => {
    setIsEditOpen(true);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const increment = (id) => {
    dispatch({ type: "addToCart", payload: { id } });
    dispatch({ type: "calculatePrice" });
  };
  const decrement = (id) => {
    dispatch({ type: "decrement", payload: id });
    dispatch({ type: "calculatePrice" });
  };
  const { cartItem } = useSelector((state) => state.cart);

  const handleStatus = (id, need) => {
    dispatch({ type: "productStatus", payload: { id: id, need: need } });
    closeModal();
  };

  useEffect(() => {
    dispatch({ type: "finalOrderStatus" });
  });

  return (
    <div className='order-summary-box mt-5 order-summary-box  p-10'>
      <div className=' flex justify-between'>
        <div className='flex items-center justify-center first-letter:'>
          <input
            type='text'
            className='search-input p-1  '
            placeholder='search...'
          />
          <div className='search-button '>
            <AiOutlineSearch />
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <button className='mr-3 '>Add Item</button>
          <BsPrinter className='cursor-pointer scale-125' />
        </div>
      </div>

      <div className='pt-5'>
        <div className='overflow-x-auto table-head   '>
          <table className='min-w-full '>
            <thead className=''>
              <tr className=' table-head-2'>
                <th className='px-4 py-1 text-gray-400 font-semibold text-left  '></th>
                <th className='px-4 py-1 text-gray-400 font-semibold text-left  '>
                  Product Name
                </th>
                <th className='px-4 py-1 text-gray-400 font-semibold text-left  '>
                  Brand
                </th>
                <th className='px-4 py-1 text-gray-400 font-semibold text-left'>
                  Price
                </th>
                <th className='px-4 py-1 text-gray-400 font-semibold text-left'>
                  Quantity
                </th>
                <th className='px-4 py-1 text-gray-400 font-semibold text-left'>
                  Total
                </th>
                <th className='px-4 py-1 text-gray-400 font-semibold text-left'>
                  Status
                </th>
                <th className='px-4 py-1 text-gray-400 font-semibold    '></th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item) => (
                <tr className='row-data' key={item.id}>
                  <td className='px-4 py-2 whitespace-nowrap'>
                    <img src={item?.imgSrc} width='50' height='50' />
                  </td>

                  <td className='px-4 py-2 whitespace-nowrap'>
                    <span>{item?.productname}</span>
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap'>
                    <span>{item?.brand}</span>
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap'>{item?.price}</td>
                  <td className=' px-4 py-2 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div
                        className=' text-lg qntbtn'
                        onClick={() => {
                          decrement(item.id);
                        }}
                      >
                        -
                      </div>
                      <span className='px-2'>{item?.quantity}</span>
                      <div
                        className=' text-lg qntbtn'
                        onClick={() => {
                          increment(item.id);
                        }}
                      >
                        +
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap'>
                    {item?.price * item?.quantity}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap bg-gray-50'>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        !!item.status
                          ? item.status == "Approved"
                            ? "bg-green-500"
                            : item.status == "Missing"
                            ? "bg-red-500"
                            : "bg-red-700"
                          : ""
                      }  text-white `}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className='px-6 py-2 whitespace-nowrap bg-gray-50 '>
                    {" "}
                    <div className='flex items-center justify-evenly'>
                      <MdDone
                        className={`cursor-pointer scale-150 ${
                          item.status == "Approved" ? "text-green-500" : " "
                        }`}
                        onClick={() => handleStatus(item.id, "Approved")}
                      />
                      <RxCross2
                        className={`cursor-pointer scale-150 ${
                          item.status === "Missing"
                            ? "text-red-500"
                            : item.status === "Missing-Urgent"
                            ? "text-red-700"
                            : ""
                        } `}
                        onClick={() => {
                          setProduct(item);
                          openModal();
                        }}
                      />
                      {isOpen && (
                        <div className='modal'>
                          <div className='modal-content'>
                            <RxCross2
                              className='close-button'
                              onClick={closeModal}
                            />{" "}
                            {/* Use the cross icon */}
                            <h2 className='text-[1rem] font-semibold'>
                              Missing Product
                            </h2>
                            <p>is {product.productname} Urgent?</p>
                            <div className='flex justify-end mt-3'>
                              <button
                                className='border-none text-black '
                                onClick={() =>
                                  handleStatus(product.id, "Missing")
                                }
                              >
                                NO
                              </button>
                              <button
                                className='border-none text-black '
                                onClick={() =>
                                  handleStatus(product.id, "Missing-Urgent")
                                }
                              >
                                YES
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      <span
                        className='cursor-pointer '
                        onClick={() => {
                          setProduct(item);

                          openEditModal();
                        }}
                      >
                        Edit
                      </span>
                      {isEditOpen && (
                        <div className='modal'>
                          <div className='modal-content'>
                            <RxCross2
                              className='close-button'
                              onClick={closeEditModal}
                            />
                            <div>
                              <h1 className='text-xl font-semibold'>
                                {product?.productname}
                              </h1>
                              <p className='font-semibold text-gray-400'>
                                {product?.brand}
                              </p>
                            </div>
                            <div className='flex'>
                              <div>
                                <img src={product?.imgSrc} width='150' />
                              </div>
                              <div className='flex-col w-3/6  items-center pt-3 font-semibold text-[0.8rem] grid'>
                                <div className='pb-3 flex justify-between'>
                                  <span className=''>price($)</span>
                                  <span>{product?.price}</span>
                                </div>
                                <div className='pb-3 flex justify-between'>
                                  <span className=''>Quantity</span>
                                  <span className='flex items-center justify-center  '>
                                    <span className='px-2'>
                                      {product?.quantity}
                                    </span>
                                  </span>
                                </div>
                                <div className='pb-3 flex justify-between'>
                                  <span className='edit-text'>Total </span>{" "}
                                  <span>
                                    {product?.price * product?.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p>
                                Choose Reason{" "}
                                <span className='text-gray-300'>
                                  (Optional)
                                </span>
                              </p>
                              <div className='my-2 '>
                                <button
                                  className='focus:bg-green-800  focus:text-white '
                                  onClick={() => {
                                    setStatus("Missing Product");
                                  }}
                                >
                                  Missing Product
                                </button>
                                <button
                                  className='focus:bg-green-800  focus:text-white '
                                  onClick={() => {
                                    setStatus("Quantity is not same");
                                  }}
                                >
                                  Quantity is not same
                                </button>

                                <button
                                  className='focus:bg-green-800  focus:text-white '
                                  onClick={() => {
                                    setStatus("Price is not same");
                                  }}
                                >
                                  Price is not Same
                                </button>
                                <button
                                  className='focus:bg-green-800  focus:text-white '
                                  onClick={() => {
                                    setStatus("Other");
                                  }}
                                >
                                  Other
                                </button>
                              </div>
                            </div>

                            <div className='flex justify-end item-center mt-4 mx-0 '>
                              <button onClick={closeEditModal}>Cancel</button>
                              <button
                                onClick={() => {
                                  handleStatus(product.id, status);
                                  closeEditModal();
                                }}
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
