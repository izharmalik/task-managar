import { Route, Routes } from "react-router-dom";

import { Layout } from "./component/layout";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;
