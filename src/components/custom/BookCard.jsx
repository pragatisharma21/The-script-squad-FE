/* eslint-disable react/prop-types */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const BookCard = ({ book, addToCart }) => {
  return (
    <Card className=" shadow-lg rounded-xl overflow-hidden">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-indigo-600">${book.price}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={16}
                className={
                  index < Math.floor(book.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>
        <Button
          className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700"
          onClick={() => addToCart(book.id)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
