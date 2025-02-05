import { Link , useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";
import type { RegisterForm } from "../types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";


export default function RegisterView() {

    const location = useLocation()
    const navigate = useNavigate()

    // values initials for form and types errors
    const initialValues : RegisterForm = {
        handle: location?.state?.handle || "",
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    }

    // useForm hook
    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    });
    
    // compare passwords
    const password = watch("password", "");
    const passwordConfirm = watch("passwordConfirm", "");

    if (password !== passwordConfirm) {
        console.log("Las contraseñas no coinciden")
    }

    const handleRegister = async (formData : RegisterForm) => {
        try {
            const { data } = await api.post(`/auth/register`, formData)
            toast.success(data)
            reset()
            navigate('/auth/login')
        } catch (error) {
            if(isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        }
    }

    return (
        <>
            <h1 className="text-white text-2xl font-bold text-center">Crear cuenta</h1>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-gray-300 px-5 py-10 rounded-3xl mt-10"
            >

                <div className="mb-5">
                    <label htmlFor="handle" className=" text-gray-600 text-sm font-medium mb-2">Nombre de usuario</label>
                    <input
                        type="text"
                        id="handle"
                        className="w-full px-3 py-3 rounded-2xl"
                        {...register("handle", { required: "El nombre de usuario es requerido" })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>

                <div className="mb-5">
                    <label htmlFor="name" className=" text-gray-600 text-sm font-medium mb-2">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-3 rounded-2xl"
                        {...register("name", { required: "El nombre es requerido" })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-3 rounded-2xl"
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
                    <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-3 rounded-2xl"
                        {...register("password", { 
                            required: "La contraseña es requerida",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres"
                            } 
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="mb-5">
                    <label htmlFor="passwordConfirm" className="block text-gray-600 text-sm font-medium mb-2">Confirmar contraseña</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        className="w-full px-3 py-3 rounded-2xl"
                        {...register("passwordConfirm", { 
                            required: "La confirmación de la contraseña es requerida",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres"
                            },
                        })}
                    />
                    {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-cyan-900 text-white font-semibold py-3 rounded-2xl"
                >
                    Crear cuenta
                </button>
                

                
                
            </form>


            <nav className="mt-5">
                <p className=" text-white">¿Ya tienes una cuenta?</p>
                <Link to="/auth/login">Iniciar sesión</Link>
            </nav>
        </>

    )
}
