"use client";

import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";
import React from "react";

type NavButtonProps = {
  label: string;
  href?: string;
  logo?: StaticImageData;
  onClick?: () => void;
};

const NavButtons = ({ label, href, logo, onClick }: NavButtonProps) => {
  const content = (
    <div className="flex items-center justify-center w-full h-full">
      {logo ? (
        <Image src={logo} alt="Logo" width={53} height={50} />
      ) : (
        <span className="font-semibold text-[#000] text-[20px]">{label}</span>
      )}
    </div>
  );

  return (
    <div
      className="nav-button-wrapper w-full cursor-pointer"
      onClick={onClick}
    >
      {}
      {href ? (
        <Link href={href} className="block w-full h-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

export default NavButtons;
