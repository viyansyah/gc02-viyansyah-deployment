import { useEffect, useState } from "react";
import axios from 'axios'
import giftLoading from "../../assets/Loading.svg"
import { Link } from "react-router";
import BaseUrl from "../constant/BaseUrl";



export default function ListCategory(){
    const [loading,setLoading]=useState(false)
    const [category,setCategory]=useState([])

    async function fetchCategory() {
        try {
        setLoading(true)
        const {data}=await axios.get(`${BaseUrl}/categories`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        
        
        setCategory(data)
        
        }catch (error) {
        console.log(error);

        }finally{
        setLoading(false)
        }
    }
    useEffect(()=>{
        fetchCategory()
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
                  <h1 className="text-2xl font-bold">List Categories</h1>
                  <Link to="/add" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Add Product</Link>

                </div>
                <div className="overflow-x-auto">
                  <table className="border-collapse border text-sm border-gray-400 min-w-full">
                      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                          <tr>
                              <th className="border border-gray-300 px-4 py-2" >Name</th>
                              
                          </tr>
                      </thead>
                      <tbody className="divide-y">
                          {category.map((e)=>(
                          <tr key={e.id}>
                              <td className="border border-gray-300 px-4 py-2">{e.name}</td>
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