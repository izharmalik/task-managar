import "./App.css";
import { AllRoutes } from "./Routes";
import { useAppContext } from "./Store/store.jsx";
import { ToastAlert } from "./App/Common/UI/ToasterAlert";

function App() {
  const { authContext } = useAppContext();

  return (
    <>
      <ToastAlert />
      <AllRoutes userAuth={authContext?.isAuthenticated} />
    </>
  );
}

export default App;
