import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "@/api";
import { useState, useEffect } from "react";
import {Spinner} from "@/components/ui/spinner.jsx";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        try {
            const res = await api.post("/auth/token/refresh/");
            if (res.status === 200) {
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = await api.post("/auth/token/refresh/");
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token.data.access);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return (
            <div className="bg-muted flex items-center justify-center min-h-screen min-w-screen">
                <Spinner className="size-15"/>
            </div>
        )
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;