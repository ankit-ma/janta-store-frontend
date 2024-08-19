const initialState = {
  customerDetails: {
    customerName: "",
    phoneNumber: "",
    address: "",
    due: 0,
    currentBillAmount: 0,
    totalAmount: 0,
  },
  products: [],
  totalPrice: 0,
  quantity: 0,
};
const billreducer = (state = initialState, action) => {
  console.log("Action reducer: ", action);
  switch (action.type) {
    case "TOTALPRICE":
      return {
        ...state,
        customerDetails: {
          ...state.customerDetails,
          currentBillAmount: action.payload,
          totalAmount: action.payload + state.customerDetails.due,
        },
        totalPrice: action.payload,
      };
    case "USER":
      //  action.payload.currentBillAmount = state.totalPrice;
      return {
        ...state,
        customerDetails: action.payload.user,
      };

    case "PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload.product],
      };
    case "PRODUCTUPDATE":
      return {
        ...state,
        products: action.payload.product,
      };
    case "QUANTITYUPDATE":
      return {
        ...state,
        quantity: action.payload + state.quantity,
      };
    default:
      return state;
  }
};

export default billreducer;
