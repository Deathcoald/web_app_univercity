"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import NavButtons from "./button";
import user from "@/public/user.png";
import logout from "@/public/logout.png";
import { flower } from "./fonts";

const SideNav = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <nav className="flex sm:flex-col md:flex-row w-full lg:flex-row items-center justify-between">
      <div className="flex items-center ml-5">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo" width={184} height={164} />
        </Link>
        <p className={`${flower} text-[#000] text-[64px]`}>Fire Beavers</p>
      </div>

      <div className="flex flex-wrap items-center justify-between ml-8 gap-3">
        <NavButtons label="Расходы" href="/outcomes" />
        <NavButtons label="Статистика" href="/statistics" />
        <NavButtons label="Доходы" href="/income" />
        <NavButtons
          label={darkMode ? "🌙 Тёмная" : "☀️ Светлая"}
          onClick={toggleTheme}
        />

        <NavButtons label="Вход" href="/login" logo={user} />
        <NavButtons label="Профиль" href="/profile" logo={logout} />
      </div>
    </nav>
  );
};

export default SideNav;
