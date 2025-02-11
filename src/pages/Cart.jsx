import { useEffect, useState } from "react";
import { getMyCart, removeBookFromCart } from "@/Api/userService";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { useBook } from "@/context/BookContext";
import { handlePayment } from "@/lib/paymentUtil";

const Cart = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useBook();

  useEffect(() => {
    if (user?.userId) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getMyCart(user.userId);
      console.log(response.data.myCart);
      setCart(response.data.myCart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeBookFromCart(user.userId, bookId);
      setCart(cart.filter((book) => book._id !== bookId));
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error removing book:", error);
      toast.error("Failed to remove");
    }
  };

  const handleBookPurchase = async () => {
    try {
      const totalAmount = cart.reduce((sum, book) => sum + book.price, 0);
      await handlePayment(
        user.userId,
        "BOOK_PURCHASE",
        cart,
        totalAmount,
        setCart
      );
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error(error.message || "Payment failed");
    }
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="mx-auto py-4 flex sm:flex-row-reverse flex-col  gap-6">
      {totalItems > 0 ? (
        <div className="p-6 rounded-lg border shadow-md space-y-4 lg:w-1/3">
          <h2 className="text-xl font-bold">Cart Summary</h2>
          <Separator />
          <p className="flex justify-between">
            <span>Total Items:</span> <span>{totalItems}</span>
          </p>
          <p className="flex justify-between font-semibold">
            <span>Total Price:</span> <span>₹{totalPrice}</span>
          </p>
          <Button
            className="w-full mt-2"
            disabled={cart.length === 0}
            onClick={() => handleBookPurchase()}
          >
            Proceed to Buy
          </Button>
        </div>
      ) : (
        ""
      )}

      <div className={`space-y-4 ${totalItems > 0 ? "lg:w-2/3": "w-full"}`}>
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-24 w-full rounded-lg" />
          ))
        ) : cart.length === 0 ? (
          <p className="text-center text-lg text-muted-foreground">
            Your cart is empty.
          </p>
        ) : (
          cart.map((book) => (
            <Card
              key={book._id}
              className="p-4 flex gap-4 items-center shadow-md"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
                <p className="mt-1 font-semibold">₹{book.price}</p>
                <Button
                  variant="destructive"
                  className="mt-2"
                  onClick={() => handleRemove(book._id)}
                >
                  Remove from Cart
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
