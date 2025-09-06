export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  login: "login",
  signup: "signup",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
  googleLogin: "googleLogin",
  addProduct: {
    create: "createProduct",
    update: "updateProduct",
  },

  products: {
    get: "getProducts",
    delete: "deleteProduct",
    addCart: "addCart",
  },
  cart: {
    get: "getCart",
    delete: "deleteCart",
  },
};
