import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Register from '@/pages/Register'
import DashBoard from '@/pages/DashBoard'
import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom"
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Header from "@/components/shared/Header";
import LogoutAndHome from "@/pages/LogoutAndHome";


function App() {
    return (
        <BrowserRouter>
            <LayoutController />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<LogoutAndHome />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashBoard />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

function LayoutController() {
    const { pathname } = useLocation()
    const hideHeaderRoutes = ["/login/", "/register/", '/login', '/register']
    return hideHeaderRoutes.includes(pathname) ? null : <Header />
}

export default App;
