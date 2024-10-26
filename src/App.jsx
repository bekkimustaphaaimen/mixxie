import { Routes, Route } from "react-router-dom";
import Orders from "./assets/pages/Orders";
import Products from "./assets/pages/Products";
import LoginPage from "./assets/pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/products" element={<Products />}></Route>
    </Routes>
  );
};

export default App;
