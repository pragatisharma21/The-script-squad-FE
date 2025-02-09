import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AddBookModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
    } else {
      setCoverImage(file);
    }
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
    } else {
      setPdfFile(file);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("price", price);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    if (pdfFile) {
      formData.append("bookPdf", pdfFile);
    }

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-8 rounded-lg w-full shadow-lg dark:bg-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label>Author</Label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author's name"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter book description"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label>Upload PDF</Label>
              <input
                type="file"
                onChange={handlePdfUpload}
                accept="application/pdf"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label>Cover Image</Label>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label>Genre</Label>
              <Input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Enter genre"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </DialogDescription>
        <DialogFooter className={"mt-2"}>
          <Button
            onClick={handleSave}
            className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4"
          >
            Add Book
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            className="bg-gray-300 text-black hover:bg-gray-400 rounded-lg py-2 px-4"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
