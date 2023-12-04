import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import SignUp from "./components/SignUp";
import Login from "./components/LogIn";
import ProductInfo from "./components/ProductInfo";
import CartPage from "./components/CartPage";
import ManagementDashboard from "./components/adminPage/ManagementDashBoard";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/products/:_id" element={<ProductInfo/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/admin" element={<ManagementDashboard/>}/>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
