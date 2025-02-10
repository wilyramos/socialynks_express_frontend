import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';

import MiLinkPantalla from './MiLinkPantalla';

import { SocialNetwork, type User } from '../types';
import Header from './Header';
import VisitMyProfile from './VisitMyProfile';
import Footer from '../layouts/Footer';

// Tipado de las propiedades que recibe el componente
type MiLinkProps = {
    data: User;
};

export default function MiLink({ data }: MiLinkProps) {
    const queryClient = useQueryClient();  // Hook de React Query para manejar la caché

    // Función que convierte los links de 'data' de un string a JSON
    const parseLinks = () => JSON.parse(data.links);

    // Estado para almacenar los enlaces habilitados (links que están activos)
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
        parseLinks().filter((link: SocialNetwork) => link.enabled)
    );

    // Efecto para actualizar el estado de los enlaces habilitados cada vez que cambien los datos de `data`
    useEffect(() => {
        const parsedLinks = parseLinks();
        setEnabledLinks(parsedLinks.filter((link: SocialNetwork) => link.enabled));
    }, [data]);

    // Manejador del evento de drag & drop
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // Verifica que se haya soltado sobre otro ítem válido y que no sean el mismo
        if (over && active.id !== over.id) {
            // Obtener los índices de los elementos arrastrado y donde se soltó
            const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
            const nextIndex = enabledLinks.findIndex((link) => link.id === over.id);

            // Validar que los índices existen en la lista de enlaces habilitados
            if (prevIndex !== -1 && nextIndex !== -1) {
                // Reordenar los enlaces utilizando arrayMove
                const reorderedLinks = arrayMove(enabledLinks, prevIndex, nextIndex);
                setEnabledLinks(reorderedLinks);

                // Obtener los enlaces deshabilitados (links que no están activos)
                const disabledLinks: SocialNetwork[] = parseLinks().filter(
                    (item: SocialNetwork) => !item.enabled
                );

                // Combinar los enlaces habilitados y deshabilitados
                const updatedLinks = reorderedLinks.concat(disabledLinks);

                // Actualizar la caché de React Query con los nuevos enlaces
                queryClient.setQueryData(['user'], (prevUser: User | undefined) => {
                    if (prevUser) {
                        return {
                            ...prevUser,
                            links: JSON.stringify(updatedLinks),  // Actualizar los links en formato string
                        };
                    }
                    return prevUser;  // Si no hay usuario previo, no hacer nada
                });
            }
        }
    };

    return (
        <>
            {/* Componente Header */}
            <Header />

            {/* Contenedor principal */}
            <div className="bg-gray-100 min-h-screen md:m-2">
                <main className="mx-auto max-w-5xl md:p-0">
                    {/* Tabs de navegación */}
                    {/* <NavigationTabs /> */}

                    {/* Enlace para visitar el perfil del usuario */}
                    <VisitMyProfile 
                        handle={data.handle} 
                    />

                    {/* Contenido principal de la página */}
                    <div className="flex flex-col md:flex-row gap-10 mt-2">
                        <div className="flex-1">
                            {/* Cargar el contenido del Outlet según la ruta activa */}
                            <Outlet />
                        </div>

                        {/* Panel lateral con información del perfil */}
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            {/* Nombre de usuario */}
                            <p className="text-3xl text-center text-white">{data.handle}</p>

                            {/* Imagen del perfil si está disponible */}
                            {data.image && (
                                <img
                                    src={data.image}
                                    className="w-full max-w-[100px] rounded-full object-cover mx-auto"
                                    alt={`${data.handle} profile`}
                                />
                            )}

                            {/* Descripción del perfil */}
                            <p className="text-center text-lg text-white">{data.description}</p>

                            {/* Componente de Drag & Drop */}
                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="mt-10 flex flex-col gap-4">
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {/* Mapear y renderizar los enlaces habilitados */}
                                        {enabledLinks.map(link => (
                                            <MiLinkPantalla key={link.id} link={link} />
                                        ))}
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />

            {/* Toaster para mostrar notificaciones */}
            <Toaster position="top-right" />
        </>
    );
}
