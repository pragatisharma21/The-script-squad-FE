import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { handlePayment } from "@/lib/paymentUtil";
import { getMyBooks, updateUserProfile } from "@/Api/userService";
// import ProfileTabs from "@/components/custom/profileTabs";
import AddBookModal from "@/components/custom/AddBookModal";
import { postBook } from "@/Api/bookService";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { user, logout, fetchUser, userData } = useAuth();
  const [username, setUsername] = useState(userData?.name || "");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(userData?.profileImage);
  const [activeTab, setActiveTab] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myBooks, setMyBooks] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveBook = async (formData) => {
    await postBook(formData);
    handleCloseModal();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleFleetPayment = (userId, paymentType, books, amount, def) => {
    handlePayment(userId, paymentType, books, amount, def, fetchUser);
  };

  const handleSaveChanges = useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", username);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      } else if (previewImage) {
        formData.append("profileImage", previewImage);
      }

      await updateUserProfile(user.userId, formData);
      await fetchUser(user.userId);
    },
    [username, profileImage, previewImage, user, fetchUser]
  );

  const fetchMyBooks = async () => {
    const res = await getMyBooks();
    setMyBooks(res.data.books);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (userData) {
      fetchMyBooks();
      setUsername(userData.name || "");
      setPreviewImage(userData.profileImage || user?.profileImage);
    }
  }, [userData, user]);

  const renderActionButton = () => {
    switch (userData?.userType) {
      case "DEFAULT":
        return (
          <Button
            onClick={() =>
              handleFleetPayment(user.userId, "FLEET_ADMIN", [], 1, null)
            }
            className="rounded-full bg-transparent text-black dark:text-white border hover:bg-gray-700 dark:hover:bg-gray-500 text-sm py-1 px-2"
          >
            Become Fleet Admin (₹1)
          </Button>
        );
      case "FLEET_PENDING":
        return (
          <Button className="rounded-full bg-yellow-700 text-sm py-1 px-2">
            Pending Approval
          </Button>
        );
      case "FLEET_ADMIN":
        return (
          <Button
            onClick={handleOpenModal}
            className="rounded-full text-sm py-1 px-2"
          >
            Add Books
          </Button>
        );
      default:
        return null;
    }
  };

  const downloadPDF = (bookId) => {
    const pdfUrl = myBooks.find((book) => book.id === bookId)?.pdfUrl;

    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.target = "_blank";
      link.download = pdfUrl.split("/").pop();
      link.click();
    } else {
      alert("PDF not found.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 mx-auto">
      <Card className="mb-6 relative">
        <CardContent className="pt-7">
          <div className="flex flex-col md:flex-row items-center gap-6 mt-3">
            <div className="relative group">
              <img
                src={previewImage}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover"
              />
              <input
                type="file"
                id="profile-image-input"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <label
                  htmlFor="profile-image-input"
                  className="cursor-pointer bg-gray-800 text-white p-2 rounded-full"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v8m4-4H8"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <h1 className="text-2xl font-bold">{userData?.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {userData?.email}
              </p>
            </div>
            <div className="space-x-4 flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
            <div className="absolute top-2 right-6">{renderActionButton()}</div>
          </div>
        </CardContent>
      </Card>

      <div
        className={`absolute z-50 w-[90%] sm:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <AddBookModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveBook}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
      <TabsList className="sm:space-x-2 flex ">
        <TabsTrigger
          value="profile"
          className={
            activeTab === "profile"
              ? "bg-gray-200 sm:text-base text-[10px]"
              : "sm:text-base text-[10px]"
          }
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="myBooks"
          className={
            activeTab === "myBooks"
              ? "bg-gray-200 sm:text-base text-[10px]"
              : "sm:text-base text-[10px]"
          }
        >
          My Books
        </TabsTrigger>
        {/* <TabsTrigger
          value="myPosts"
          className={
            activeTab === "myPosts"
              ? "bg-gray-200 sm:text-base text-[10px]"
              : "sm:text-base text-[10px]"
          }
        >
          My Post
        </TabsTrigger>
        {userType === "FLEET_ADMIN" && (
          <TabsTrigger
            value="paymentHistory"
            className={
              activeTab === "paymentHistory"
                ? "bg-gray-200 sm:text-base text-[10px]"
                : "sm:text-base text-[10px]"
            }
          >
            Payment History
          </TabsTrigger>
        )} */}
      </TabsList>
    </Tabs>

      {activeTab === "profile" && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "myBooks" && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">My Books</h2>
              {myBooks.length === 0 ? (
                <p>No books found.</p>
              ) : (
                myBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-4"
                  >
                    <div className="flex-shrink-0 w-24 h-24 mb-4 md:mb-0 md:mr-4">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-sm text-gray-600">
                        {book.description}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        onClick={() => downloadPDF(book._id)}
                        className="w-32"
                      >
                        Download PDF
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* {activeTab === "myPosts" && (
        <Card>
          <CardContent className="pt-6">My Posts</CardContent>
        </Card>
      )}

      {activeTab === "paymentHistory" && (
        <Card>
          <CardContent className="pt-6">Payment History</CardContent>
        </Card>
      )} */}
    </div>
  );
};

export default Profile;
