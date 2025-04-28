import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import OwnerBoard from "../Dashboard/OwnerBoard/OwnerBoard";
import Root from "../Dashboard/Root/Root";
import AddUser from "../Authentication/AddUser/AddUser";
import LogIn from "../Authentication/LogIn/LogIn";
import PrivateRoute from "./PrivateRoute";
import Businesses from "../Dashboard/OwnerBoard/Businesses";
import Managers from "../Dashboard/OwnerBoard/Managers";
import Employees from "../Dashboard/OwnerBoard/Employees";
import Chat from "../Dashboard/OwnerBoard/Chat";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage/>,
        errorElement:<h1 className="text-3xl text-center">Error Page</h1>
    },
    {
        path:"signup",
        element:<AddUser/>
    },
    {
        path:"login",
        element:<LogIn/>
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children:[
            {
                path:"",
                element:<Root/>
            },
            {
                path:'owner',
                element:<OwnerBoard/>
            },
            {
                path:'businesses',
                element: <Businesses />
            },
            {
                path:'managers',
                element: <Managers />
            },
            {
                path:'employees',
                element: <Employees />
            },
            {
                path:'chat',
                element: <Chat />
            },
        ]
    }
])