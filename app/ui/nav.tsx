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
  const [menuItems, setMenuItems] = useState([
    { id: 1, label: "Расходы", href: "/outcomes" },
    { id: 2, label: "Статистика", href: "/statistics" },
    { id: 3, label: "Доходы", href: "/income" },
    { id: 4, label: "🌙 Тема", isThemeToggle: true },
    { id: 5, label: "Вход", href: "/login", logo: user },
    { id: 6, label: "Профиль", href: "/profile", logo: logout },
  ]);

  useEffect(() => {
    const savedOrder = localStorage.getItem("menuOrder");
    if (savedOrder) {
      const parsed = JSON.parse(savedOrder);
      setMenuItems(parsed);
    }

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

  // Drag & Drop
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("dragIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"), 10);
    if (dragIndex === index) return;

    const updated = [...menuItems];
    const [removed] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, removed);

    setMenuItems(updated);
    localStorage.setItem("menuOrder", JSON.stringify(updated));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <nav className="flex sm:flex-col md:flex-row w-full lg:flex-row items-center justify-between">
      <div className="flex items-center ml-5">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo" width={184} height={164} />
        </Link>
        <p className={`${flower} text-[#000] dark:text-[#fff] text-[64px]`}>
          Fire Beavers
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between ml-8 gap-3">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="cursor-move"
          >
            <NavButtons
              label={
                item.isThemeToggle
                  ? darkMode
                    ? "🌙 Тёмная"
                    : "☀️ Светлая"
                  : item.label
              }
              href={item.href}
              logo={item.logo}
              onClick={item.isThemeToggle ? toggleTheme : undefined}
            />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SideNav;
