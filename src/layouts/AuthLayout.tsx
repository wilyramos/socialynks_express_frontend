import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Logo from "../components/Logo";

export default function AuthLayout() {
    return (
        <>
            <div className="min-h-screen">
                <div className="max-w-md mx-auto">
                    <Logo />
                    <div className="py-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Toaster 
                richColors
                position="top-right" 
            />
        </>

    )
}
