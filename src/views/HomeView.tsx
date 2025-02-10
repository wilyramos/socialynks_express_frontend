import SearchForm from "../components/SearchForm";
import Header from "../components/Header";
import { FaLink, FaPaintBrush, FaShareAlt } from "react-icons/fa";
import Footer from "../layouts/Footer";




export default function HomeView() {
    return (
        <>
            <Header />

            <main className="bg-gray-100 min-h-screen py-5 bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl ">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-bold">Conectalo
                            <span className="text-blue-500"> todo</span> en un solo lugar
                        </h1>

                        <div className="text-xl text-gray-500">No dejes que tus enlaces se pierdan.
                            <ul className="mt-5 space-y-4">
                                <li className="flex items-center bg-blue-500 text-white p-3 rounded-md shadow-xl border-l-4 border-blue-700">
                                    <FaLink className="mr-3 text-2xl" />
                                    <span>Centralizalos</span>
                                </li>
                                <li className="flex items-center bg-yellow-500 text-white p-3 rounded-md shadow-xl border-l-4 border-yellow-700">
                                    <FaPaintBrush className="mr-3 text-2xl" />
                                    <span>Personalizalos</span>
                                </li>
                                <li className="flex items-center bg-green-500 text-white p-3 rounded-md shadow-xl border-l-4 border-green-700">
                                    <FaShareAlt className="mr-3 text-2xl" />
                                    <span>Compartelos</span>
                                </li>
                            </ul>
                        </div>
                        <SearchForm />

                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
