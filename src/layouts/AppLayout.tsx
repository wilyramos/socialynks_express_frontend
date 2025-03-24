import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevLinkAPI";
import { Navigate } from "react-router-dom";
import MiLink from "../components/MiLink.tsx";
import Header from "../components/Header.tsx";
import ClipLoader from "react-spinners/ClipLoader";

export default function AppLayout() {
    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ["user"],
        retry: 1,
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col sm:flex-row w-screen"> {/* Flex vertical en móvil, horizontal en sm y más */}
                <div className="w-full sm:w-1/6"> {/* Ancho completo en móvil, 1/6 en sm y más */}
                    <Header />
                </div>
                <div className="w-full sm:w-5/6 flex justify-center items-center pt-20"> {/* Ancho completo en móvil, 5/6 en sm y más */}
                    <ClipLoader color={"#4A90E2"} loading={isLoading} size={50} />
                </div>
            </div>
        );
    }

    if (isError) {
        return <Navigate to="/auth/login" />;
    }

    if (data) {
        return (
            <div className="flex flex-col sm:flex-row w-screen"> {/* Flex vertical en móvil, horizontal en sm y más */}
                <div className="w-full sm:w-1/6"> {/* Ancho completo en móvil, 1/6 en sm y más */}
                    <Header />
                </div>
                <div className="w-full sm:w-5/6"> {/* Ancho completo en móvil, 5/6 en sm y más */}
                    <MiLink data={data} />
                </div>
            </div>
        );
    }
}