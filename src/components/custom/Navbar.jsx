import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  AiOutlineMenu,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineHome,
} from "react-icons/ai";
import { PiUserCircleLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useBook } from "@/context/BookContext";
import { CiLogout } from "react-icons/ci";

const NAV_ITEMS = [
  { name: "Home", path: "/dashboard", icon: <AiOutlineHome className="w-6 h-6" /> },
  { name: "Wishlist", path: "/wishlist", icon: <AiOutlineHeart className="w-6 h-6" /> },
];

const Navbar = () => {
  const { user, userData, logout } = useAuth();
  const [userFields, setUserFields] = useState({});
  const { cart } = useBook();

  useEffect(() => {
    if (userData) {
      setUserFields(userData);
    }
  }, [userData]);

  return (
    <nav className="w-full mx-auto rounded-xl py-2 px-8 shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border bg-black !text-white sticky z-50">
      <div className="container flex items-center justify-between mx-auto">
        <Link to={"/dashboard"} className="block font-sans text-lg font-bold">
          <img className="w-10 h-10" src="/logo.png" alt="Logo" />
        </Link>

        {/* Desktop Nav Items */}
        <div className="items-center hidden gap-6 lg:flex relative">
          {user && userData?.userType !== "ADMIN" &&
            NAV_ITEMS.map((item) => (
              <Link key={item.name} to={item.path}>{item.icon}</Link>
            ))}
          
          {/* Cart Icon with Badge */}
          {user && userData?.userType !== "ADMIN" && (
            <Link to="/cart" className="relative">
              <AiOutlineShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {user && userData ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-7 h-7 cursor-pointer">
                  <AvatarImage src={userFields.profileImage} alt={userFields.name} />
                  <AvatarFallback>{userFields.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-3 px-3 pt-3 pb-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={userFields.profileImage} alt={userFields.name} />
                    <AvatarFallback>{userFields.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{userFields.name}</p>
                    <p className="text-xs text-gray-500">{userFields.email}</p>
                  </div>
                </div>
                <Separator />
                <DropdownMenuItem asChild className="px-5 py-2">
                  <Link to="/profile" className="p-2">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">Sign In</Link>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden">
              <AiOutlineMenu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-background">
            <div className="pt-6 flex flex-col items-start gap-4">
              {user && userData && (
                <>
                  <div className="flex flex-col justify-center w-full items-center gap-2">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={userFields.profileImage} alt={userFields.name} />
                      <AvatarFallback>{userFields.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-semibold">{userFields.name}</p>
                    <p className="text-sm text-gray-500">{userFields.email}</p>
                  </div>
                  <Separator className="w-full my-2" />
                  {NAV_ITEMS.map((item) => (
                    <Link key={item.name} to={item.path} className="flex items-center gap-2 p-2 rounded-md">
                      {item.icon} {item.name}
                    </Link>
                  ))}
                  <Link to="/cart" className="flex items-center gap-2 p-2 rounded-md">
                    <AiOutlineShoppingCart className="text-2xl" /> Cart ({cart.length})
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 p-2 rounded-md">
                    <PiUserCircleLight className="text-2xl" /> Profile
                  </Link>
                  <div onClick={() => logout()} className="cursor-pointer p-2 flex items-center gap-2">
                  <CiLogout className="text-2xl" /> Sign Out
                  </div>
                </>
              )}
             <div className="ml-2 mt-1 sm:mt-0 sm:ml-0">
             <ThemeToggle text="Theme" />
             </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
