import { FaFrownOpen } from 'react-icons/fa'; // Importar el ícono de una cara triste

export default function NotFoundView() {
    return (
        <div className='flex flex-col items-row justify-between h-full'>
            <FaFrownOpen className="text-gray-400 text-8xl mb-4" />
            <h1 className="text-4xl font-bold text-indigo-500 mb-2 ">¡Ups!</h1>
            <p className="text-gray-500 mt-2">
                Lo sentimos, la página que estás buscando no existe.
            </p>
        </div>

    );
}
