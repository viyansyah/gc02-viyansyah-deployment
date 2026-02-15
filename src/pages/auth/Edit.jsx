import { useParams } from "react-router"
import Form from "../../components/Form"
import { useEffect, useState } from "react"
import axios from 'axios'
import BaseUrl from "../../constant/BaseUrl"
import { useNavigate } from "react-router";
import Toastify from "toastify-js"

export default function Edit(){
    const {id}=useParams()
    const [product,setProduct]=useState("")
    const navigate=useNavigate()
    async function fetchProducts() {
    try {
      const {data}=await axios.get(`${BaseUrl}/products/${id}`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      
      
      setProduct(data)
      
      
      
    } catch (error) {
      console.log("AXIOS ERROR:", error);

    }
    
    }
    async function handleSubmit(e,name,description,price,stock,imgUrl,categoryId) {
        e.preventDefault()
        try {
            const{data}=await axios.put(`${BaseUrl}/products/${id}`,{
                name,description,price,stock,imgUrl,categoryId
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            navigate('/products')
             Toastify({
                            text: "Sukses Update products",
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
    
    

    useEffect(()=>{
        fetchProducts()
    },[])

    return (
        <>
        <Form product={product} handleSubmit={handleSubmit} nameProps={"Edit Products"} />
        </>
    )
}