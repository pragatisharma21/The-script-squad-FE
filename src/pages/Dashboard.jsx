
import  { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeProvider";
// import ThemeToggle from "@/components/custom/ThemeToggle";
// import { Search, ShoppingCart, Star, Filter, ChevronDown, Heart, BookOpen, SortAsc, SortDesc } from "lucide-react";
import { Search, ShoppingCart, Star,  Heart, BookOpen, SortAsc, SortDesc } from "lucide-react";
import { debounce } from "lodash";
import Navbar from "@/components/custom/Navbar";


const sampleBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 19.99,
    rating: 4.5,
    genre: "Classic",
    description: "A timeless tale of wealth, ambition, and love in the Roaring Twenties.",
    inStock: true,
    image:'https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180',
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    price: 24.99,
    rating: 4.8,
    genre: "Science Fiction",
    description: "A gripping sci-fi epic about power, politics, and destiny on the desert planet Arrakis.",
    inStock: true,
    image:'https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180',
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 15.99,
    rating: 4.7,
    genre: "Romance",
    description: "A witty and romantic novel exploring love, class, and family in 19th-century England.",
    inStock: false,
    image:'https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180',
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    price: 18.99,
    rating: 4.9,
    genre: "Dystopian",
    description: "A chilling vision of a totalitarian future where Big Brother watches every move.",
    inStock: true,
    image:'https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180',
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 21.99,
    rating: 4.8,
    genre: "Classic",
    description: "A powerful novel about racial injustice and childhood innocence in the Deep South.",
    inStock: true,
    image:'https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180',
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 17.99,
    rating: 4.8,
    genre: "Fantasy",
    description: "An adventurous journey of Bilbo Baggins in the land of Middle-earth.",
    inStock: false,
    image:'https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180',
  },
];


const genres = ["All", "Classic", "Science Fiction", "Romance", "Mystery", "Fantasy"];

const Dashboard = () => {
  const { theme } = useTheme();
  const [books, setBooks] = useState(sampleBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);


  const openBookPopup = (book) => {
    setSelectedBook(book);
  };
  
  const closeBookPopup = () => {
    setSelectedBook(null);
  };

  const debouncedSearch = debounce((term) => {
    const filtered = sampleBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
    );
    setBooks(filtered);
  }, 300);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  useEffect(() => {
    let filtered = [...sampleBooks];

    if (selectedGenre !== "All") {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    setBooks(filtered);
  }, [selectedGenre, sortOrder]);

  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));

  return (
    <>
    <Navbar/>
    <div className={`min-h-screen bg-background text-foreground ${theme === "dark" ? "dark" : ""}`}>
      {/* Header */}
      <div className="bg-card shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600 dark:text-white" />
            <h1 className="text-3xl font-bold"> Libraya Store</h1>
            {/* 📚 */}
          </div>
          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-white cursor-pointer hover:text-indigo-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

   
{/* Search and Filter Section */}
<div className="container mx-auto px-2 py-5 flex flex-col md:flex-row gap-4">
  
  {/* Search Bar - Full width on mobile, 70% on larger screens */}
  <div className="w-full md:w-[70%]">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center gap-4">
      <Search className="h-6 w-6 text-gray-500 dark:text-gray-300" />
      <input
        type="text"
        placeholder="Search books..."
        className="w-full px-4 py-2  focus:ring-0 bg-transparent text-gray-900 dark:text-white  border border-red-800 dark:border-none"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  </div>

  {/* Filter Section - Stacks below search bar on mobile, side-by-side on larger screens */}
  <div className="w-full md:w-[30%] flex flex-wrap">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      
      {/* Genre Filter */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <h3 className="text-sm font-semibold">Genre</h3>
        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border rounded-md bg-gray-50 dark:bg-gray-700 px-3 py-2 w-full md:w-auto border  border-red-800 dark:border-none"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By Price */}
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="border rounded-md px-3 py-2 flex items-center w-full md:w-auto"
      >
        {sortOrder === "asc" ? <SortAsc className="mr-2" /> : <SortDesc className="mr-2" />}
        Price
      </button>
    </div>
  </div>
</div>

      {/* Book Grid */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  ">
        {books.map((book) => (
          <div key={book.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-lg transition-all p-4  border border-red-800 dark:border-white cursor-pointer hover:text-indigo-600 transition-transform duration-300 hover:scale-110">
            <div className="relative">
             <img 
  src="https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180" 
  alt={book.title} 
  className="w-full h-48 object-cover rounded-lg cursor-pointer"
  onClick={() => openBookPopup(book)} // Opens modal
/>

              <button onClick={() => toggleFavorite(book.id)} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md">
                <Heart className={`h-5 w-5 ${favorites.includes(book.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{book.author}</p>
              <div className="flex items-center gap-1 my-2">{renderStars(book.rating)}</div>
              <p className="text-xl font-bold text-indigo-600">${book.price}</p>
              <button
                onClick={() => addToCart(book)}
                disabled={!book.inStock}
                className={`w-full mt-3 py-2 rounded-lg transition-all ${book.inStock ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                {book.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2 sm:px-4 overflow-auto"
    onClick={closeBookPopup}
  >
    <div 
      className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg w-[95%] max-w-[400px] md:max-w-3xl relative shadow-lg overflow-y-auto"
      onClick={(e) => e.stopPropagation()} 
    >
      {/* 🔴 Close Button (Always Visible) */}
      <button 
        className="absolute top-2 right-2 sm:top-4 sm:right-7 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 hover:text-red-500 p-3 z-50"
        onClick={closeBookPopup}
      >
        ✖
      </button>

      {/* ✅ Responsive Modal Layout */}
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
        
        {/* 🟢 Left Side - Book Image (Fix Visibility) */}
        <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
          <img 
            src={selectedBook.image || "https://via.placeholder.com/240x320"} 
            alt={selectedBook.title} 
            className="w-full md:w-60 max-h-[60vh] md:max-h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* 🔵 Right Side - Book Details */}
        <div className="flex-grow">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{selectedBook.title}</h2>
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mt-2">
            by <span className="font-medium">{selectedBook.author}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedBook.genre}</p>

          {/* ⭐ Rating & Stock */}
          <div className="flex items-center mt-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={index < Math.floor(selectedBook.rating) ? "fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-gray-600 dark:text-gray-400 ml-3">({selectedBook.rating})</span>
          </div>
          <p className={`mt-2 text-sm font-medium ${selectedBook.inStock ? "text-green-600" : "text-red-500"}`}>
            {selectedBook.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* 📖 Description */}
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{selectedBook.description}</p>

          {/* 📚 Additional Info */}
          <div className="mt-4 space-y-1 text-sm text-gray-500 dark:text-gray-400">
            <p><strong>Publisher:</strong> {selectedBook.publisher || "Unknown"}</p>
            <p><strong>Published Date:</strong> {selectedBook.publishedDate || "N/A"}</p>
            <p><strong>ISBN:</strong> {selectedBook.isbn || "N/A"}</p>
          </div>

          {/* 💲 Price & Buttons */}
          <div className="mt-6">
            <p className="text-2xl font-bold text-indigo-600">${selectedBook.price}</p>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button 
                className="w-full md:w-1/2 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                onClick={() => {
                  console.log("Added to Cart:", selectedBook.title);
                  closeBookPopup();
                }}
              >
                Add to Cart
              </button>
              <button 
                className="w-full md:w-1/2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                onClick={() => {
                  console.log("Buy Now:", selectedBook.title);
                  closeBookPopup();
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
)}


    </div>
    </>
  );
};


export default Dashboard;
