import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import { Toaster } from "sonner";

export default function FooterLayout() {
    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-lg mx-auto pt-10 px-10">

                    <div className="py-10">
                        <Outlet />
                    </div>
                    <div className="flex justify-center items-center gap-4 text-gray-600">
                        <p className='text-xs font-bold'>Made in</p>
                        <div className='w-20'>
                            <Logo />
                        </div>
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
