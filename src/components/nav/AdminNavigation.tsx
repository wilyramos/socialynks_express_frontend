import { useQueryClient } from "@tanstack/react-query"
import NavigationTabs from "../NavigationTabs"


export default function AdminNavigation() {

    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem('token_milink_auth')
        queryClient.invalidateQueries({ queryKey: ['user'] })
    }

    return (
        <div className="flex items-center justify-between">
            <NavigationTabs />
            <button
                

                className=" w-full text-gray-600  hover:text-gray-900 border-l-4 border-indigo-500 transition-colors duration-300 focus:outline-none mx-auto"

                onClick={logout}
            >
                Cerrar Sesión
            </button>
        </div>
    )
}
