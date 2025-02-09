import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const borrowedBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', dueDate: '2025-02-10', status: 'Current' },
  { id: 2, title: '1984', author: 'George Orwell', dueDate: '2025-01-25', status: 'Overdue' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', dueDate: '2025-02-15', status: 'Current' },
  { id: 4, title: 'Moby Dick', author: 'Herman Melville', dueDate: '2025-01-20', status: 'Overdue' },
  { id: 5, title: 'War and Peace', author: 'Leo Tolstoy', dueDate: '2025-02-05', status: 'Overdue' },
  { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', dueDate: '2025-03-01', status: 'Current' },
];

const Borrowing = () => {
  const [filteredBooks, setFilteredBooks] = useState(borrowedBooks);
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterBooks = () => {
    let filtered = borrowedBooks;

    if (filter === 'Overdue') {
      filtered = borrowedBooks.filter((book) => {
        const dueDate = new Date(book.dueDate);
        return dueDate < new Date() && book.status !== 'Returned';
      });
    } else if (filter === 'Current') {
      filtered = borrowedBooks.filter((book) => {
        const dueDate = new Date(book.dueDate);
        return dueDate >= new Date() && book.status !== 'Returned';
      });
    }

    setFilteredBooks(filtered);
  };

  const handleReturn = (id) => {
    setFilteredBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, status: 'Returned' } : book
      )
    );
  };

  useEffect(() => {
    filterBooks();
  }, [filter]);

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">My Borrowing Tab</h3>

      {/* Filter Section */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Filter Books</h4>

        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Overdue">Overdue</option>
            <option value="Current">Current</option>
          </select>
        </div>
      </div>

      {/* Display filtered books */}
      <div>
        {filteredBooks.length === 0 ? (
          <p>No borrowed books found matching your criteria.</p>
        ) : (
          <ul className="space-y-4">
            {filteredBooks.map((book) => (
              <li key={book.id} className="p-4 border border-gray-300 rounded-lg">
                <h5 className="text-lg font-semibold">{book.title}</h5>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Due Date: {book.dueDate}</p>
                <p className={`text-gray-600 ${book.status === 'Overdue' ? 'text-red-500' : ''}`}>
                  Status: {book.status}
                </p>

                {/* Return Button */}
                {book.status !== 'Returned' && (
                  <Button
                    variant="outline"
                    color="green"
                    onClick={() => handleReturn(book.id)}
                    className="mt-2"
                  >
                    Return
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Borrowing;
