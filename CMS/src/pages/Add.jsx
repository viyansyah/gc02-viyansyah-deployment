import Form from "../components/Form";
import axios from 'axios'
import BaseUrl from "../constant/BaseUrl"
import { useNavigate } from "react-router";
import Toastify from "toastify-js"


export default function Add(){
    const navigate=useNavigate()
    async function handleSubmit(e,name,description,price,stock,imgUrl,categoryId) {
        e.preventDefault()
        try {
            const{data}=await axios.post(`${BaseUrl}/products`,{
                name,description,price,stock,imgUrl,categoryId
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            navigate('/products')
             Toastify({
                            text: "Sukses Menambahkan products",
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

    return (
        <>
        <Form handleSubmit={handleSubmit} nameProps={"Add products"}/>
        </>
    )
}