import { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/custom/BookCard";
import { useBook } from "@/context/BookContext";
import useDebounce from "@/hooks/use-debounce";

const Dashboard = () => {
  const { books, cart, wishlist, page, totalPages, setPage, fetchBooks } =
    useBook();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      }
      return 0;
    });

  const handlePriceSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  useEffect(() => {}, [cart, wishlist]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto px-4 py-6 flex justify-center flex-col md:flex-row gap-4 items-center">
        <div className="flex w-full items-center border border-gray-300 rounded-lg px-3 h-12">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            className="border-none focus:ring-0 px-3 w-full"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          onClick={handlePriceSort}
          className="ml-4 h-12 px-4"
        >
          {sortOrder === "asc" ? (
            <SortAsc />
          ) : sortOrder === "desc" ? (
            <SortDesc />
          ) : (
            <SortDesc />
          )}
        </Button>
      </div>

      <div className="mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            cart={cart}
            wishlist={wishlist}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-4 items-center">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <span className="font-semibold">
          {page} / {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
