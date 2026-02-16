
import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import Add from "./pages/auth/Add";
import Edit from "./pages/auth/Edit";
import AddUser from "./pages/auth/AddUser";
import ListCategory from "./pages/auth/ListCatergory";
import ListProduct from "./pages/auth/ListProduct";
import DetailProduct from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";




export default function App() {
  return (
   
   <div className="p-5">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<DetailProduct/>} />
        </Routes>
    </BrowserRouter>
   </div>
  
  );
}
