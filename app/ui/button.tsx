"use client";

import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";

type NavButton = {
  label: string;
  href: string;
  logo?: StaticImageData;
};

const NavButtons = ({ label, href, logo }: NavButton) => {
  return (
    <div className="nav-button-wrapper w-full">
      <Link
        href={href}
        className="flex items-center justify-center w-full h-full"
      >
        {logo ? (
          <Image src={logo} alt="Logo" width={53} height={50} />
        ) : (
          <span className="font-semibold text-[#000] text-[20px]">{label}</span>
        )}
      </Link>
    </div>
  );
};

export default NavButtons;
