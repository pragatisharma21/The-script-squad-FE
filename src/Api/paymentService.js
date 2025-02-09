import apiClient from ".";

export const createOrder = async (userId, totalAmount, books, paymentType) => {
  return apiClient.post("/payments/create-order", {
    userId,
    totalAmount,
    books,
    paymentType,
  });
};

export const verifyPayment = async (paymentData) => {
  return apiClient.post("/payments/verify-payment", paymentData);
};
