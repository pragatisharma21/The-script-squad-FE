import { createOrder, verifyPayment } from "@/Api/paymentService";
// import Razorpay from "razorpay";

export const handlePayment = async (
  userId,
  paymentType,
  cart,
  totalAmount,
  setCart,
  fetchUser = null
) => {
  try {
    const amount = paymentType === "FLEET_ADMIN" ? 1 : totalAmount;
    const books =
      paymentType === "BOOK_PURCHASE" ? cart.map((book) => book.id) : [];

    const { data } = await createOrder(userId, amount, books, paymentType);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: paymentType === "FLEET_ADMIN" ? "Fleet Admin" : "Book Store",
      description:
        paymentType === "FLEET_ADMIN"
          ? "Fleet Admin Subscription"
          : "Purchase Books",
      order_id: data.orderId,
      handler: async (response) => {
        await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          userId,
          books,
          totalAmount: amount,
          paymentType,
        });

       if(fetchUser){
        await fetchUser(userId)
       }

        alert("Payment successful!");
        if (paymentType === "BOOK_PURCHASE") setCart([]);
      },
      theme: { color: "#F37254" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Payment failed!");
  }
};
