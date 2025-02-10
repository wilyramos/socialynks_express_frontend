import { Link } from 'react-router-dom'
import { IoMdLink } from 'react-icons/io'
import { useState } from 'react'


export default function VisitMyProfile({ handle }: { handle: string }) {


    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/${handle}`)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }


    return (
        <div className="flex justify-end items-center gap-3">
            <div className="flex items-center">
                <IoMdLink className="text-4xl text-indigo-600" />
                <Link
                    className="ml-4 font-bold text-slate-800 text-2xl hover:text-indigo-600 transition-colors"
                    to={`/${handle}`}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Visitar Mi Perfil: /{handle}
                </Link>
            </div>

            <button
                onClick={handleCopy}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none"
            >
                {isCopied ? 'Copiado!' : 'Copiar'}
            </button>
        </div>
    );
}
