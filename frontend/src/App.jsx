import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Register from '@/pages/Register'
import DashBoard from '@/pages/DashBoard'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import {Logout} from "@/auth";

function LogoutAndHome(){
    Logout()
    return <Navigate to='/'/>
}


function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<LogoutAndHome/>}/>
                <Route path="/register" element={<Register />}/>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashBoard/>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;