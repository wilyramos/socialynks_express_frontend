import { Link } from 'react-router-dom'
import { IoMdLink } from 'react-icons/io'
import { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

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
                    className="font-bold text-indigo-500 text-xl hover:text-indigo-600 transition-colors"
                    to={`/${handle}`}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Visitar mi perfil: /{handle}
                </Link>
            </div>

            <button
                onClick={handleCopy}
                className="flex items-center px-4 py-2  text-gray-600 rounded-lg hover:text-gray-900 transition-colors focus:outline-none"
            >
                {isCopied ? (
                    <>
                        <FiCheck className="text-xl" />
                        <span className="ml-2">Copiado</span>
                    </>
                ) : (
                    <>
                        <FiCopy className="text-xl" />
                        <span className="ml-2">Copiar</span>
                    </>
                ) }
            </button>
        </div>
    );
}
