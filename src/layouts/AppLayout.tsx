import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevLinkAPI";
import { Navigate } from "react-router-dom";
import MiLink from "../components/MiLink.tsx";
import Header from "../components/Header";

export default function AppLayout() {

    // verify that the user is authenticated - using useQuery
    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ["user"],
        retry: 1,
        refetchOnWindowFocus: false,
    });

    // route to login page if user is not authenticated
    
    if(isLoading) {
        
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <p>Cargando...</p>
                </div>
            </>
        )
        
    }
    if(isError) {
        return <Navigate to="/auth/login" /> 
    }

    if(data) return <MiLink data= {data} />
}