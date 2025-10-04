import React from "react";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link"
import NavButtons from "./button"
import user from "@/public/user.png"
import logout from "@/public/logout.png"

import { flower } from "./fonts";

const SideNav = () => {
  return (
    <div className="bg-transparent flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-4px">
        <Link href={"/"}>
            <Image src={Logo} alt="Logo" width={184} height={164} />
        </Link>
        <p className={`${flower} text-[#000] text-[64px]`}>
          Fire Beavers
        </p>
      </div>
      <div className="flex items-center justify-evenly ml-8">
            <NavButtons label="Outcomes" href="/outcomes"/>
            <NavButtons label="Statistics" href="/statistics"/>
            <NavButtons label="Incomes" href="/incomes"/>
            <NavButtons label="Profile" href="/profile" logo={user}/>
            <NavButtons label="Profile" href="profile" logo={logout}/>
      </div>
    </div>
  );
};

export default SideNav;
