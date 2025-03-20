import Hamburger from "hamburger-react";
import { useState, useEffect, useRef, ReactNode } from "react";
import logo from "../assets/logo.png";

interface SideBarProps {
  children?: ReactNode;
}

export default function SidebarLayout({ children }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-sky-900 text-white w-64 p-4 fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        <center>
      <img src={logo} alt="Logo da empresa" className="w-20 h-auto bg-amber-50 rounded-4xl" />
      </center>
        <nav>
          <ul className="pt-2">
            <li className="mb-2 p-2 hover:bg-sky-800 rounded">
              <a href="/">Dashboard</a>
            </li>
            <li className="mb-2 p-2 hover:bg-sky-800 rounded">
              <a href="/relatorios">Relatórios</a>
            </li>
            <li className="mb-2 p-2 hover:bg-sky-800 rounded">
              <a href="#">FISH</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar (só aparece em telas pequenas) */}
        <div className="bg-sky-800 text-white p-4 shadow-md flex justify-between items-center md:hidden">
          <h1></h1>
          <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
            <Hamburger toggled={isOpen} />
          </button>
        </div>

        {/* Área de Conteúdo */}
        <div className="p-6 bg-gray-100 flex-1">{children}</div>
      </div>
    </div>
  );
}
