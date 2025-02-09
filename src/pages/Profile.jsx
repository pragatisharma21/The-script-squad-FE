import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import Wishlist from "./Wishlist";
import Borrowing from "./Borrowing";

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "/api/placeholder/150/150");
  
  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    const updatedUserData = {
      name: editedName,
      email: editedEmail,
      profileImage: profileImage, 
    };
    await updateUser(updatedUserData); 
  };

  const handleLogout = () => {
    logout(); 
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Profile Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full w-24 h-24"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <Button variant="outline" onClick={() => document.getElementById("profile-image-input").click()}>
                Change Profile Picture
              </Button>
              <input
                type="file"
                id="profile-image-input"
                className="hidden"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Buttons */}
      <div className="mb-4">
        <Button variant="outline" onClick={() => setActiveTab("profile")}>Profile</Button>
        <Button variant="outline" onClick={() => setActiveTab("borrowing")}>Borrowing</Button>
        <Button variant="outline" onClick={() => setActiveTab("wishlist")}>Wishlist</Button>
      </div>

      {/* Tabs */}
      {activeTab === "profile" && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "borrowing" && (
        <Card>
          <CardContent className="pt-6">
            <Borrowing/>
          </CardContent>
        </Card>
      )}

      {activeTab === "wishlist" && (
        <Card>
          <CardContent className="pt-6">
           <Wishlist/>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
