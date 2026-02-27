import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetCurrentUser } from "@/auth.js";
import { Button } from "@/components/ui/button";
import { House, UserRound, LogIn } from "lucide-react";

function Header() {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        GetCurrentUser()
            .then((response) => setUsername(response.data?.username ?? null))
            .catch(() => setUsername(null));
    }, [location.pathname]);

    return (
        <header className="min-w-full h-16 fixed top-0">
            <div className="max-w-6xl mx-auto grid grid-cols-3 place-items-center h-full px-4">
                <Button variant="secondary" onClick={() => navigate("/")}>
                    <House /> Home
                </Button>

                <div className="text-xl font-bold">MIREA</div>

                {username ? (
                    <Button onClick={() => navigate("/dashboard")}>
                        {username}
                        <UserRound />
                    </Button>
                ) : (
                    <Button onClick={() => navigate("/login")}>
                        Login
                        <LogIn />
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Header;