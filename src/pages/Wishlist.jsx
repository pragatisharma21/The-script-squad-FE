import { useEffect, useState } from "react";
import {
  getMyWishlist,
  removeBookFromWishlist,
  addBookToCart,
} from "@/Api/userService";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { useBook } from "@/context/BookContext";

const Wishlist = () => {
  const { user } = useAuth();
  const { setCart, cart } = useBook();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.userId) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await getMyWishlist(user.userId);
      setWishlist(response.data.myWishList || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await removeBookFromWishlist(user.userId, bookId);
      setWishlist(wishlist.filter((book) => book._id !== bookId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing book:", error);
      toast.error("Failed to remove");
    }
  };

  const handleMoveToCart = async (bookId) => {
    try {
      await addBookToCart(user.userId, bookId);
      await removeBookFromWishlist(user.userId, bookId)
      setCart([...cart, wishlist.find((book) => book._id === bookId)]);
      setWishlist(wishlist.filter((book) => book._id !== bookId));
      toast.success("Moved to cart");
    } catch (error) {
      console.error("Error moving book to cart:", error);
      toast.error("Failed to move to cart");
    }
  };

  return (
    <div className="mx-auto py-4 flex sm:flex-row-reverse flex-col gap-6">
      <div className="space-y-4 w-full">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-24 w-full rounded-lg" />
          ))
        ) : wishlist.length === 0 ? (
          <p className="text-center text-lg text-muted-foreground">
            Your wishlist is empty.
          </p>
        ) : (
          wishlist.map((book) => (
            <Card
              key={book._id}
              className="px-4 py-2 flex gap-4 items-center shadow-md"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="flex flex-row justify-between w-full">
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {book.description}
                  </p>
                  <p className="mt-1 font-semibold">₹{book.price}</p>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleRemove(book._id)}
                  >
                    Remove from Wishlist
                  </Button>
                  <Button
                    onClick={() => handleMoveToCart(book._id)}
                    className="bg-blue-500" 
                  >
                    Move to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
