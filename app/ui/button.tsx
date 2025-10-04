"use client";

import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";


type NavButton = {
  label: string;
  href: string;
  logo? : StaticImageData;
};

const NavButtons = ({ label, href, logo }: NavButton) => {
  return (
    <div className="nav-button-wrapper">
        <Link href={href}>
            {logo ? 
            (<Image src={logo} alt="Logo" width={53} height={50}/>) :
            (<span className="text-[#000]">{label}</span>)}
        </Link>
    </div>
  );
};

export default NavButtons;
