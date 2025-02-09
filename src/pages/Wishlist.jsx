import  { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Heart, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist');
      const data = await response.json();
      if (response.ok) {
        setWishlist(data.wishlist);
      } else {
        showNotification(data.message, 'error');
      }
    } catch (error) {
      showNotification('Failed to fetch wishlist', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      const response = await fetch(`/api/wishlist/remove/${bookId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      
      if (response.ok) {
        setWishlist(wishlist.filter(book => book._id !== bookId));
        showNotification('Book removed from wishlist');
      } else {
        showNotification(data.message, 'error');
      }
    } catch (error) {
      showNotification('Failed to remove book', error);
    }
  };

  const filteredWishlist = wishlist.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      {notification && (
        <Alert variant={notification.type === 'error' ? "destructive" : "default"}>
          <AlertDescription>
            {notification.message}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Wishlist</h2>
              <div className="flex items-center gap-2">
                <Heart className="text-red-500" />
                <span className="font-medium">{wishlist.length} items</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                type="search"
              />
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : filteredWishlist.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchQuery ? 'No books found' : 'Your wishlist is empty'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredWishlist.map((book) => (
                  <div key={book._id} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-gray-500">By {book.author}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => removeFromWishlist(book._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wishlist;