import apiClient from "./index.js";

const loginUser = (data) => {
  return apiClient.post("/user/login", data);
};

const signupUser = (data) => {
  return apiClient.post("/user/signup", data);
};

const googleSingnupUser = (token) => {
  return apiClient.post("/user/googleSignup", { token });
};

const getUserProfile = (userId) => {
  return apiClient.get(`/user/profile/${userId}`);
};

const addBookToCart = (userId, bookId) => {
  return apiClient.post(`/add-to-cart/${userId}/${bookId}`);
};

const addBookToWishlist = (userId, bookId) => {
  return apiClient.post(`/add-to-wishlist/${userId}/${bookId}`);
};

const getMyCart = (userId) => {
  return apiClient.get(`/cart/${userId}`);
};
const getMyWishlist = (userId) => {
  return apiClient.get(`/wishlist/${userId}`);
};

export {
  loginUser,
  signupUser,
  googleSingnupUser,
  getUserProfile,
  addBookToCart,
  addBookToWishlist,
  getMyCart,
  getMyWishlist,
};
