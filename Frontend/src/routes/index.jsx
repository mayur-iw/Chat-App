import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../Pages/RegisterPage";
import CheckEmail from "../Pages/CheckEmail";
import CheckPassword from "../Pages/CheckPassword";
import Home from "../Pages/Home";
import MessagePage from "../component/MessagePage";
import Logo from "../layout/Logo";

const router = createBrowserRouter([
    {
        path:"/",
        element : <App/>,
        children:[
            {
                path:"register",
                element:<Logo><RegisterPage /></Logo>
            },
            {
                path:"email",   
                element:<Logo><CheckEmail /></Logo>
            },
            {       
                path:"password",
                element:<Logo><CheckPassword /></Logo>
            },
            {
                path:"",
                element:<Home />,
                children:[
                    {
                        path:":userId",
                        element:<MessagePage />
                    }
                ]
            }
        ]
    }
])

export default router;