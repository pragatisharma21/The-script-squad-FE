import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  AiOutlineMenu,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
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

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="w-full max-w-screen-2xl mx-auto rounded-xl py-2 px-8 shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border-white/80 bg-black !text-white sticky z-50 border-0">
      <div className="container flex items-center justify-between mx-auto">
        <Link
          to={"/dashboard"}
          className="block antialiased font-sans text-blue-gray-900 text-lg font-bold"
        >
          <img className="w-10 h-10" src="/logo.png" alt="Logo" />
        </Link>
        <div className="items-center hidden gap-6 lg:flex">
          <Link to="/cart">
            <AiOutlineShoppingCart className="w-6 h-6 cursor-pointer" />
          </Link>
          <Link to="/wishlist">
            <AiOutlineHeart className="w-6 h-6 cursor-pointer" />
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-7 h-7 cursor-pointer">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-3 px-3 pt-3 pb-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Separator />
                <DropdownMenuItem asChild className="px-5">
                  <Link to="/profile" className="p-2">
                    Profile
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">Sign In</Link>
          )}

          <ThemeToggle />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden">
              <AiOutlineMenu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-background">
            <div className="pt-6 flex flex-col items-center gap-4">
              {user && (
                <>
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <p className="text-lg font-semibold">{user.name}</p>

                  <p className="text-sm text-gray-500">{user.email}</p>

                  <Separator className="w-full my-2" />

                  <Link
                    to="/profile"
                    className="w-full text-center p-2 rounded-md "
                  >
                    Profile
                  </Link>
                </>
              )}

              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
