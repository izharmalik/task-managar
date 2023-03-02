import "./App.css";
import { Layout } from "./component/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./component/auth/login";
import { Register } from "./component/auth/register";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
