import axios from "axios"
import { useEffect, useState } from "react"
import BaseUrl from "../constant/BaseUrl"
import { useNavigate } from "react-router"
import Toastify from "toastify-js"
import SubmitButton from "../components/SubmitButton"



export default function AddUser(){
    const [username,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [phoneNumber,setPhoneNumber]=useState(0)
    const [address,setAddress]=useState("")
    const navigate=useNavigate()
    const role=localStorage.getItem("role")

    async function HandleSubmit(e) {
            e.preventDefault()
        try {
            const {data}=await axios.post(`${BaseUrl}/users/add-user`,{
                username,email,password,phoneNumber,address
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            
            
            
            Toastify({
                            text:"Sukses Add User ",
                            duration: 3000,
                            close: true,
                            gravity: "top",
                            position: "center",
                            style: {
                            background: "linear-gradient(to right, #ef4444, #dc2626)",
                            },
                        }).showToast();
            navigate("/products")
            
        } catch (error) {
            Toastify({
                            text: error.response.data.message,
                            duration: 3000,
                            close: true,
                            gravity: "top",
                            position: "center",
                            style: {
                            background: "linear-gradient(to right, #ef4444, #dc2626)",
                            },
                        }).showToast();
        }
    }
    useEffect(()=>{
        if(role !== "Admin"){
            navigate("/products")
        }
    },[])
    


    return (
        <>
        <div className="min-h-screen flex items-start px-10 justify-center py-10 bg-gray-100 ">
        <div className="w-full rounded-xl bg-white p-10 px- border-2 shadow-xl">
            <h1 className="mb-8 text-center text-2xl font-semibold text-blue-600">
                Add User
            </h1>
            <form onSubmit={HandleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                <div >
                    <label className="mb-2 block font-medium text-gray-400">
                        Username
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter your username"
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>setUserName(e.target.value)}
                        />
                </div>
                <div >
                    <label className="mb-2 block font-medium text-gray-400">
                        Email Address 
                    </label>
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                </div>
                <div >
                    <label className="mb-2 block font-medium text-gray-400">
                        Password
                    </label>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                </div>
                <div >
                    <label className="mb-2 block font-medium text-gray-400">
                        Phone Number 
                    </label>
                    <input 
                        type="number" 
                        placeholder="Enter your phone"
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>setPhoneNumber(+e.target.value)}
                        />
                </div>
                
                <div className="col-span-2">
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-400">
                        Address
                    </label>
                    <input 
                        type="text" 
                        placeholder="enter your address"
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={(e)=>setAddress(e.target.value)}
                        />
                </div>
                <SubmitButton text="Add" className="col-span-2 w-full rounded-lg bg-slate-300 font-medium px-6 py-2 mb-6 flex cursor-pointer  items-center  justify-center hover:bg-blue-700 hover:text-white transition"/>
             
            </form>
        
        </div>
    </div>
        
        </>
    )
}