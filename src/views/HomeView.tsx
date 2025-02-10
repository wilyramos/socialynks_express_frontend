import SearchForm from "../components/SearchForm";
import Header from "../components/Header";



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
                            <ul className="mt-5 space-y-2 space-x-2">
                                <li className="bg-blue-500 text-white p-2 rounded-md shadow-2xl text-center border-l-4 border-blue-700 inline-block">
                                    Centralizalos
                                </li>
                                <li className="bg-sky-500 text-white px-10 rounded-full inline-block">
                                    Personalizalos
                                </li>
                                <li className="bg-green-500 text-white p-2 rounded-full">
                                    Compartelos
                                </li>
                            </ul>
                        </div>
                        <SearchForm />

                    </div>
                </div>
            </main>
        </>
    )
}
