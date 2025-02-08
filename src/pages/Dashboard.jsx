import { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/custom/BookCard";
import { getPaginatedBooks } from "@/Api/bookService";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const fetchBooks = async (pageNumber) => {
    try {
      const response = await getPaginatedBooks(pageNumber, 10);
      if (response.data.success) {
        setBooks(response.data.books);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(searchTerm)
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setBooks([...books].sort((a, b) => 
      sortOrder === "asc" ? b.price - a.price : a.price - b.price
    ));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto px-4 py-6 flex justify-center flex-col md:flex-row gap-4 items-center">
        <div className="flex w-full  items-center border border-gray-300 rounded-lg px-3 h-12">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            className="border-none focus:ring-0 px-3 w-full"
            placeholder="Search books..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <Button className="flex items-center justify-center h-12" onClick={handleSort}>
          {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />} Price
        </Button>
      </div>

      <div className="mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            favorites={favorites}
            setFavorites={setFavorites}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4 items-center ">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
        <span className="font-semibold">{page} / {totalPages}</span>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default Dashboard;
