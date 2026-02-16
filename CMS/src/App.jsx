
import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from "./pages/BaseLayout";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import AddUser from "./pages/AddUser";
import ListCategory from "./pages/ListCatergory";
import ListProduct from "./pages/ListProduct";
import Login from "./pages/Login";



export default function App() {
  return (
   
   <div className="p-5">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
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
