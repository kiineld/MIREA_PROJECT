import {Button} from "@/components/ui/button";

function Home(){
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm flex justify-around items-center">
                <Button variant="outline" size="lg">
                    <a href="/login">Login</a>
                </Button>
                <Button variant="default" size="lg">
                    <a href="/register">Register</a>
                </Button>
            </div>
        </div>
    )
}

export default Home;
