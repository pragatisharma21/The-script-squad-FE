import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <>
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
