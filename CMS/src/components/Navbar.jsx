import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
    const role=localStorage.getItem("role")
    const navigate=useNavigate()
    function HandleLogout(){
        localStorage.clear()
        navigate("/")
    }
  return (
    <nav className="sticky top-0 z-50 w-full border-2 rounded-xl bg-yellow-300">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col gap-1">
        <NavLink to="/products" className={({ isActive }) =>
            isActive ? "text-4xl  font-bold px-6 cursor-pointer underline" : "text-4xl font-bold px-6 cursor-pointer"
        }>
            <span>Home</span>
        </NavLink>
        <div className="flex gap-2 px-6">
        <NavLink to="/categories" className={({ isActive }) =>
            isActive ? "text-xl font-medium  cursor-pointer underline" : "text-xl font-medium cursor-pointer"
        }>
            <span>Category</span>
        </NavLink>
        {role==="Admin" &&(
        <NavLink to="/addUser" className={({ isActive }) =>
            isActive ? "text-xl font-medium  cursor-pointer underline" : "text-xl font-medium cursor-pointer"
        }>
            <span>Add User</span>
        </NavLink>
        )}
        </div>
        </div>
        <button className="rounded-lg bg-blue-500 cursor-pointer px-4 py-2 text-sm text-white" onClick={HandleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
