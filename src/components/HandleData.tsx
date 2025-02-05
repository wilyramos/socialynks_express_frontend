import type { SocialNetwork, userHandle } from "../types"
import { SocialIcon } from "react-social-icons"

type HandleDataProps = {
    data: userHandle
}

export default function HandleData({ data }: HandleDataProps) {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

    console.log(links)
    return (
        <div className="space-y-6 text-white">
            <p className="text-4xl text-center font-black">{data.handle}</p>
            {data.image && <img src={data.image} alt={data.handle} className="max-w-[250px] mx-auto" />}
            <p className="text-lg text-center font-bold">{data.description}</p>

            <div className="mt-10 flex flex-col gap-6">
                {links.length ?
                    links.map((link: SocialNetwork) => (
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
                    ))
                    : <p className="text-center">No hay enlaces</p>}
            </div>
        </div>
    )
}
