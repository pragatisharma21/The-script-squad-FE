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

const updateUserProfile = async (userId, data) => {
  try {
    const res = await apiClient.put(`/user/updateProfile/${userId}`, data);
    return res;
  } catch (error) {
    console.error("Error updating profile:", error);
    return { ok: false };
  }
};

const addBookToCart = (userId, bookId) => {
  return apiClient.post(`/user/add-to-cart/${userId}/${bookId}`);
};
const removeBookFromCart = (userId, bookId) => {
  return apiClient.post(`/user/remove-from-cart/${userId}/${bookId}`);
};

const addBookToWishlist = (userId, bookId) => {
  return apiClient.post(`/user/add-to-wishlist/${userId}/${bookId}`);
};
const removeBookFromWishlist = (userId, bookId) => {
  return apiClient.post(`/user/remove-from-wishlist/${userId}/${bookId}`);
};

const getMyCart = (userId) => {
  return apiClient.get(`/user/cart/${userId}`);
};
const getMyWishlist = (userId) => {
  return apiClient.get(`/user/wishlist/${userId}`);
};

const getMyBooks = () => {
  return apiClient.get("/user/myBooks");
};

export {
  loginUser,
  signupUser,
  googleSingnupUser,
  getUserProfile,
  updateUserProfile,
  getMyBooks,
  addBookToCart,
  addBookToWishlist,
  getMyCart,
  getMyWishlist,
  removeBookFromCart,
  removeBookFromWishlist,
};
