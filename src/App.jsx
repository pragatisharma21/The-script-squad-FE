import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import UserProfile from "./pages/UserProfile";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <>

     <AllRoutes/>
    

      <AllRoutes />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

    </>
  );
}

export default App;
