import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { useQueryClient } from "@tanstack/react-query"
import type { ProfileForm, User } from "../types"
import { useMutation } from "@tanstack/react-query"
import { updateUser, uploadImage } from "../api/DevLinkAPI"
import { toast } from "sonner"



export default function ProfileView() {

    // get the user data from the useQuery hook cacheados

    const queryClient = useQueryClient()
    const data : User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({ 
        defaultValues: { 
            handle: data.handle, 
            description: data.description
        } 
    })

    // Update the user profile

    const updateProfileMutation = useMutation ({
        mutationFn: updateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['user'] })                    
        }
    })

    // upload image 

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {            
            queryClient.setQueryData(['user'], (prevData : User) => {
                return {
                    ...prevData,
                    image: data
                }
            }) // update the user data in the cache - optimistic update
        }
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            uploadImageMutation.mutate(e.target.files[0])
        } 
    }

    const handleUserProfileForm = (formData : ProfileForm) => {
        const user : User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(formData)
    }

  return (
      <form 
          className="bg-white p-10 rounded-lg space-y-5"
          onSubmit={handleSubmit(handleUserProfileForm)}
      >
          <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
          <div className="grid grid-cols-1 gap-2">
              <label
                  htmlFor="handle"
              > Nombre de usuario:</label>
              <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', { 
                        required: 'El nombre de usuario es requerido' 
                    })}
              />
              {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
          </div>

          <div className="grid grid-cols-1 gap-2">
              <label
                  htmlFor="description"
              >Descripción:</label>
              <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description')}
              />
          </div>

          <div className="grid grid-cols-1 gap-2">
              <label
                  htmlFor="handle"
              >Imagen:</label>
              <input
                  id="image"
                  type="file"
                  name="handle"
                  className="border-none bg-slate-100 rounded-lg p-2"
                  accept="image/*"
                  onChange={ handleChange }
              />
          </div>

          <input
              type="submit"
              className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
              value='Guardar Cambios'

          />
      </form>
  )
}