import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";
import type { RegisterForm } from "../types";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useState } from "react";


export default function RegisterView() {

    const location = useLocation()
    const navigate = useNavigate()
    const [ isLoading, setLoading ] = useState(false)

    // values initials for form and types errors
    const initialValues: RegisterForm = {
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

    // Compare password and passwordConfirm with watch
    const password = watch("password", "");

    const handleRegister = async (formData: RegisterForm) => {
        const loadingToast = toast.loading('Creando cuenta')
        setLoading(true)
        try {
            const { data } = await api.post(`/auth/register`, formData)
            // save token in localstorage
            localStorage.setItem('token_milink_auth', data)
            toast.success('Cuenta creada exitosamente')
            // toast.success(data)
            // console.log(data)
            loadingToast && toast.dismiss(loadingToast)
            reset()
            navigate('/admin')
            navigate('/admin')


        } catch (error) {
            toast.dismiss(loadingToast)
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="text-gray-600 text-2xl font-bold text-center">Crear cuenta</h1>
            <p className="text-gray-400 text-center mt-2">Ingresa tus datos para crear una cuenta</p>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="px-5 py-2 rounded-2xl mt-5 mx-4 drop-shadow-xl border-b-2"
            >
                <div className="mb-2">
                    <label htmlFor="handle" className="text-sm font-medium mb-2 block">Nombre de usuario</label>
                    <input
                        type="text"
                        id="handle"
                        className="w-full px-3 py-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-md bg-slate-50"
                        {...register("handle", { required: "El nombre de usuario es requerido" })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>

                <div className="mb-2">
                    <label htmlFor="name" className="text-sm font-medium mb-2 block">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-md bg-slate-50"
                        {...register("name", { required: "El nombre es requerido" })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="text-sm font-medium mb-2 block">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-md bg-slate-50"
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

                <div className="mb-2">
                    <label htmlFor="password" className="text-sm font-medium mb-2 block">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-md bg-slate-50"
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

                <div className="mb-2">
                    <label htmlFor="passwordConfirm" className="text-sm font-medium mb-2 block">Confirmar contraseña</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        className="w-full px-3 py-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-md bg-slate-50"
                        {...register("passwordConfirm", {
                            required: "La confirmación de la contraseña es requerida",
                            validate: value => value === password || "Las contraseñas no coinciden"
                        })}
                    />
                    {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold p-3 rounded-2xl disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Registrando..." : "Crear cuenta"}
                </button>
            </form>

            <nav className="mt-10 text-center">
                <p className="text-gray-600">¿Ya tienes una cuenta?</p>
                <Link to="/auth/login" className="text-indigo-600 font-bold hover:underline">
                    Iniciar sesión
                </Link>
            </nav>
        </>
    );
}