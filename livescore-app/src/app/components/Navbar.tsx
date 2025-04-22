"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo-footscore.png"
            alt="Footscore logo"
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links en escritorio */}
        <div className="hidden sm:flex gap-6 font-semibold">
          <Link href="/jornadas">Resultados por Jornada</Link>
          <Link href="/standings">Clasificaciones</Link>
        </div>
      </div>

      {/* Links desplegables en móvil */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4">
          <Link
            href="/jornadas"
            className="block py-2 border-b border-white/30"
            onClick={() => setIsOpen(false)}
          >
            Resultados por Jornada
          </Link>
          <Link
            href="/standings"
            className="block py-2"
            onClick={() => setIsOpen(false)}
          >
            Clasificaciones
          </Link>
        </div>
      )}
    </nav>
  );
}
