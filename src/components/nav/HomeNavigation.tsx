import { Link } from "react-router-dom"




export default function HomeNavigation() {



    const isLogin = () => {
        return localStorage.getItem('token_milink_auth') ? true : false
    }

    return (
        <>
            <Link
                className="w-full text-gray-600 hover:text-gray-900 border-l-4 border-indigo-500 transition-colors duration-300 focus:outline-none mx-auto font-bold"
                to={`/auth/login`}
            >
                {
                    isLogin() ? 
                    <Link to='/admin'>Mi Perfil</Link>
                    :
                    'Iniciar Sesión'
                }
            </Link>
        </>
    )
}
