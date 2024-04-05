"use client";

import Image from "next/image";
import Link from "next/link";
import illustrDog from "/public/illustr-dog.jpg";
import { tilt_neon } from "@/app/fonts";
import { VscChromeClose, VscMenu } from "react-icons/vsc";
import { useSession } from "next-auth/react";
import { useState } from "react";

const NavbarSm = ({ logOut }: { logOut: () => void }) => {
  const [lowerSection, setLowerSection] = useState("hidden");
  const [menuIcon, setMenuIcon] = useState("block");
  const [closeIcon, setCloseIcon] = useState("hidden");
  const { data: session } = useSession();

  const clickMenu = () => {
    setLowerSection("fixed top-20 w-full h-20 bg-white border-b-2");
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
      <section className="fixed top-0 w-full h-20 flex justify-between items-center px-3 sm:px-10 bg-white border-b-2">
        <div className="flex items-center w-min">
          <div className="relative w-16 h-16">
            <Image
              src={illustrDog}
              fill
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
        <div className="flex justify-around h-20 items-center">
          <Link
            href="/"
            className="text-lg font-semibold text-slate-600 hover:text-amber-600"
          >
            Home
          </Link>
          <div className="flex text-lg font-semibold text-slate-600">
            {session && session.user ? (
              <>
                <h1 className="text-cyan-500 italic mr-10">
                  Hello, {session.user.name}
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
              <Link href="/auth/login">Zaloguj</Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default NavbarSm;
