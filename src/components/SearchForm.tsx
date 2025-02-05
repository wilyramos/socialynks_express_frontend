import ErrorMessage from "./ErrorMessage"
import slugify from "react-slugify"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/DevLinkAPI";
import { Link } from "react-router-dom";


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

    const handleSearch =  () => {
        const slug = slugify(handle)
        mutation.mutate(slug)
    }

    


    return (
        <form
            onSubmit={ handleSubmit(handleSearch) }
            className="space-y-5">
            <div className="relative flex items-center  bg-white  px-2">
                <label
                    htmlFor="handle"
                >milink.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                    placeholder="Tu Nombre de Usuario"
                    {...register("handle", {
                        required: "Un Nombre de Usuario es obligatorio",
                    })}
                />

            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-10">
                { mutation.isPending && <p>Buscando...</p> }
                { mutation.error && <p className="text-red-500 text-center font-black">{mutation.error.message}</p> }
                { mutation.data && <p className="text-center text-cyan-500 font-black">
                    {mutation.data} ir a <Link to={'/auth/register'} state={{
                        handle: slugify(handle)
                    }}>Registro</Link>    
                </p>}

            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Obtener mi Link'
            />
        </form>
    )
}
