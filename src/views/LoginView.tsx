import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import { toast } from "sonner";
import api from "../config/axios";
import { isAxiosError } from "axios";



export default function LoginView() {

    const navigate = useNavigate()

    // initialValues for type RegisterForm
    const initialValues : LoginForm = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: initialValues
    });

    const handleLogin = async (formData : LoginForm) => {
        try {
            const { data } = await api.post(`/auth/login`, formData)
            localStorage.setItem('token_milink_auth', data)
            toast.success('Bienvenido')
            navigate('/admin')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }            
        }
    }

    return (
        <>

            <h1 className="text-gray-600 text-2xl font-bold text-center ">Iniciar sesión</h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="px-5 py-10 rounded-2xl mt-10 drop-shadow-xl border-b-2"
            >
                    
                    <div className="mb-5">
                        <label htmlFor="email" className=" text-sm font-medium mb-2">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-3 rounded-xl border-l-4"
                            {...register("email", { 
                                required: "El correo electrónico es requerido",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Correo no válido",
                                },
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </div>
    
                    <div className="mb-5">
                        <label htmlFor="password" className="text-sm font-medium mb-2">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-3 rounded-xl border-l-4"
                            {...register("password", { required: 'La contraseña es requerida' })}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>
    
                    <button
                        type="submit"
                        className="w-full bg-sky-900 hover:bg-sky-800 text-white font-bold p-3 rounded-2xl"
                    >
                        Iniciar sesión
                    </button>
            </form>
                

            <nav className="mt-10 text-center">
                <p className=" text-gray-600">¿No tienes una cuenta?</p>
                <Link to="/auth/register 
                " className="text-sky-900 font-bold hover:underline
                ">Crear cuenta</Link>

            </nav>
        </>

    )
}
