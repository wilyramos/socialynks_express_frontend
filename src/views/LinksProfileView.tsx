import { useEffect, useState } from "react"
import { social } from "../data/social"
import MiLinkInput from "../components/MiLinkInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/DevLinkAPI"
import type { User, SocialNetwork } from "../types"


export default function LinksProfileView() {

    // Estado de los links de perfil
    const [ MiProfileLink, setMiProfileLink] = useState(social)

    // Obtener la información del usuario desde la cache
    const queryClient = useQueryClient()
    const user : User = queryClient.getQueryData(['user'])!

    // Mutación para actualizar el perfil del usuario
    const { mutate } = useMutation({
        mutationFn: updateUser,
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        },
        onSuccess: () => {
            console.log("Perfil actualizado")
            toast.success("Perfil actualizado")
        } 
    })
    
    // Actualiza los links del perfil cuando cambia la data del usuario
    useEffect(() => {
        const updatedData = MiProfileLink.map( item => {
          const userlink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
          if(userlink) {
            return { ...item, url: userlink.url, enabled: userlink.enabled}
          }
          return item
        })
        setMiProfileLink(updatedData)
      }, [])
    
    // Actualiza la URL de un link del perfil
    const handleUrlChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = MiProfileLink.map(link => 
            link.name === e.target.name ? { ...link, url: e.target.value } : link
        )        
        setMiProfileLink(updatedLinks)
    }

    
    // Parsear los links del usuario (JSON a objetos)
    const links : SocialNetwork[] = JSON.parse(user.links)

    // Maneja la activación o desactivación de un link
    const handleEnableLink = (socialNetwork: string) => {
        const updatedLinks = MiProfileLink.map(link => {
           if (link.name === socialNetwork) {
              if (isValidUrl(link.url)) {
                return { ...link, enabled: !link.enabled }
              } else {
                toast.error('URL no Válida')
              }
           }
           return link
        })
    
        setMiProfileLink(updatedLinks)
    
        let updatedItems: SocialNetwork[] = []
        const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
        
        if (selectedSocialNetwork?.enabled) {
            // Se habilita el link, asignar nuevo ID secuencial
            const enabledLinks = links.filter(link => link.enabled)
            const id = enabledLinks.length + 1
    
            if (links.some(link => link.name === socialNetwork)) {
                updatedItems = links.map(link => {
                  if (link.name === socialNetwork) {
                    return {
                      ...link,
                      enabled: true,
                      id
                    }
                  }
                  return link
                })
            } else {
                const newItem = {
                  ...selectedSocialNetwork,
                  id
                }
                updatedItems = [...links, newItem]
            }
        } else {
            // Se deshabilita el link, poner id a 0 y actualizar los IDs de los demás enlaces habilitados
            updatedItems = links.map(link => {
                if (link.name === socialNetwork) {
                  return {
                    ...link,
                    id: 0,
                    enabled: false
                  }
                }
                return link
            }).filter(link => link.enabled)  // Filtrar solo los enlaces habilitados
    
            // Reasignar IDs secuenciales a los enlaces habilitados
            updatedItems = updatedItems.map((link, index) => ({
                ...link,
                id: index + 1
            }))
        }
    
        console.log(updatedItems)
    
        // Actualizar los links del usuario en la base de datos
        queryClient.setQueryData(['user'], (prevData: User) => {
          return {
            ...prevData,
            links: JSON.stringify(updatedItems)
          }
        })
    }

   return (
      <>
          <div className="space-y-2">
              {MiProfileLink.map(link => (
                  <MiLinkInput 
                      key={link.name}
                      link={link}
                      handleUrlChange={handleUrlChange}
                      handleEnableLink={handleEnableLink}                     
                  />
              ))}
          </div>
          <button
                className="bg-indigo-500 p-2 text-lg text-white rounded-md w-full uppercase hover:bg-indigo-800 mt-2"
                onClick={() => mutate(queryClient.getQueryData(['user'])!)}
          >
                Guardar cambios
          </button>
      </>
   )
}
