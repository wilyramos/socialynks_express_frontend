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
        <>
            <div
                className="bg-white shadow-md p-2 m-4 rounded-2xl flex items-center gap-1"
            >
                <div className="w-6 h-6 bg-center rounded-full mr-3">
                    <SocialIcon url={link.url} network={link.name} style={{ width: 28, height: 28 }} />
                </div>

                <input
                    type="text"
                    className="w-full border-none bg-slate-100 rounded-lg p-2" 
                    placeholder={`Tu ${link.name}`}
                    value={link.url}
                    onChange={handleUrlChange}
                    name={link.name}
                />
                <Switch
                    checked={link.enabled}
                    onChange={() => handleEnableLink(link.name)}
                    className={`relative inline-flex items-center h-6 rounded-xl w-12 transition-colors duration-300 ${link.enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                >
                    <span
                        className={`inline-block w-4 h-4 bg-white rounded-full transition-transform transform duration-300 ease-in-out ${link.enabled ? 'translate-x-5' : 'translate-x-1'
                            }`}
                    />
                </Switch>
            </div>

        </>

    )
}
