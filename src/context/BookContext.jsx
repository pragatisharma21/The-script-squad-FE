/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
  getMyCart,
  getMyWishlist,
  addBookToCart,
  addBookToWishlist,
  removeBookFromCart,
  removeBookFromWishlist,
} from "@/Api/userService";
import { useAuth } from "@/context/AuthContext";
import { getPaginatedBooks } from "@/Api/bookService";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { userData } = useAuth();
  const userId = userData?._id;

  useEffect(() => {
    fetchBooks(page);
    if (userId) {
      fetchCart();
      fetchWishlist();
    }
  }, [page, userId]);

  const fetchBooks = async (pageNumber) => {
    try {
      const response = await getPaginatedBooks(pageNumber, 10);
      if (response.data.success) {
        setBooks(response.data.books || []);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await getMyCart(userId);
      setCart(response?.data?.myCart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await getMyWishlist(userId);
      setWishlist(response?.data?.myWishList || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const addToCart = async (bookId) => {
    try {
      const response = await addBookToCart(userId, bookId);
      if (response.data) {
        setCart(response.data.myCart || []);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const response = await removeBookFromCart(userId, bookId);
      if (response.data) {
        setCart(response.data.myCart || []);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const addToWishlist = async (bookId) => {
    try {
      const response = await addBookToWishlist(userId, bookId);
      if (response.data) {
        setWishlist(response.data.wishlist || []);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      const response = await removeBookFromWishlist(userId, bookId);
      setWishlist(response?.data?.wishlist || []);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        cart,
        wishlist,
        page,
        totalPages,
        setPage,
        addToCart,
        addToWishlist,
        fetchBooks,
        fetchCart,
        fetchWishlist,
        removeFromWishlist,
        removeFromCart,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
