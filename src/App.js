import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Products from "./components/Products";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/products" element={<Products />}/>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
