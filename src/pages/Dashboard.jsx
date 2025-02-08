// // import { useState, useEffect } from "react";
// // import { useTheme } from "@/context/ThemeProvider";
// // import { Search, ShoppingCart, Star, Heart, BookOpen, SortAsc, SortDesc } from "lucide-react";
// // import { debounce } from "lodash";
// // import Navbar from "@/components/custom/Navbar";

// // const sampleBooks = [
// //   {
// //     id: 1,
// //     title: "The Great Gatsby",
// //     author: "F. Scott Fitzgerald",
// //     description: "A classic novel set in the Roaring Twenties, exploring themes of wealth, love, and the American Dream.",
// //     pdfUrl: "https://example.com/great-gatsby.pdf",
// //     pdfFileId: "file12345",
// //     coverImage: "https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180",
// //     coverImageFileId: "image12345",
// //     genre: "Classic",
// //     price: 19.99,
// //     reviews: ["65e123abcde456f78901234a"],
// //     rating: 4.5,
// //     inStock: true,
// //     comments: [
// //       {
// //         userId: "65e123abcdef456f78901234b",
// //         commentText: "A timeless masterpiece!",
// //         createdAt: "2024-02-07T12:00:00Z",
// //       },
// //     ],
// //     available: true,
// //   },
// //   {
// //     id: 2,
// //     title: "Dune",
// //     author: "Frank Herbert",
// //     description: "A science fiction epic about politics, power, and survival on the desert planet Arrakis.",
// //     pdfUrl: "https://example.com/dune.pdf",
// //     pdfFileId: "file67890",
// //     coverImage: "https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180",
// //     coverImageFileId: "image67890",
// //     genre: "Science Fiction",
// //     price: 24.99,
// //     reviews: ["65e456abcde456f78901234c"],
// //     rating: 4.8,
// //     inStock: false,
// //     comments: [
// //       {
// //         userId: "65e789abcdef456f78901234d",
// //         commentText: "A must-read for sci-fi lovers!",
// //         createdAt: "2024-02-07T13:30:00Z",
// //       },
// //     ],
// //     available: false,
// //   },
// //   {
// //     id: 3,
// //     title: "Pride and Prejudice",
// //     author: "Jane Austen",
// //     description: "A witty and romantic novel exploring love, class, and family in 19th-century England.",
// //     pdfUrl: "https://example.com/pride-prejudice.pdf",
// //     pdfFileId: "file78901",
// //     coverImage: "https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180",
// //     coverImageFileId: "image78901",
// //     genre: "Romance",
// //     price: 15.99,
// //     reviews: ["65e789abcde456f78901234e"],
// //     rating: 4.7,
// //     inStock: true,
// //     comments: [
// //       {
// //         userId: "65e890abcdef456f78901234f",
// //         commentText: "A beautiful love story.",
// //         createdAt: "2024-02-07T14:45:00Z",
// //       },
// //     ],
// //     available: true,
// //   },
// //   {
// //     id: 4,
// //     title: "1984",
// //     author: "George Orwell",
// //     description: "A chilling vision of a totalitarian future where Big Brother watches every move.",
// //     pdfUrl: "https://example.com/1984.pdf",
// //     pdfFileId: "file89012",
// //     coverImage: "https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180",
// //     coverImageFileId: "image89012",
// //     genre: "Dystopian",
// //     price: 18.99,
// //     reviews: ["65e890abcde456f789012350"],
// //     rating: 4.9,
// //     inStock: false,
// //     comments: [
// //       {
// //         userId: "65e901abcdef456f789012351",
// //         commentText: "A thought-provoking read.",
// //         createdAt: "2024-02-07T15:10:00Z",
// //       },
// //     ],
// //     available: false,
// //   },
// //   {
// //     id: 5,
// //     title: "To Kill a Mockingbird",
// //     author: "Harper Lee",
// //     description: "A powerful novel about racial injustice and childhood innocence in the Deep South.",
// //     pdfUrl: "https://example.com/to-kill-a-mockingbird.pdf",
// //     pdfFileId: "file90123",
// //     coverImage: "https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180",
// //     coverImageFileId: "image90123",
// //     genre: "Classic",
// //     price: 21.99,
// //     reviews: ["65e901abcde456f789012352"],
// //     rating: 4.8,
// //     inStock: true,
// //     comments: [
// //       {
// //         userId: "65e012abcdef456f789012353",
// //         commentText: "A moving and beautifully written book.",
// //         createdAt: "2024-02-07T16:00:00Z",
// //       },
// //     ],
// //     available: true,
// //   },
// //   {
// //     id: 6,
// //     title: "The Hobbit",
// //     author: "J.R.R. Tolkien",
// //     description: "An adventurous journey of Bilbo Baggins in the land of Middle-earth.",
// //     pdfUrl: "https://example.com/the-hobbit.pdf",
// //     pdfFileId: "file01234",
// //     coverImage: "https://tse3.mm.bing.net/th?id=OIP.mxb2csAYPZtO6h5G3S6HAgHaE8&pid=Api&P=0&h=180",
// //     coverImageFileId: "image01234",
// //     genre: "Fantasy",
// //     price: 17.99,
// //     reviews: ["65e012abcde456f789012354"],
// //     rating: 4.8,
// //     inStock: true,
// //     comments: [
// //       {
// //         userId: "65e123abcdef456f789012355",
// //         commentText: "A great adventure for all ages!",
// //         createdAt: "2024-02-07T17:30:00Z",
// //       },
// //     ],
// //     available: true,
// //   }
// // ];

// // const genres = ["All", "Classic", "Science Fiction", "Romance", "Mystery", "Fantasy"];

// // const Dashboard = () => {
// //   const { theme } = useTheme();
// //   const [books, setBooks] = useState(sampleBooks);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedGenre, setSelectedGenre] = useState("All");
// //   const [sortOrder, setSortOrder] = useState("asc");
// //   const [cart, setCart] = useState([]);
// //   const [favorites, setFavorites] = useState([]);
// //   const [selectedBook, setSelectedBook] = useState(null);

// //   const openBookPopup = (book) => setSelectedBook(book);
// //   const closeBookPopup = () => setSelectedBook(null);

// //   const debouncedSearch = debounce((term) => {
// //     const filtered = sampleBooks.filter(
// //       (book) =>
// //         book.title.toLowerCase().includes(term.toLowerCase()) ||
// //         book.author.toLowerCase().includes(term.toLowerCase())
// //     );
// //     setBooks(filtered);
// //   }, 300);

// //   const handleSearch = (e) => {
// //     setSearchTerm(e.target.value);
// //     debouncedSearch(e.target.value);
// //   };

// //   const toggleFavorite = (bookId) => {
// //     setFavorites((prev) =>
// //       prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
// //     );
// //   };

// //   useEffect(() => {
// //     let filtered = [...sampleBooks];

// //     if (selectedGenre !== "All") {
// //       filtered = filtered.filter((book) => book.genre === selectedGenre);
// //     }

// //     if (searchTerm) {
// //       filtered = filtered.filter(
// //         (book) =>
// //           book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           book.author.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }

// //     filtered.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
// //     setBooks(filtered);
// //   }, [selectedGenre, sortOrder, searchTerm]);

// //   const addToCart = (book) => {
// //     setCart((prev) => [...prev, book]);
// //   };

// //   const renderStars = (rating) =>
// //     [...Array(5)].map((_, index) => (
// //       <Star
// //         key={index}
// //         size={16}
// //         className={index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// //       />
// //     ));

// //   return (
// //     <>
// //       <Navbar />
// //       <div className={`min-h-screen bg-background text-foreground ${theme === "dark" ? "dark" : ""}`}>
// //         {/* Header */}
// //         <div className="bg-card shadow-lg">
// //           <div className="container mx-auto px-4 py-4 flex justify-between items-center">
// //             <div className="flex items-center space-x-2">
// //               {/* <BookOpen className="h-8 w-8 text-indigo-600 dark:text-white" /> */}
// //               {/* <h1 className="text-3xl font-bold">Libraya Store</h1> */}
// //             </div>
// //             <div className="relative">
// //               {/* <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-white cursor-pointer hover:text-indigo-600" /> */}
// //               {cart.length > 0 && (
// //                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
// //                   {cart.length}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search and Filter Section */}
// //         <div className="container mx-auto px-2 py-3 flex flex-col md:flex-row gap-3">
// //           {/* Search Bar - Compact height */}
// //           <div className="w-full md:w-[70%]">
// //             <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 flex items-center gap-2">
// //               <Search className="h-5 w-5 text-gray-500 dark:text-gray-300" />
// //               <input
// //                 type="text"
// //                 placeholder="Search books..."
// //                 className="w-full px-2 py-1 border border-red-800 dark:border-none focus:ring-0 bg-transparent text-gray-900 dark:text-white"
// //                 value={searchTerm}
// //                 onChange={handleSearch}
// //               />
// //             </div>
// //           </div>

// //           {/* Filter Section  */}
// //           <div className="w-full md:w-[30%] flex flex-wrap">
// //             <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 flex flex-row justify-between items-center gap-2">
// //               <div className="flex items-center gap-2">
// //                 <select
// //                   onChange={(e) => setSelectedGenre(e.target.value)}
// //                   className="border rounded-md bg-gray-50 dark:bg-gray-700 px-2 py-1 border-red-800 dark:border-none"
// //                 >
// //                   {genres.map((genre) => (
// //                     <option key={genre} value={genre}>{genre}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <button
// //                 onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
// //                 className="border rounded-md px-2 py-1 flex items-center"
// //               >
// //                 {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
// //                 Price
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Book Grid */}
// //         <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //           {books.map((book) => (
// //             <div key={book.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-lg transition-all p-4 border border-red-800 dark:border-white cursor-pointer hover:drop-shadow-sm">
// //               <div className="relative">
// //                 <img
// //                   src={book.coverImage}
// //                   alt={book.title}
// //                   className="w-full h-64 object-cover rounded-lg cursor-pointer"
// //                   style={{ aspectRatio: '2/3' }}
// //                   onClick={() => openBookPopup(book)}
// //                 />
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     toggleFavorite(book.id);
// //                   }}
// //                   className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
// //                 >
// //                   <Heart className={`h-5 w-5 ${favorites.includes(book.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
// //                 </button>
// //               </div>
// //               <div className="mt-4">
// //                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{book.title}</h3>
// //                 <p className="text-gray-600 dark:text-gray-400">{book.author}</p>
// //                 <div className="flex items-center gap-1 my-2">{renderStars(book.rating)}</div>
// //                 <p className="text-xl font-bold text-indigo-600">${book.price}</p>
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     addToCart(book);
// //                     alert(`${book.title} has been added to the cart!`);
// //                   }}
// //                   disabled={!book.inStock}
// //                   className={`w-full mt-3 py-2 rounded-lg transition-all ${
// //                     book.inStock ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
// //                   }`}
// //                 >
// //                   {book.inStock ? "Add to Cart" : "Out of Stock"}
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Book Modal -  */}
// //              {/* Book Details Modal */}
// //              {selectedBook && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2 sm:px-4 overflow-auto" onClick={closeBookPopup}>
// //             <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[95%] max-w-3xl relative shadow-lg" onClick={(e) => e.stopPropagation()}>
// //               <button className="absolute top-4 right-4 text-xl text-gray-600 dark:text-gray-300 hover:text-red-500" onClick={closeBookPopup}>
// //                 ✖
// //               </button>

// //               <div className="flex flex-col md:flex-row gap-6">
// //                 {/* Book Cover */}
// //                 <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
// //                   <img src={selectedBook.coverImage} alt={selectedBook.title} className="w-full md:w-60 max-h-[60vh] object-cover rounded-lg shadow-md" />
// //                 </div>

// //                 {/* Book Details */}
// //                 <div className="flex-grow">
// //                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedBook.title}</h2>
// //                   <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">by {selectedBook.author}</p>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400">{selectedBook.genre}</p>
// //                   <p className="mt-4 text-gray-700 dark:text-gray-300">{selectedBook.description}</p>
// //                   <p className="text-lg font-bold text-indigo-600 mt-4">${selectedBook.price}</p>

// //                   {/* Comments Section */}
// //                   <h3 className="mt-4 text-lg font-semibold">Comments</h3>
// //                   {selectedBook.comments.length > 0 ? (
// //                     selectedBook.comments.map((comment, index) => (
// //                       <p key={index} className="text-sm text-gray-500 dark:text-gray-400 mt-1">💬 {comment.commentText}</p>
// //                     ))
// //                   ) : (
// //                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No comments yet.</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Dashboard;





// import { useState, useEffect } from "react";
// import { useTheme } from "@/context/ThemeProvider";
// import { Search, ShoppingCart, Star, Heart, SortAsc, SortDesc } from "lucide-react";
// import { debounce } from "lodash";
// import Navbar from "@/components/custom/Navbar";

// const genres = ["All", "Classic", "Science Fiction", "Romance", "Mystery", "Fantasy"];

// const Dashboard = () => {
//   const { theme } = useTheme();
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("All");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [cart, setCart] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);

//   // ✅ Fetch books from JSON file
//   useEffect(() => {
//     fetch("/books.json")  // Adjust path if needed
//       .then((res) => res.json())
//       .then((data) => setBooks(data))
//       .catch((err) => console.error("Error fetching books:", err));
//   }, []);

//   const debouncedSearch = debounce((term) => {
//     setSearchTerm(term);
//   }, 300);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     debouncedSearch(e.target.value);
//   };

//   useEffect(() => {
//     fetch("/books.json")
//       .then((res) => res.json())
//       .then((data) => {
//         let filtered = [...data];

//         if (selectedGenre !== "All") {
//           filtered = filtered.filter((book) => book.genre === selectedGenre);
//         }

//         if (searchTerm) {
//           filtered = filtered.filter(
//             (book) =>
//               book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               book.author.toLowerCase().includes(searchTerm.toLowerCase())
//           );
//         }

//         filtered.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
//         setBooks(filtered);
//       })
//       .catch((err) => console.error("Error fetching books:", err));
//   }, [selectedGenre, sortOrder, searchTerm]);

//   return (
//     <>
//       <Navbar />
//       <div className={`min-h-screen bg-background text-foreground ${theme === "dark" ? "dark" : ""}`}>
//         {/* Search and Filter Section */}
//         <div className="container mx-auto px-2 py-3 flex flex-col md:flex-row gap-3">
//           {/* Search Bar */}
//           <div className="w-full md:w-[70%]">
//             <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 flex items-center gap-2">
//               <Search className="h-5 w-5 text-gray-500 dark:text-gray-300" />
//               <input
//                 type="text"
//                 placeholder="Search books..."
//                 className="w-full px-2 py-1 border border-red-800 dark:border-none focus:ring-0 bg-transparent text-gray-900 dark:text-white"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </div>
//           </div>

//           {/* Filter Section */}
//           <div className="w-full md:w-[30%] flex flex-wrap">
//             <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 flex flex-row justify-between items-center gap-2">
//               <select
//                 onChange={(e) => setSelectedGenre(e.target.value)}
//                 className="border rounded-md bg-gray-50 dark:bg-gray-700 px-2 py-1 border-red-800 dark:border-none"
//               >
//                 {genres.map((genre) => (
//                   <option key={genre} value={genre}>{genre}</option>
//                 ))}
//               </select>
//               <button
//                 onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//                 className="border rounded-md px-2 py-1 flex items-center"
//               >
//                 {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
//                 Price
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Book Grid */}
//         <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {books.map((book) => (
//             <div key={book.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-red-800 dark:border-white cursor-pointer">
//               <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover rounded-lg" />
//               <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
//               <p className="text-gray-600">{book.author}</p>
//               <p className="text-xl font-bold text-indigo-600">${book.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
// import BookCard from "@/components/custom/BookCard";
import { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { debounce } from "lodash";
import Navbar from "@/components/custom/Navbar";
import BookCard from "@/components/custom/BookCard" // Import BookCard component

const Dashboard = () => {
  const [books, setBooks] = useState([]); // Holds all books
  const [filteredBooks, setFilteredBooks] = useState([]); // Books after filtering
  const [genres, setGenres] = useState(["All"]); // Dynamic genre list
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);


 
  // ✅ Fetch books dynamically & Extract unique genres
  useEffect(() => {
    fetch("/books.json") // Adjust the path if needed
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);

        // Extract unique genres dynamically
        const uniqueGenres = ["All", ...new Set(data.map((book) => book.genre))];
        setGenres(uniqueGenres);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  // ✅ Search Function (Debounced for efficiency)
  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  // ✅ Filtering & Sorting Logic
  useEffect(() => {
    let updatedBooks = [...books];

    // Filter by Genre (Ignore "All")
    if (selectedGenre !== "All") {
      updatedBooks = updatedBooks.filter((book) => book.genre === selectedGenre);
    }

    // Filter by Search Term
    if (searchTerm) {
      updatedBooks = updatedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by Price
    updatedBooks.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

    setFilteredBooks(updatedBooks);
  }, [books, selectedGenre, searchTerm, sortOrder]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-background text-foreground">
      {/* ✅ Search & Filter Section */}
      <div className="container mx-auto px-2 py-3 flex flex-col md:flex-row gap-3">
        {/* Search Bar */}
        <div className="w-full md:w-[70%]">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-2 py-1 border border-red-800 dark:border-none focus:ring-0 bg-transparent text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="w-full md:w-[30%] flex flex-wrap">
          <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-3 flex flex-row justify-between items-center gap-2">
            {/* ✅ Dynamic Genre Filter */}
            <select
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="border rounded-md bg-gray-50 dark:bg-gray-700 px-2 py-1 border-red-800 dark:border-none"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            {/* Sorting by Price */}
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="border rounded-md px-2 py-1 flex items-center"
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              Price
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Book Grid (Filtered & Sorted) */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            favorites={favorites}
            setFavorites={setFavorites}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
    </>
  );
};


export default Dashboard;
