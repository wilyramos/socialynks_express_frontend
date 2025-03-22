import ErrorMessage from "./ErrorMessage"
import slugify from "react-slugify"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/DevLinkAPI";
import { Link } from "react-router-dom";
import Logo from "./Logo";


export default function SearchForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            handle: "",
        }
    });

    const mutation = useMutation({
        mutationFn: searchByHandle,
    })

    const handle = watch("handle")

    const handleSearch = () => {
        const slug = slugify(handle)
        mutation.mutate(slug)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-2">
            <div className=" flex items-center bg-white rounded-xl border border-gray-300 p-2">
                
                <div className=" w-40 ">
                    <Logo />
                </div>
                {/* <Logo /> */}
                <span className="text-gray-500 text-sm">.com/</span>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1 font-bold"
                    placeholder="Tu Nombre de Usuario"
                    {...register("handle", {
                        required: "Un Nombre de Usuario es obligatorio",
                    })}
                />

            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-6">
                {mutation.isPending && <p className="text-center text-gray-600">Buscando...</p>}
                {mutation.error && (
                    <p className="text-red-500 text-center font-semibold">{mutation.error.message}</p>
                )}
                {mutation.data && (
                    <p className="text-center text-indigo-600 font-semibold">
                        {mutation.data} ir a <Link to={"/auth/register"} state={{ handle: slugify(handle) }} className="text-indigo-800 underline">Registro</Link>
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition-colors px-4"
            >
                Obtener mi enlace
            </button>
        </form>
    );
}