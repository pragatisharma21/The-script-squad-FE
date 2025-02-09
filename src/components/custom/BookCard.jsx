/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useBook } from "@/context/BookContext";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import {
  addBookToCart,
  addBookToWishlist,
  removeBookFromCart,
  removeBookFromWishlist,
} from "@/Api/userService";
import { useAuth } from "@/context/AuthContext";

const BookCard = ({ book }) => {
  const { cart, wishlist, setCart, setWishlist } = useBook();
  const { user } = useAuth();
  const userId = user?.userId;

  const isInCart = cart.some((item) => item._id === book._id);
  const isInWishlist = wishlist.some((item) => item._id === book._id);

  const handleAddToCart = async () => {
    try {
      await addBookToCart(userId, book._id);
      setCart((prevCart) => [...prevCart, book]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeBookFromCart(userId, book._id);
      setCart((prevCart) => prevCart.filter((item) => item._id !== book._id));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await addBookToWishlist(userId, book._id);
      setWishlist((prevWishlist) => [...prevWishlist, book]);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await removeBookFromWishlist(userId, book._id);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== book._id)
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden relative">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-40 object-cover"
      />

      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() =>
          isInWishlist ? handleRemoveFromWishlist() : handleAddToWishlist()
        }
      >
        {isInWishlist ? (
          <FaHeart className="text-red-500" size={24} />
        ) : (
          <CiHeart className="text-gray-500" size={24} />
        )}
      </div>

      <CardContent className="px-4 py-6 space-y-5">
        <h3 className="text-lg font-semibold truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-indigo-600">
            ${book.price}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={16}
                className={
                  index < Math.floor(book.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>

        {/* Cart Button */}
        <div className="space-y-2">
          {isInCart ? (
            <Button
              className="w-full mt-3 bg-red-500 hover:bg-red-600"
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
