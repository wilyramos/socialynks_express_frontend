import { Link } from "react-router-dom"



export default function HomeNavigation() {
  return (

    <>
        <Link
            className="text-white hover:text-gray-200 p-2 uppdercase font-bold text-xs uppercase"
            to={`/auth/login`}
        >
        Iniciar Sesión
        </Link>
    </>

  )
}
