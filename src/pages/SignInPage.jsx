import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLogin } from "@react-oauth/google";
import ThemeToggle from "@/components/custom/ThemeToggle";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = (response) => {
    const data = jwtDecode(response?.credential);
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-5">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Google login failed")}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full">Login</Button>
          </div>
          <div className="text-center mt-4">
            <p>
              Dont have an account? <Link to={"/sign-up"} className="text-blue-500">Sign Up</Link>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
