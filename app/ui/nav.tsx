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
    <div className="flex items-center justify-between ">
      <div className="flex items-center margin: 20px">
        <Link href={"/"}>
            <Image src={Logo} alt="Logo" width={184} height={164} />
        </Link>
        <p className={`${flower} text-[#000] text-[64px]`}>
          Fire Beavers
        </p>
      </div>
      <div className="flex items-center justify-between ml-8">
            <NavButtons label="Расходы" href="/outcomes"/>
            <NavButtons label="Статистика" href="/statistics"/>
            <NavButtons label="Доходы" href="/income"/>
            <NavButtons label="Profile" href="/login" logo={user}/>
            <NavButtons label="Profile" href="profile" logo={logout}/>
      </div>
    </div>
  );
};

export default SideNav;
