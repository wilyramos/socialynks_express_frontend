import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserByHandle } from '../api/DevLinkAPI';
import HandleData from '../components/HandleData';
import ClipLoader from 'react-spinners/ClipLoader';

export default function HandleView() {

    const params = useParams();
    const handle = params.handle! // get the handle from the params
    const { data, error, isLoading } = useQuery({
        queryKey: ['handle', handle],
        queryFn: () => getUserByHandle(handle),
        retry: 1
    })

    if (isLoading) {
        return (
            <>
                <div className="flex justify-center items-center pt-20"> {/* Ancho completo en móvil, 5/6 en sm y más */}
                    <ClipLoader color={"#4A90E2"} loading={isLoading} size={50} />
                </div>
            </>
        )
    }

    if(error) return <Navigate to="/404" />

    if(data) return <HandleData data={data} />
}
