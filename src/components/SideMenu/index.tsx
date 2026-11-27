"use client";

import { useEffect, useState } from "react";
import { RiMenuLine, RiCloseLargeFill } from "react-icons/ri";
import SideMenuItem from "../SideMenuItem";
import LogoutButton from "../LogoutButton";

type SideMenuItems = {
  itemName: string;
  links: Array<{
    linkName: string;
    linkHref: string;
  }>;
};

type SideMenuProps = {
  sideMenuItems: SideMenuItems[];
  children: React.ReactNode;
};

export default function SideMenu({ sideMenuItems, children }: SideMenuProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    if (!isSideMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSideMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSideMenuOpen]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setIsSideMenuOpen(false)}
        className={`
          fixed inset-0 z-40 backdrop-blur-xs
          transition-opacity duration-300 motion-reduce:transition-none
          ${isSideMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      />

      <aside
        className={`
          ${isSideMenuOpen ? "w-65 lg:w-70" : "w-14 lg:w-12 shadow-sm"}
          absolute z-50 h-full overflow-hidden flex flex-col whitespace-nowrap
          transition-[width] duration-300 ease-in-out
          bg-secondary-background dark:bg-secondary-background
        `}
      >
        <div>
          <button
            onClick={() => setIsSideMenuOpen((prev) => !prev)}
            className="p-3 mb-4 cursor-pointer"
          >
            {isSideMenuOpen ? (
              <RiCloseLargeFill size={25} />
            ) : (
              <RiMenuLine size={25} />
            )}
          </button>
        </div>

        {sideMenuItems.map((item) => (
          <SideMenuItem
            key={item.itemName}
            isSideMenuOpen={isSideMenuOpen}
            itemName={item.itemName}
            links={item.links}
            onLinkClick={() => setIsSideMenuOpen(false)}
          />
        ))}

        {isSideMenuOpen && (
          <div className="flex flex-col gap-4 items-start mt-auto mb-5">
            {children}
            <LogoutButton />
          </div>
        )}
      </aside>
    </>
  );
}
