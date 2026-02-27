import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Logout} from "@/auth.js";

function LogoutAndHome() {
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            await Logout();
            navigate("/", { replace: true });
        })();
    }, [Logout, navigate]);

    return null;
}

export default LogoutAndHome;