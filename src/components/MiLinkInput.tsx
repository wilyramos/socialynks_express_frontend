import { MiProfileLink } from "../types";
import { SocialIcon } from "react-social-icons";
import { Switch } from "@headlessui/react";

type MiLinkInputProps = {
    link: MiProfileLink;
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEnableLink: (socialNetwork: string) => void;
};

export default function MiLinkInput({ link, handleUrlChange, handleEnableLink }: MiLinkInputProps) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="w-8 h-8 rounded-full overflow-hidden">
                <SocialIcon url={link.url} network={link.name} style={{ width: 28, height: 28 }} />
            </div>

            <input
                type="text"
                className="flex-1 border-none bg-transparent text-xs md:text-base sm:text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 "
                placeholder={`Tu ${link.name}`}
                value={link.url}
                onChange={handleUrlChange}
                name={link.name}
            />

            <Switch
                checked={link.enabled}
                onChange={() => handleEnableLink(link.name)}
                className={`relative inline-flex items-center h-6 w-11 rounded-full ${link.enabled ? 'bg-blue-600' : 'bg-gray-300'} transition-colors duration-300`}
            >
                <span className="sr-only">Activar/Desactivar</span>
                <span
                    className={`inline-block w-5 h-5 bg-white rounded-full transform transition-transform duration-300 ${link.enabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
            </Switch>
        </div>
    );
}