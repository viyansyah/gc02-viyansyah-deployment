import { useEffect, useState } from "react";
import axios from 'axios'
import giftLoading from "../../assets/Loading.svg"
import { Link } from "react-router";
import BaseUrl from "../constant/BaseUrl";

export default function ListProduct(){
    const [product,setProduct]=useState([])
    const [loading,setLoading]=useState(true)
    const currentUserId=Number(localStorage.getItem("userId"))
    const currentRole=localStorage.getItem("role")
    
    
    async function fetchProducts() {
      try {
        setLoading(true)
        const {data}=await axios.get(`${BaseUrl}/products?`,{
          headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        
        
        setProduct(data)
      
        
      } catch (error) {
        console.log(error);
        

      }finally{
        setLoading(false)
    }

  }
  async function handleDelete(id) {
        try {
            const{data}=await axios.delete(`${BaseUrl}/products/${id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            fetchProducts()
            
        } catch (error) {
            console.log(error);
            
        }
        
    }
  async function handleUpload(e,id){
    try {
      const formData=new FormData()
      formData.append("imgUrl",e.target.files[0])
    

      const {data}=await axios.patch(`${BaseUrl}/products/${id}/upload`,formData,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
          "Content-Type":"multipart/form-data"
        }
      })
    
      
      fetchProducts()
      
    } catch (error) {
        error
    }
    

  }
  
  useEffect(()=>{
    fetchProducts()
  },[])
    return (
        <>
          {loading ? (
            <div className="flex justify-center items-center">
              <img src={giftLoading} className="w-1/3" />
            </div>
          ):(
  
            <div className="px-6 py-6">
              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold">List Products</h1>
                  <Link to="/add" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Add Product</Link>

                </div>
                <div className="overflow-x-auto">
                  <table className="border-collapse border text-sm border-gray-400 min-w-full">
                      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                          <tr>
                              <th className="border border-gray-300 px-4 py-2" >Name</th>
                              <th className="border border-gray-300 px-4 py-2" >Description</th>
                              <th className="border border-gray-300 px-4 py-2" >Price</th>
                              <th className="border border-gray-300 px-4 py-2" >Stock</th>
                              <th className="border border-gray-300 px-4 py-2" >ImageUrl</th>
                              <th className="border border-gray-300 px-4 py-2" >CategoryId</th>
                              <th className="border border-gray-300 px-4 py-2" >Action</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y">
                          {product.map((e)=>(
                          <tr key={e.id}>
                              <td className="border border-gray-300 px-4 py-2">{e.name}</td>
                              <td className="border border-gray-300 px-4 py-2">{e.description}</td>
                              <td className="border border-gray-300 px-4 py-2">{e.price}</td>
                              <td className="border border-gray-300 px-4 py-2">{e.stock}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                <div className="flex items-center gap-3">
                                  <img className="w-40 h-40 object-cover rounded-md border" src={e.imgUrl} />
                                  <label className="px-2 py-1 text-xs rounded-md bg-yellow-300 hover:bg-yellow-500 border-black object-cover">
                                    <i className="fa-upload fa-solid"></i>
                                   
                                    <input type="file" className="hidden" onChange={(ev)=>handleUpload(ev,e.id)} />
                                  </label>
                                </div>
                              </td>
                              <td className="border border-gray-300 px-4 py-2">{e.categoryId}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                {(e.userId===currentUserId || currentRole==="Admin") ? (
                                  <div className="flex gap-2">
                                    <Link to={`/edit/${e.id}`} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" ><i className="fa-solid fa-edit text-sm"></i> </Link>
                                    <a className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer" onClick={() => handleDelete(e.id)} ><i className="fas fa-trash text-sm"></i> </a>
                                  </div>
                                ) : <span className="text-sm font-bold">Not Your Product</span>}
                              </td>
                          </tr>
                          ))}
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            )
          }
        </>
    )
}