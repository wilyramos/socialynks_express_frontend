import { useState } from 'react';
import { FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi';

export default function VisitMyProfile({ handle }: { handle: string }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/${handle}`);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div className="flex items-center justify-end gap-4 pt-4 pr-4">
            <button
                onClick={handleCopy}
                className="flex items-center px-3 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors focus:outline-none"
                aria-label={isCopied ? "Enlace copiado" : "Copiar enlace"}
            >
                {isCopied ? (
                    <>
                        <FiCheck className="text-lg" />
                        <span className="ml-2 text-sm">Copiado</span>
                    </>
                ) : (
                    <>
                        <FiCopy className="text-lg" />
                        <span className="ml-2 text-sm">Copiar</span>
                    </>
                )}
            </button>
            <a
                href={`/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-indigo-500 hover:text-indigo-700 transition-colors"
                aria-label={`Visitar perfil: ${handle}`}
            >
                <FiExternalLink className="text-lg" />
                <span className="ml-1 text-sm">Visitar</span>
            </a>
        </div>
    );
}