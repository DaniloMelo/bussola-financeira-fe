"use client";

import Link from "next/link";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type SideMenuItemProps = {
  onLinkClick: () => void;
  isSideMenuOpen: boolean;
  itemName: string;
  links: Array<{
    linkName: string;
    linkHref: string;
  }>;
};

export default function SideMenuItem({
  isSideMenuOpen,
  itemName,
  links,
  onLinkClick,
}: SideMenuItemProps) {
  const [isSideMenuItemOpen, setIsSideMenuItemOpen] = useState(false);

  return (
    <div
      className={`${isSideMenuOpen ? "flex flex-col border-b mb-6 border-secondary-border dark:border-secondary-border" : "hidden"}`}
    >
      <p
        className="flex items-center gap-2 cursor-pointer pl-4 mb-1 font-bold"
        onClick={() => setIsSideMenuItemOpen((prev) => !prev)}
      >
        {itemName}
        <span
          className={`transition-transform ${isSideMenuItemOpen ? "rotate-90" : ""}`}
        >
          {<MdKeyboardArrowRight />}
        </span>
      </p>

      {links.map((link) => (
        <div
          key={link.linkName}
          className={`${isSideMenuItemOpen ? "flex flex-col h-8" : "h-0 invisible"} transition-[height] duration-100 ease-in-out`}
        >
          <Link
            href={link.linkHref}
            className={"mb-2 pl-8"}
            onClick={onLinkClick}
          >
            {link.linkName}
          </Link>
        </div>
      ))}
    </div>
  );
}
