import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Categories from "./categories/categories.jsx";
import Dashboard from "./transaction/dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/ingredients" element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
