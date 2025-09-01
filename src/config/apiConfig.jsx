export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  login: "login",
  signup: "signup",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
  googleLogin: "googleLogin",
  addProduct: "createProduct",
  products: {
    get: "getProducts",
    delete: "deleteProduct",
  },
};
