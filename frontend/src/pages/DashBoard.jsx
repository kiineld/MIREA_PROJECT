import {useEffect, useState} from "react";
import {GetCurrentUser, Logout} from "@/auth.js";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";



function DashBoard(){
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetCurrentUser()
            .then(res => setUser(res.data))
    }, []);


    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm flex justify-around items-center flex-col">
                <h1>Hello, {user.username}!</h1>
                <Button onClick={
                    function (){
                        Logout()
                        navigate('/')
                    }
                }>Logout</Button>
            </div>
        </div>
    )
}

export default DashBoard;