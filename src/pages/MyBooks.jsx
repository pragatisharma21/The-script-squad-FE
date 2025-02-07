import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  AlertCircle 
} from 'lucide-react';

// Utility function to calculate dates
const calculateDueDate = (borrowDate, days = 14) => {
  const dueDate = new Date(borrowDate);
  dueDate.setDate(dueDate.getDate() + days);
  return dueDate;
};

// Utility function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Utility function to check if a date is overdue
const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date();
};

const MyBooks = () => {
  const [books, setBooks] = useState([
    { 
      id: 1, 
      title: 'The Hobbit', 
      author: 'J.R.R. Tolkien', 
      genre: 'Fantasy', 
      totalCopies: 5,
      availableCopies: 3,
      reservations: []
    },
    { 
      id: 2, 
      title: 'Pride and Prejudice', 
      author: 'Jane Austen', 
      genre: 'Classic', 
      totalCopies: 3,
      availableCopies: 1,
      reservations: []
    }
  ]);

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [activeNotifications, setActiveNotifications] = useState([]);

  // Borrow a book
  const borrowBook = (book) => {
    if (book.availableCopies <= 0) {
      // If no copies available, add to reservation
      const updatedBooks = books.map(b => 
        b.id === book.id 
          ? { 
              ...b, 
              reservations: [...b.reservations, { 
                userId: 'current-user-id', 
                date: new Date() 
              }] 
            } 
          : b
      );
      setBooks(updatedBooks);
      
      // Create a notification
      const notification = {
        id: `reservation-${book.id}-${Date.now()}`,
        type: 'reservation',
        bookId: book.id,
        title: book.title,
        message: `You've been added to the reservation queue for "${book.title}"`
      };
      setActiveNotifications(prev => [...prev, notification]);
      return;
    }

    // Borrow book
    const borrowDate = new Date();
    const dueDate = calculateDueDate(borrowDate);

    const newBorrowedBook = {
      ...book,
      borrowDate,
      dueDate,
      userId: 'current-user-id'
    };

    // Update books state
    const updatedBooks = books.map(b => 
      b.id === book.id 
        ? { 
            ...b, 
            availableCopies: b.availableCopies - 1 
          } 
        : b
    );
    setBooks(updatedBooks);

    // Add to borrowed books
    setBorrowedBooks(prev => [...prev, newBorrowedBook]);

    // Create a notification
    const notification = {
      id: `borrow-${book.id}-${Date.now()}`,
      type: 'borrow',
      bookId: book.id,
      title: book.title,
      dueDate,
      message: `You've borrowed "${book.title}". Due on ${formatDate(dueDate)}`
    };
    setActiveNotifications(prev => [...prev, notification]);
  };

  // Return a book
  const returnBook = (borrowedBook) => {
    // Remove from borrowed books
    const updatedBorrowedBooks = borrowedBooks.filter(
      book => book.id !== borrowedBook.id
    );
    setBorrowedBooks(updatedBorrowedBooks);

    // Update available copies
    const updatedBooks = books.map(b => 
      b.id === borrowedBook.id 
        ? { 
            ...b, 
            availableCopies: b.availableCopies + 1 
          } 
        : b
    );
    setBooks(updatedBooks);

    // Check for pending reservations
    const bookWithReservations = updatedBooks.find(b => b.id === borrowedBook.id);
    if (bookWithReservations.reservations.length > 0) {
      // Notify first reservation in queue
      const notification = {
        id: `reservation-available-${bookWithReservations.id}-${Date.now()}`,
        type: 'reservation-available',
        bookId: borrowedBook.id,
        title: borrowedBook.title,
        message: `"${borrowedBook.title}" is now available for your reservation!`
      };
      setActiveNotifications(prev => [...prev, notification]);

      // Remove first reservation
      const updatedReservations = bookWithReservations.reservations.slice(1);
      const finalUpdatedBooks = books.map(b => 
        b.id === borrowedBook.id 
          ? { 
              ...b, 
              reservations: updatedReservations 
            } 
          : b
      );
      setBooks(finalUpdatedBooks);
    }
  };

  // Check for overdue books and create notifications
  useEffect(() => {
    const overdueBooks = borrowedBooks.filter(book => isOverdue(book.dueDate));
    
    const overdueNotifications = overdueBooks.map(book => ({
      id: `overdue-${book.id}-${Date.now()}`,
      type: 'overdue',
      bookId: book.id,
      title: book.title,
      message: `The book "${book.title}" is overdue. Please return as soon as possible.`
    }));

    setActiveNotifications(prev => [
      ...prev.filter(n => n.type !== 'overdue'),
      ...overdueNotifications
    ]);
  }, [borrowedBooks]);

  return (
    <div className="space-y-6">
      {/* Notifications Section */}
      {activeNotifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 text-yellow-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeNotifications.map(notification => (
              <div 
                key={notification.id} 
                className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50"
              >
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Available Books Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2" />
            Available Books
          </CardTitle>
        </CardHeader>
        <CardContent>
          {books.map(book => (
            <div 
              key={book.id} 
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div>
                <h3 className="font-medium">{book.title}</h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <Badge variant="secondary" className="mt-2">
                  {book.availableCopies} / {book.totalCopies} Copies Available
                </Badge>
              </div>
              <Button 
                onClick={() => borrowBook(book)}
                disabled={book.availableCopies <= 0}
              >
                {book.availableCopies > 0 ? 'Borrow' : 'Join Reservation Queue'}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Borrowed Books Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2" />
            My Borrowed Books
          </CardTitle>
        </CardHeader>
        <CardContent>
          {borrowedBooks.length === 0 ? (
            <p className="text-center text-gray-500">No books currently borrowed</p>
          ) : (
            borrowedBooks.map(book => (
              <div 
                key={book.id} 
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
                <div>
                  <h3 className="font-medium">{book.title}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="text-gray-500" size={16} />
                    <span className={`text-sm ${isOverdue(book.dueDate) ? 'text-red-600' : 'text-gray-600'}`}>
                      Due: {formatDate(book.dueDate)}
                      {isOverdue(book.dueDate) && ' (Overdue)'}
                    </span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => returnBook(book)}>
                  Return Book
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBooks;
