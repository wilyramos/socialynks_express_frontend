import { FaBolt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" bg-gray-50">
      <p className="text-center text-gray-500 text-sm py-4 flex justify-center items-center">
        © Powered by{' '}
        <a
          href="https://wilyramos.github.io/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-500 hover:text-gray-900 font-bold mx-1 flex items-center"
        >
          <FaBolt className="text-yellow-500 mr-1" /> wily ramos
        </a>
      </p>
    </footer>
  );
}
