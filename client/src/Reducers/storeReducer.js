import {
  ADD_PRODUCT,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  SIGN_IN,
  SIGN_OUT,
} from "../actions";

const storeReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, userInfo: action.payload };
    case SIGN_OUT:
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
      };
    case ADD_PRODUCT: {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log(cartItems);
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case REMOVE_FROM_CART: {
      const cartItems = state.cart.cartItems.filter(
        (product) => product._id !== action.payload.item._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case SAVE_SHIPPING_ADDRESS: {
      const shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
      return { ...state, cart: { ...state.cart, shippingAddress: shippingAddress } };
    }

    case SAVE_PAYMENT_METHOD: {
      return { ...state, cart: { ...state.cart, paymentMethod: action.payload} };
    }

    case CLEAR_CART: {
      return { ...state,cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" }}
    }

    default:
      return state;
  }
};
// const newItem = action.payload;
//     const existingItem = state.cart.cartItems.find(
//       (item) => item._id === newItem._id
//     );
//     const cartItems = existingItem
//       ? state.cart.cartItems.map((item) =>
//           item._id === existingItem._id ? newItem : item
//         )
//       : [...state.cart.cartItems, newItem];
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     return { ...state, cart: { ...state.cart, cartItems } };

//   case ADD_TO_CART: {
//     const newItem = action.payload;
//     const existingItem = state.cart.cartItems.find(
//       (item) => item._id === newItem._id
//     );
//     const cartItems = existingItem
//       ? state.cart.cartItems.map((item) =>
//           item._id === existingItem._id ? newItem : item
//         ) //סינטקס מוזר אבל הוא מחזיר את כל המערך, עם החלפה של את האייטם הישן בחדש
//       : [...state.cart.cartItems, newItem];

//     localStorage.setItem("cartItems", JSON.stringify(cartItems));

//     return { ...state, cart: { ...state.cart, cartItems } };
//   }

// default: return {...state};
// }

// }

export default storeReducer;
