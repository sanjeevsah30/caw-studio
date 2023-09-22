import { createReducer } from "@reduxjs/toolkit";
import apple from "../assets/Apple.png";
import avacado from "../assets/Avocado.jpg";

export const cartReducer = createReducer(
  {
    cartItem: [
      {
        productname: "Apple",
        brand: "savio",
        price: "12000",
        id: "1",
        quantity: 1,
        status: "",
        imgSrc: apple,
        catergory: "fruit",
      },
      {
        productname: "Cauliflower",
        brand: "lorem",
        price: "678",
        id: "2",
        quantity: 3,
        status: "",
        imgSrc: avacado,
        catergory: "vegetable",
      },
      {
        productname: "Lady Finger",
        brand: "suga",
        price: "12000",
        id: "3",
        quantity: 8,
        status: "",
        imgSrc: avacado,
        catergory: "vegetable",
      },
      {
        productname: "Orange",
        brand: "lite",
        price: "238",
        id: "4",
        quantity: 10,
        status: "",
        imgSrc: apple,
        catergory: "fruit",
      },
      {
        productname: "Grapes",
        brand: "neo",
        price: "347",
        id: "5",
        quantity: 17,
        status: "",
        imgSrc: apple,
        catergory: "fruit",
      },
      {
        productname: "Coriander",
        brand: "fista",
        price: "175",
        id: "6",
        quantity: 2,
        status: "",
        imgSrc: apple,
        catergory: "vegetable",
      },
    
    ],
    supplier: "East-coast Vegetable and fruit",
    orderStatus: "",
    orderno: 1234545,
    shippingDate: "Thursday,feb 10",
    total: 0,
    categories: [],
  },
  {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItem.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cartItem.forEach((i) => {
          if (i.id === item.id) i.quantity += 1;
        });
      } else {
        state.cartItem.push(item);
      }
    },

    categoryList: (state, action) => {
      const arr = [];
      state.cartItem.forEach((i) => arr.push(i.catergory));
      let uniqitem = Array.from(new Set(arr));
      state.categories = [...uniqitem];
    },
    finalOrderStatus: (state, action) => {
      let result = state.cartItem.every((obj) => obj.status === "Approved");

      if (result) {
        state.orderStatus = "Approved";
      } else {
        state.orderStatus = "Awaiting for order to get Approved";
      }
    },

    calculatePrice: (state, action) => {
      let sum = 0;
      state.cartItem.forEach((i) => (sum += i.price * i.quantity));
      state.total = sum;
    },

    productStatus: (state, action) => {
      const item = action.payload;
      console.log(item, "lplplp");
      const isItemExist = state.cartItem.find((i) => i.id === item.id);

      if (isItemExist) {
        state.cartItem.forEach((i) => {
          if (i.id === item.id) {
            i.status = item.need;
          }
        });
      }
    },

    decrement: (state, action) => {
      const item = state.cartItem.find((i) => i.id === action.payload);
      if (item.quantity > 1) {
        state.cartItem.forEach((i) => {
          if (i.id === item.id) i.quantity -= 1;
        });
      } else {
        state.cartItem = state.cartItem.filter((i) => i.id !== action.payload);
      }
    },

    deleteFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter((i) => i.id !== action.payload);
    },
  }
);
