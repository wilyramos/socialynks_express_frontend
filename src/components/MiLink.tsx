import { Link, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import NavigationTabs from './NavigationTabs';
import { SocialNetwork, type User } from '../types';
import { useEffect, useState } from 'react';
import MiLinkPantalla from './MiLinkPantalla';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import Header from './Header';

type MiLinkProps = {
  data: User;
};

export default function MiLink({ data }: MiLinkProps) {
  const queryClient = useQueryClient();

  // Obtener los links habilitados inicialmente
  const parseLinks = () => JSON.parse(data.links);
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    parseLinks().filter((link: SocialNetwork) => link.enabled)
  );

  // Actualizar los links habilitados cuando cambian los datos de `data`
  useEffect(() => {
    const parsedLinks = parseLinks();
    setEnabledLinks(parsedLinks.filter((link: SocialNetwork) => link.enabled));
  }, [data]);

  // Función para manejar el evento de drag & drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const nextIndex = enabledLinks.findIndex((link) => link.id === over.id);

      // Asegurarse de que ambos índices sean válidos
      if (prevIndex !== -1 && nextIndex !== -1) {
        const reorderedLinks = arrayMove(enabledLinks, prevIndex, nextIndex);
        setEnabledLinks(reorderedLinks);

        const disabledLinks: SocialNetwork[] = parseLinks().filter(
          (item: SocialNetwork) => !item.enabled
        );

        const updatedLinks = reorderedLinks.concat(disabledLinks);

        // Asegurarse de que el usuario exista antes de actualizar la caché
        queryClient.setQueryData(['user'], (prevUser: User | undefined) => {
          if (prevUser) {
            return {
              ...prevUser,
              links: JSON.stringify(updatedLinks),
            };
          }
          return prevUser;
        });
      }
    }
  };

    
    return (
        <>
            <Header />
            
            <div className="bg-gray-100 min-h-screen md:m-2">
                <main className="mx-auto max-w-5xl md:p-0">
                    <NavigationTabs />
                    
                    <div className="flex justify-end">
                        <Link 
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil: /{data.handle}  </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-2">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className='text-3xl text-center text-white'>{data.handle}</p>
                            {data.image && 
                                <img src={data.image} className="mx-auto max-w-[250px]" />
                            }

                            <p className='text-center text-lg text-white'>{data.description}</p>

                            <DndContext 
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >

                                <div className='mt-10 flex flex-col gap-4'>
                                    <SortableContext 
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}          
                                    >
                                        {enabledLinks.map(link => (
                                            <MiLinkPantalla
                                                key={link.id} 
                                                link={link} 
                                            />
                                        ))}
                                    </SortableContext>
                                    
                                </div>
                            </DndContext>                           
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    
  )
}
