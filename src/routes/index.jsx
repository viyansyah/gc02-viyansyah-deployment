import { createBrowserRouter } from "react-router";
import Home from "../pages/pub/Home";
import App from "../App";

export const router =createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:{
            index:true,
            element:<Home/>
        }
    }
])
