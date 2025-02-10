import AdminNavigation from "./nav/AdminNavigation";
import { useLocation } from "react-router-dom";
import HomeNavigation from "./nav/HomeNavigation";
import Logo from "./Logo";


export default function Header() {
    const location = useLocation();


    return (
        <header className="bg-gray-100 py-1">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between px-4 sm:px-6 lg:px-8">
                <div className="w-full p-5 lg:p-0 md:w-1/3">
                    <Logo   
                    />
                </div>
                {/* <NavigationTabs /> */}
                <nav className="md:w-1/3 md:flex md:justify-end ">
                    {location.pathname === "/" ? <HomeNavigation /> : <AdminNavigation />}       
                </nav>
            </div>
        </header>
    )
}
