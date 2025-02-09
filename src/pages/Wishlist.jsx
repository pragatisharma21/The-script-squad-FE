import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const sampleBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
  { id: 4, title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure' },
  { id: 5, title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Historical' },
  { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction' },
];

const Wishlist = () => {
  const [filteredBooks, setFilteredBooks] = useState(sampleBooks);
  const [filter, setFilter] = useState({
    title: '',
    author: '',
    genre: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filterBooks = () => {
    const filtered = sampleBooks.filter((book) => {
      const matchesTitle = book.title.toLowerCase().includes(filter.title.toLowerCase());
      const matchesAuthor = book.author.toLowerCase().includes(filter.author.toLowerCase());
      const matchesGenre = filter.genre ? book.genre === filter.genre : true;

      return matchesTitle && matchesAuthor && matchesGenre;
    });
    setFilteredBooks(filtered);
  };

  const handleRemove = (id) => {
    setFilteredBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  React.useEffect(() => {
    filterBooks();
  }, [filter]);

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">My Wishlist</h3>

      {/* Filter Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Filter Books</h4>

        <div className="flex space-x-4">
          <input
            type="text"
            name="title"
            value={filter.title}
            onChange={handleFilterChange}
            placeholder="Filter by Title"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="author"
            value={filter.author}
            onChange={handleFilterChange}
            placeholder="Filter by Author"
            className="p-2 border rounded"
          />
          <select
            name="genre"
            value={filter.genre}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Filter by Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Adventure">Adventure</option>
            <option value="Historical">Historical</option>
          </select>
        </div>
      </div>

      {/* Display filtered books */}
      <div>
        {filteredBooks.length === 0 ? (
          <p>No books found matching your criteria.</p>
        ) : (
          <ul className="space-y-4">
            {filteredBooks.map((book) => (
              <li key={book.id} className="p-4 border border-gray-300 rounded-lg">
                <h5 className="text-lg font-semibold">{book.title}</h5>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Genre: {book.genre}</p>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => handleRemove(book.id)}
                  className="mt-2 "
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
