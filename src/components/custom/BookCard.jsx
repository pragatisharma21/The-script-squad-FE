import { useState } from "react";
import { Star, Heart, X } from "lucide-react";
import PropTypes from "prop-types";

const BookCard = ({ book, favorites, setFavorites, cart, setCart }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [comments, setComments] = useState(book.comments || []);

  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(book.id) ? prev.filter((id) => id !== book.id) : [...prev, book.id]
    );
  };

  const addToCart = () => {
    if (!cart.find((item) => item.id === book.id)) {
      setCart([...cart, book]);
      alert(`${book.title} added to cart!`);
    }
  };

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [
        ...comments,
        { commentText: newComment, rating: newRating, createdAt: new Date().toISOString() }
      ];
      setComments(updatedComments);
      setNewComment("");
      setNewRating(5);
    }
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
      {/* ✅ Book Card (Unchanged UI) */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-red-800 dark:border-white cursor-pointer">
        <div className="relative">
          {/* ✅ Clicking the image opens the popup */}
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-64 object-cover rounded-lg cursor-pointer"
            onClick={handlePopupOpen}
          />

          {/* ❤️ Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
          >
            <Heart className={`h-5 w-5 ${favorites.includes(book.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
          </button>
        </div>
        <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <div className="flex items-center gap-1 my-2">{renderStars(book.rating)}</div>
        <p className="text-xl font-bold text-indigo-600">${book.price}</p>

        {/* 🛒 Add to Cart Button */}
        <button
          onClick={addToCart}
          disabled={!book.inStock}
          className={`w-full mt-3 py-2 rounded-lg transition-all ${
            book.inStock ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {book.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

      {/* ✅ Book Details Popup (Fully Responsive & Scrollable) */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 sm:px-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-5xl relative shadow-lg max-h-[90vh] overflow-y-auto">
            {/* ❌ Close Button (Always visible) */}
            <button
              className="absolute top-2 right-2 md:top-4 md:right-4 text-xl text-gray-600 dark:text-gray-300 hover:text-red-500"
              onClick={handlePopupClose}
            >
              <X />
            </button>

            {/* 📌 Responsive Layout: Image | Info | Comments & Ratings */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              
              {/* 📌 Book Image (Left) */}
              <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                <img src={book.coverImage} alt={book.title} className="w-full md:w-60 max-h-[60vh] object-cover rounded-lg shadow-md" />
              </div>

              {/* 📌 Book Info (Middle) */}
              <div className="flex-grow w-full md:w-1/3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{book.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">by {book.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Genre: {book.genre}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stock: {book.inStock ? "Available" : "Out of Stock"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rating: ⭐ {book.rating}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{book.description}</p>
                <p className="text-xl font-bold text-indigo-600 mt-2">${book.price}</p>

                {/* 🛒 Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart();
                    alert(`🛒 "${book.title}" has been added to your cart!`);
                  }}
                  
                  disabled={!book.inStock}
                  className={`w-full mt-3 py-2 rounded-lg transition-all ${
                    book.inStock ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {book.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>

              {/* 📌 Comments & Ratings (Right) */}
              <div className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Comments & Ratings</h3>

                {/* Existing Comments */}
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="border-b pb-2 mb-2">
                      <p className="text-sm">💬 {comment.commentText}</p>
                      <p className="text-xs text-gray-500">
                        ⭐ {comment.rating} - {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                )}

                {/* Add Comment & Rating Section */}
<div className="mt-4">
  <textarea
    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:text-white"
    rows="2"
    placeholder="Add a comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  />

  {/* ✅ Updated Rating Selection Dropdown */}
  <div className="flex items-center mt-2">
    <label className="text-sm mr-2">Your Rating:</label>
    <select
      value={newRating}
      onChange={(e) => setNewRating(Number(e.target.value))}
      className="border rounded-md px-2 py-1 dark:bg-gray-700 dark:text-white w-full focus:ring-2 focus:ring-indigo-600"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <option key={star} value={star}>
          {star} ⭐
        </option>
      ))}
    </select>
  </div>

  {/* ✅ Submit Button */}
  <button
    onClick={handleAddComment}
    className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg w-full"
  >
    Submit
  </button>
</div>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;

BookCard.propTypes = {
    book: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      coverImage: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      inStock: PropTypes.bool.isRequired,
      genre: PropTypes.string,
      description: PropTypes.string,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          commentText: PropTypes.string,
          rating: PropTypes.number,
          createdAt: PropTypes.string,
        })
      ),
    }).isRequired,
    favorites: PropTypes.array.isRequired,
    setFavorites: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
  };
  