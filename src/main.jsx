import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <BookProvider>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
