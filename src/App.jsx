
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/pub/Home";
import BaseLayout from "./pages/BaseLayout";
import Login from "./pages/auth/login";
import Add from "./pages/auth/Add";
import Edit from "./pages/auth/Edit";
import AddUser from "./pages/auth/AddUser";
import ListCategory from "./pages/auth/ListCatergory";
import ListProduct from "./pages/auth/ListProduct";
import DetailProduct from "./pages/pub/detail";




export default function App() {
  return (
   
   <div className="p-5">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<DetailProduct/>} />
         <Route element={<BaseLayout />}>
          <Route path="/add" element={<Add/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/addUser" element={<AddUser/>} />
          <Route path="/categories" element={<ListCategory/>} />
          <Route path="/products" element={<ListProduct/>} />

        </Route>
      </Routes>
    </BrowserRouter>
   </div>
  
  );
}
