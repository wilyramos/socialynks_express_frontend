import type { SocialNetwork } from "../types"
import { SocialIcon } from "react-social-icons"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"

type MiLinkPantallaProps = {
  link: SocialNetwork
}



export default function MiLinkPantalla({ link }: MiLinkPantallaProps) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id })


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }



    return (
        <li
            style={{...style, listStyleType: 'none'}}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className=""
        >
          <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white px-6 py-2 rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 transition">
              <SocialIcon url={link.url} network={link.name} fgColor="#2563EB" bgColor="transparent" />
            </div>
            <p className="text-slate-800 group-hover:text-blue-600 font-medium transition">
              {link.name}
            </p>
          </a>

        </li>

    )
}
