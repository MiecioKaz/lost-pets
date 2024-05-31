"use client";

import Image from "next/image";
import Link from "next/link";
import illustrDog from "/public/illustr-dog.jpg";
import { tilt_neon } from "@/app/fonts";
import { VscChromeClose, VscMenu } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import { useState } from "react";

const NavbarSm = ({
  logOut,
  userName,
}: {
  logOut: () => void;
  userName: string | null | undefined;
}) => {
  const [lowerSection, setLowerSection] = useState("hidden");
  const [menuIcon, setMenuIcon] = useState("block");
  const [closeIcon, setCloseIcon] = useState("hidden");
  const { data: session } = useSession();

  const clickMenu = () => {
    setLowerSection(
      "fixed top-20 w-full h-14 bg-gradient-to-r from-green-100 to-white border-b-2 z-10"
    );
    setMenuIcon("hidden");
    setCloseIcon("block");
  };
  const clickClose = () => {
    setLowerSection("hidden");
    setMenuIcon("block");
    setCloseIcon("hidden");
  };

  return (
    <>
      <section className="fixed top-0 w-full h-20 flex justify-between items-center px-3 sm:px-10 bg-gradient-to-l from-green-100 to-white border-b-2 z-10">
        <div className="flex items-center w-min">
          <div className="relative w-16 h-16">
            <Image
              src={illustrDog}
              fill
              sizes="33vw"
              className="object-cover object-center"
              alt="vecteezy image"
            />
          </div>
          <h1
            className={`${tilt_neon.className} text-lg font-bold text-emerald-700`}
          >
            <span className="font-extrabold text-5xl text-amber-800">Z</span>
            agubione
            <span className="font-extrabold text-5xl text-amber-800">Z</span>
            wierzaki
          </h1>
        </div>
        <div className={menuIcon}>
          <VscMenu
            onClick={clickMenu}
            className="w-6 sm:w-8 h-6 sm:h-8 text-amber-800"
          />
        </div>
        <div className={closeIcon}>
          <VscChromeClose
            onClick={clickClose}
            className="w-6 sm:w-8 h-6 sm:h-8 text-amber-800"
          />
        </div>
      </section>
      <section className={lowerSection}>
        <div className="flex justify-around h-14 items-center">
          <Link
            href="/"
            className="text-sm sm:text-lg font-semibold text-slate-600 hover:text-amber-600"
          >
            Home
          </Link>
          <Link
            href="/pets/delete-pets"
            className="text-sm sm:text-lg font-semibold text-slate-600 hover:text-amber-600"
          >
            Moje<span className="text-xl">🐾</span>
          </Link>
          <div className="flex text-sm sm:text-lg font-semibold text-slate-600">
            {userName ? (
              <>
                <h1 className="text-cyan-500 italic mr-10">
                  Hello, {userName}
                </h1>
                <form
                  action={() => {
                    logOut();
                  }}
                >
                  <button
                    className="hover:text-amber-600"
                    type="submit"
                  >
                    Wyloguj
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="hover:text-amber-600"
              >
                Zaloguj
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default NavbarSm;
