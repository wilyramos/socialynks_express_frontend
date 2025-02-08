import { FaExclamationCircle } from "react-icons/fa"; // Importar el ícono
import React from "react";

type ErrorMessageProps = {
    children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
      <div className="flex items-center gap-2 p-2 text-xs text-red-900 bg-red-100 rounded-2xl m-2">
          <FaExclamationCircle className="w-5 h-5 text-red-500" />
          <span>{children}</span>
      </div>
  );
}
