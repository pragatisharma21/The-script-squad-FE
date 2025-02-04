import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AiOutlineMenu, AiOutlineFileText } from "react-icons/ai";
import { FiBook, FiUser, FiGrid } from "react-icons/fi";


const navItems = [
  { name: "Pages", icon: <FiBook className="w-5 h-5" />, href: "#" },
  { name: "Account", icon: <FiUser className="w-5 h-5" />, href: "#" },
  { name: "Blocks", icon: <FiGrid className="w-5 h-5" />, href: "#" },
  { name: "Docs", icon: <AiOutlineFileText className="w-5 h-5" />, href: "#" },
];

const Navbar = () => {
  return (
    <nav className="w-full max-w-screen-2xl mx-auto rounded-xl py-4 px-8 shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border-white/80 bg-black !text-white sticky z-50 border-0">
      <div className="container flex items-center justify-between mx-auto">
        <p className="block antialiased font-sans text-blue-gray-900 text-lg font-bold">
         <img className="w-10 h-10" src="/logo.png" alt="" />
        </p>

        {/* Desktop Navigation */}
        <ul className="items-center hidden gap-8 ml-10 lg:flex">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium"
              >
                {item.icon}
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="items-center hidden gap-4 lg:flex">
          <SignedOut>
            <SignInButton />
          </SignedOut>
         <SignedIn>
         <UserButton />
         </SignedIn>
        </div>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="lg:hidden">
              <AiOutlineMenu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-white">
            <div className="p-6">
              <p className="text-lg font-bold text-gray-900">Menu</p>
              <ul className="mt-4 space-y-4">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-center gap-2 text-gray-900 hover:text-gray-600"
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
