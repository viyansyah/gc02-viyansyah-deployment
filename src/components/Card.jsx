import { Link } from "react-router";
import axios from "axios";
import BaseUrl from "../constant/BaseUrl";


export default function Card({product}) {
  return (
   <div className="h-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
    <img src={product.imgUrl} alt={product.name} className="h-44 w-full object-cover rounded-2xl" />

    <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm mb-3 line-clamp-2 ">
            {product.description}
        </p>
        <div className="mt-auto flex justify-between items-center cursor-pointer">
            <p className="font-medium text-gray-900 text-lg">Rp {Number(product.price).toLocaleString("id-ID")}</p>
            <Link to={`/detail/${product.id}`} className="text-blue-600 ">Detail</Link>
        </div>
        

    </div>
   </div>
  );
}
