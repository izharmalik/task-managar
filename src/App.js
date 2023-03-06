import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AllRoutes } from "./Routes";
import { useAppContext } from "./Store/store.jsx";
import { Toast } from "bootstrap";
import { ToastAlert } from "./App/Common/UI/ToasterAlert";

function App() {
  const { authContext } = useAppContext();

  return (
    <BrowserRouter>
      <ToastAlert />
      <AllRoutes userAuth={authContext?.isAuthenticated} />
    </BrowserRouter>
  );
}

export default App;
