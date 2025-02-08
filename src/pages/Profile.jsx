
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const { logout, user, updateUser } = useAuth(); 
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user?.profileImage);
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handleSave = () => {
    if (updateUser) {
      const updatedData = {
        name,
        email,
        password,
        profileImage: newProfileImage || profileImage,
      };

      updateUser(updatedData); 
      setEditMode(false);
    } else {
      console.error("updateUser is not defined");
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage(reader.result);
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setName(user?.name);
    setEmail(user?.email);
    setPassword("");
    setNewProfileImage(null);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <img
            src={newProfileImage || profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
        </div>
        {editMode ? (
          <div className="w-full space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">New Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">Change Profile Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full text-center space-y-4">
            <div className="font-medium text-lg text-gray-900">Name:{name}</div>
            <div className="text-sm text-gray-600">Email:{email}</div>
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={() => setEditMode(true)} variant="outline">
                Edit Profile
              </Button>
              <Button onClick={() => logout()}>Sign Out</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile
