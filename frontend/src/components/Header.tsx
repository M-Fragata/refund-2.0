import { useState, useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

import logoSvg from "../assets/logo.svg";
import logoutSvg from "../assets/logout.svg";

export function Header() {

  const [user, setUser] = useState<string>("")

  const auth = useAuth()

  function handleOut() {
    confirm("Deseja sair?")

    if (!confirm) return

    auth.out()
  }

  function getNameUser() {
    const userStorage = localStorage.getItem(`@refund:user`)

    if(!userStorage) return

    setUser((JSON.parse(userStorage).name).split(" ")[0])
  }

  useEffect(() => {

    getNameUser()

  }, [])

  return (
    <header className="w-full flex justify-between">
      <img src={logoSvg} alt="Logo" className="my-8" />

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-200">
          {user ? `Olá, ${user}` : ""}
        </span>

        <img
          src={logoutSvg}
          alt="Ícone de sair"
          onClick={handleOut}
          className="my-8 cursor-pointer hover:opacity-75 transition ease-linear"
        />
      </div>
    </header>
  );
}
