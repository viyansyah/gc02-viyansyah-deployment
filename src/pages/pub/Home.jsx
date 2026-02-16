import { useEffect, useState } from "react";
import Card from "../../components/Card";
import giftLoading from "../../assets/Loading.svg"
import Logo from "../../assets/OKEI.png"
import axios from 'axios'
import BaseUrl from "../../constant/BaseUrl"
import { Link } from "react-router";


export default function Home() {

  const [product,setProduct]=useState([]);
  const [loading,setLoading]=useState(false)
  const [search,setSearch]=useState("")
  const [totalPage,setTotalPage]=useState(0)
  const [currentPage,setCurrentPage]=useState(1)
  const [category,setCategory]=useState("")
  const pagination=HandlePage()

  async function fetchProducts() {
    try {
      setLoading(true)
      const {data}=await axios.get(`${BaseUrl}/pub/products?search=${search}&page=${currentPage}&categoryId=${category}&order`)
      console.log(data);
      
      setProduct(data.data)
      setTotalPage(data.pagination.totalPage)
      setCurrentPage(data.pagination.currentPage)
      
    } catch (error) {
      console.log(error);
      

    }finally{
      setLoading(false)
    }

  }
    useEffect(()=>{
      
      fetchProducts()
    },[currentPage,category])

  function HandleSearch(e){
    e.preventDefault()
    fetchProducts()
  }
  function HandlePage(){
    const result=[]
    for (let i = 1; i <= totalPage; i++) {
        result.push(i)
      
    }
    return result
  }
    
   

  return (
    <div className="min-h-screen items-center">
      <nav className="sticky top-0 z-50 border-b bg-white  py-2">
        <div className="mx-auto flex max-w-7xl gap-6  px-2">
        <Link to="/">
          <img src={Logo} alt="OKEI" className="size-30" />
        </Link>

        
          <form onSubmit={HandleSearch} className="flex-1  items-center  py-5">
            <input 
            type="text"
            id="search"
            placeholder="Cari..." 
            className="w-full mb-2 rounded-full border px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setSearch(e.target.value)}
            />
        
            <select onChange={(e)=>setCategory(e.target.value)} className="text-sm  px-2 py-3">
              <option value="1">Furniture</option>
              <option value="2">Home Decor</option>
              <option value="3">Storage & Lighting</option>
            </select>

          </form>
        </div>
      </nav>
      {loading ? (
        <>
        <div className="flex justify-center items-center">
          <img src={giftLoading} className="w-1/3" />
        </div>
        
        </>
      ):(
      <div className="grid p-5 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {product.map(p=>( 
            <Card key={p.id} product={p}/>
          ))}
      </div>)}
      
      <div className="flex justify-center gap-3 py-5">
        <button 
        className="rounded-lg border px-4 py-2 text-sm"
        disabled={currentPage===1}
        onClick={()=>setCurrentPage(p=>p-1)}
        >
          Prev
        </button>
        <div>
          {pagination.map((el)=>{
            return (
        <button
          className={el===currentPage ? "font-extrabold text-blue-700 px-2 py-2 text-lg": "px-2 py-2 text-lg"}
          onClick={()=>setCurrentPage(el)}
        >
          {el}
        </button>
            )
          })}
        </div>
        

        <button
         
          className="rounded-lg border px-4 py-2 text-sm"
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(p => p + 1)}
        >
          Next
        </button>
      </div>
        
    </div>

    )
}
