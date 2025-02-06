import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { FaCamera } from "react-icons/fa";
import ThemeToggle from "@/components/custom/ThemeToggle";
import { googleSingnupUser, signupUser } from "@/Api/userService";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("/placeholder-user.jpg");

  const { login, user } = useAuth();

  const navigate = useNavigate();

  if (user?.token) {
    navigate("/dashboard");
  }
  const handleGoogleLogin = async (response) => {
    const googleToken = response?.credential;

    try {
      const res = await googleSingnupUser(googleToken);
      if (res.status === 201 || res.status === 200) {
        toast.success(
          `${res.status === 201 ? " Signup" : "Login"} Successfully`
        );
      }
      login(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("password", password);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const res = await signupUser(formData);

    if (res.status === 201 || res.status === 200) {
      console.log(res.status);
      toast.success("Signup Successfully");
      navigate("/sign-in");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Google login failed")}
            />
          </div>
          <div className="flex justify-center items-center flex-col mb-4">
            <Label htmlFor="profile-upload" className="cursor-pointer">
              <Avatar className="h-24 w-24 border-2 border-gray-300">
                <AvatarImage src={previewImage} />
                <AvatarFallback>
                  {" "}
                  <FaCamera className="text-2xl" />{" "}
                </AvatarFallback>
              </Avatar>
            </Label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to={"/sign-in"} className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
