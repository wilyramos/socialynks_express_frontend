import { useQueryClient } from "@tanstack/react-query";
import NavigationTabs from "../NavigationTabs";
import { PowerIcon } from '@heroicons/react/20/solid';

export default function AdminNavigation() {
    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem('token_milink_auth');
        queryClient.invalidateQueries({ queryKey: ['user'] });
    };

    return (
        <div className="flex flex-col md:justify-between gap-8 items-center justify-center"> {/* Agregamos items-center y justify-center */}
            <NavigationTabs />

            <button
                className="group inline-flex items-center border-b-2 py-2 px-1 text-base sm:text-lg border-transparent text-gray-500 hover:border-gray-500 hover:text-gray-700 "
                onClick={logout}
            >
                <PowerIcon
                    className="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5"
                    aria-hidden="true"
                />
                <span>Cerrar Sesión</span>
            </button>
        </div>
    );
}