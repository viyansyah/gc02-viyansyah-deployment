
import Logo from "../../src/assets/OKEI.png"
import axios from 'axios'
import BaseUrl from "../constant/BaseUrl"
import { useEffect, useState } from "react"
import { useParams,Link} from "react-router"



    export default function DetailProduct(){
        const {id}=useParams()
        const [product,setProduct]=useState({})
        async function fetchProducts() {
        try {
       
        const {data}=await axios.get(`${BaseUrl}/pub/products/${id}`)
        console.log(data);
        
        setProduct(data)
        
        } catch (error) {
        console.log(error);
        

        }

    }

    useEffect(()=>{
        fetchProducts()
    },[id])


    return (
        <>
    <div className="min-h-screen w-full  items-center">
      <nav className="border-b bg-white  py-2">
        <div className="mx-auto flex max-w-7xl gap-6  px-2">
        <Link to="/">
          <img src={Logo} alt="OKEI" className="size-30" />
        </Link>

        
          <form onSubmit="{HandleSearch}" className="flex-1 items-center gep-2 py-8">
            <input 
            type="text"
            id="search"
            placeholder="Cari..." 
            className="w-full rounded-full border px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setSearch(e.target.value)}
            />
        
            <select onChange={(e)=>setCategory(e.target.value)} className="text-sm px-4 py-5">
              <option value="1">Furniture</option>
              <option value="2">Home Decor</option>
              <option value="3">Storage & Lighting</option>
            </select>

            <select name="" id="" className="text-sm px-5 py-2">
              <option value="">HARGA</option>
            </select>
          </form>
        </div>
      </nav>
      <div className="bg-gray-200 min-h-screen py-12 justify-center ">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
                <div className="p-6 bg-white flex items-center justify-center">
                    <div className="rounded-2xl border-2">
                        <img src={product.imgUrl}
                        className="w-full object-cover rounded-2xl h-[500px" />
                    </div>
                </div>
                <div className="p-8 flex flex-col">
                    <h1 className="text-3xl mb-1 font-semibold">
                        {product.name}
                    </h1>
                    <p className="text-lg text-blue-600 mb-6 font-semibold">
                        {product.price}
                    </p>
                    <div className="text-grey-700 leading-relaxed space-y-1">
                        <p>{product.description}</p>
                    </div>
                <div className="mt-35">
                    <Link to="/" className="inline-block px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition">BACK</Link>
                </div>
                </div>
            </div>
        </div>
            
      </div>
    </div>
        </>
    )
}