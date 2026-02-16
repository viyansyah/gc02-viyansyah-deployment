import { useState } from "react"
import axios from 'axios'
import BaseUrl from "../constant/BaseUrl"
import { useNavigate } from "react-router"
import Toastify from 'toastify-js'


export default function Login (){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()


    async function HandleLogin(e) {
        e.preventDefault()
        try {
         const {data}=await axios.post(`${BaseUrl}/users/login`,{
            email,password
         })
       
         
         localStorage.setItem("userId", data.payload.id)  
         localStorage.setItem("role", data.payload.role)  
         localStorage.setItem("token",data.access_token)
         navigate("/products")
            Toastify({
                text: "Sukses Login",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                style: {
                background: "linear-gradient(to right, #ef4444, #dc2626)",
                },
            }).showToast();
            
            
            
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
    return(
    <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full border max-w-md rounded-3xl bg-white px-8 py-6 shadow-xl">
            <h1 className="mb-8 text-center text-2xl font-semibold text-blue-600">
                Login
            </h1>
            <form onSubmit={HandleLogin}>
                <div className="mb-3">
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-400">
                        Email Address 
                    </label>
                    <input 
                        type="email" 
                        placeholder="Enter your email"
                        autoComplete="current-email"
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-400">
                        Password
                    </label>
                    <input 
                        type="password" 
                        placeholder="enter your password"
                        autoComplete="current-email"
                        className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button className="w-full rounded-lg bg-slate-300 font-medium px-6 py-2 mb-6 flex cursor-pointer  items-center  justify-center hover:bg-blue-700 hover:text-white transition">Sign</button>
             
            </form>
        
        </div>
    </div>

    )
}