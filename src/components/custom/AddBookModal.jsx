/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useMediaQuery from "@/hooks/useMediaQuery";

const AddBookModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");

  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && !file.type.startsWith("image/")) {
      toast.warning("Please upload a valid image.");
    } else {
      setCoverImage(file);
    }
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type !== "application/pdf") {
      toast.warning("Please upload a valid PDF file.");
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
    if (coverImage) formData.append("coverImage", coverImage);
    if (pdfFile) formData.append("bookPdf", pdfFile);

    onSave(formData);
    onClose();
  };

  const FormContent = (
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter book title" />
      </div>
      <div>
        <Label>Author</Label>
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter author's name" />
      </div>
      <div>
        <Label>Description</Label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter book description" />
      </div>
      <div>
        <Label>Upload PDF</Label>
        <input type="file" onChange={handlePdfUpload} accept="application/pdf" />
      </div>
      <div>
        <Label>Cover Image</Label>
        <input type="file" onChange={handleImageUpload} accept="image/*" />
      </div>
      <div>
        <Label>Genre</Label>
        <Input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Enter genre" />
      </div>
      <div>
        <Label>Price</Label>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
      </div>
    </div>
  );

  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="p-6">
        <SheetHeader>
          <SheetTitle>Add Book</SheetTitle>
        </SheetHeader>
        {FormContent}
        <DialogFooter className="mt-4 flex gap-4 justify-between">
          <Button onClick={handleSave}>Add Book</Button>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </DialogFooter>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>
        {FormContent}
        <DialogFooter className="mt-4  flex gap-4 justify-between">
          <Button onClick={handleSave}>Add Book</Button>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
