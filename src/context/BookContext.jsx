/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getPaginatedBooks } from "@/Api/bookService";
import { useAuth } from "@/context/AuthContext";
import { getMyCart, getMyWishlist } from "@/Api/userService";

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
      if(response.data){
        setCart(response.data.myCart); 
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await getMyWishlist(userId);
      if(response.data){
        setWishlist(response.data.myWishList); 
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
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
        setCart,         // Providing setCart so BookCard can directly update cart state
        setWishlist,    // Providing setWishlist so BookCard can directly update wishlist state
        fetchBooks,
        fetchCart,
        fetchWishlist,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
