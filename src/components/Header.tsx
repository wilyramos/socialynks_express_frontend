import AdminNavigation from "./nav/AdminNavigation";
import { useLocation } from "react-router-dom";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";


export default function Header() {
    const location = useLocation();


    if (location.pathname === "/") {
        return (
            <header className="bg-gray-100 py-2">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between px-4 sm:px-6 lg:px-8">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <Logo
                        />
                    </div>
                    <nav className=" md:flex md:justify-end ">
                        <HomeNavigation />
                    </nav>
                </div>
            </header>
        )
    }
    return (
        <header className="mx-auto max-w-5xl flex flex-col items-center bg-gray-100 w-full sm:w-1/5 h-auto sm:h-svh sm:absolute">
            <div className="flex flex-col items-center">
                <div className="p-5">
                    <Logo />
                </div>
                <nav className="w-full">
                    <AdminNavigation />
                </nav>
            </div>
        </header>
    )
}
