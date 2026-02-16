
import { BrowserRouter, Routes, Route } from "react-router";
import DetailProduct from "./pages/Detail";
import Home from "./pages/Home";


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
