import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import { FaLink, FaPalette, FaRocket } from "react-icons/fa";
import Footer from "../layouts/Footer";
import { motion } from "framer-motion";

export default function HomeView() {
    const texts = [
        "Conecta. Simplifica. Impulsa.",
        "Tu Universo de Enlaces, en un Solo Lugar.",
        "Organiza, Personaliza, Comparte. Fácil."
    ];
    const [currentText, setCurrentText] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isDeleting && charIndex < texts[index].length) {
                setCurrentText(prev => prev + texts[index][charIndex]);
                setCharIndex(charIndex + 1);
            } else if (isDeleting && charIndex > 0) {
                setCurrentText(prev => prev.slice(0, -1));
                setCharIndex(charIndex - 1);
            } else if (!isDeleting && charIndex === texts[index].length) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setIndex((index + 1) % texts.length);
            }
        }, isDeleting ? 50 : 70);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, index]);

    return (
        <>
            <Header />
            <main className="md:py-20 flex flex-col items-center justify-center p-6 bg-gray-100">
                <div className="w-full max-w-3xl text-center space-y-8">
                    <div className="h-20 flex items-center justify-center">
                        <motion.h1 
                            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-950"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {currentText || " "}<span className="text-lime-500">|</span>
                        </motion.h1>
                    </div>
                    <motion.p 
                        className="text-sm sm:text-lg text-gray-950"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        Descubre una nueva forma de gestionar y compartir tus enlaces con elegancia y facilidad.
                    </motion.p>
                    <div className="grid grid-cols-3 gap-1 md:gap-4">
                        <div className="flex flex-col items-center">
                            <FaLink className="text-4xl sm:text-5xl text-lime-500 mb-3" />
                            <p className="text-base sm:text-lg font-semibold">Enlaza Fácilmente</p>
                            <p className="text-xs sm:text-sm mt-1 hidden md:block">Organiza tus enlaces en un solo lugar.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaPalette className="text-4xl sm:text-5xl text-sky-300 mb-3" />
                            <p className="text-base sm:text-lg font-semibold">Personaliza al Máximo</p>
                            <p className="text-xs sm:text-sm mt-1 hidden md:block">Dale tu toque único a cada enlace.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaRocket className="text-4xl sm:text-5xl text-lime-500 mb-3" />
                            <p className="text-base sm:text-lg font-semibold">Impulsa tu Alcance</p>
                            <p className="text-xs sm:text-sm mt-1 hidden md:block">Comparte y llega a más personas.</p>
                        </div>
                    </div>
                    <div className="mt-8 w-full max-w-md">
                        <SearchForm />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}