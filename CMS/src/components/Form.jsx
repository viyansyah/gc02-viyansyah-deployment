import { useEffect, useState } from "react"
import axios from 'axios'
import BaseUrl from "../constant/BaseUrl"
import SubmitButton from "./SubmitButton"


export default function Form({handleSubmit,product,nameProps}){
    const [category,setCategory]=useState([])
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState(0)
    const [stock,setStock]=useState(0)
    const [imgUrl,setImgUrl]=useState("")
    const [categoryId,setCategoryId]=useState(0)
    
    
   

     async function fetchCategories() {
    try {
        
     
      const {data}=await axios.get(`${BaseUrl}/categories`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
   
      
      setCategory(data)
    } catch (error) {
      console.log(error);
      

    }

  }
    useEffect(()=>{
        fetchCategories()

        if(product){
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setStock(product.stock)
            setImgUrl(product.imgUrl)
            setCategoryId(product.categoryId)
        }
    },[product])

    

    return (
        <>
         <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
            <div className="w-full border-3 border-black bg-blue-500 p-10 rounded-3xl shadow-xl">
                <h1 className="text-2xl text-center font-bold">
                    {nameProps}
                </h1>
                <form className="grid grid-cols-2 gap-6 mb-3 p-3" onSubmit={(e)=>handleSubmit(e,name,description,price,stock,imgUrl,categoryId)}>
                        <div>
                            <label className="block font-semibold mb-2">Name</label>
                            <input type="text" placeholder="Enter Name..." value={name}
                            className="w-full rounded-lg p-3 border-2 bg-white border-black outline-none" onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Description</label>
                            <input type="text" placeholder="Enter Description..."
                            className="w-full rounded-lg p-3 border-2 bg-white border-black outline-none" value={description}
                            onChange={(e)=>setDescription(e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Price</label>
                            <input type="number" placeholder="Enter Price..."
                            className="w-full rounded-lg p-3 border-2 bg-white border-black outline-none"
                            onChange={(e)=>setPrice(+e.target.value)} value={price} />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Stock</label>
                            <input type="number" value={stock} placeholder="Enter Stock..."
                            className="w-full rounded-lg p-3 border-2 bg-white border-black outline-none"
                            onChange={(e)=>setStock(+e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Image Url</label>
                            <input type="text" value={imgUrl} placeholder="Enter Image Url..."
                            className="w-full rounded-lg p-3 border-2 bg-white border-black outline-none"
                            onChange={(e)=>setImgUrl(e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Category</label>
                            <select name="category" value={categoryId} className="w-full rounded-lg p-3 border-2 bg-white border-black outline-none"
                            onChange={(e)=>setCategoryId(+e.target.value)}>
                                <option value="">-- Select Category --</option>
                                {category.map(e=>(
                                <option className="text-bold" key={e.id} value={e.id}>{e.name}</option>
                                    
                                ))}

                            </select>
                        </div>
                        <div className="col-span-2">
                             <SubmitButton text={nameProps} className="w-full bg-black text-white rounded-2xl py-3 font-semibold hover:bg-gray-500" />   
                        </div>
                    
                </form>

            </div>
        </div>
        </>
    )
}