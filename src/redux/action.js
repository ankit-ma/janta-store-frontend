export const login = (data) => ({
  type: "LOGIN",
  payload: {
    username: data.name,
  },
});

export const logout = () => ({
  type: "LOGOUT",
});

export const fetchActivityData = (activityData) => ({
  type: "PARENT",
  payload: { activityData },
});

export const updateTotalPrice = (totalPrice) => ({
  type: "TOTALPRICE",
  payload: totalPrice,
});

export const updateUser = (user) => ({
  type: "USER",
  payload: { user },
});
export const updateProduct = (product) => ({
  type: "PRODUCT",
  payload: { product },
});

export const updateProductData = (product) => ({
  type: "PRODUCTUPDATE",
  payload: { product },
});

export const updateQuantity = (quantity) => ({
  type: "QUANTITYUPDATE",
  payload: quantity,
});
