import { tilt_neon } from "@/app/fonts";
import Image from "next/image";
import illustrDog from "/public/illustr-dog.jpg";
import { auth, signOut } from "auth";
import Link from "next/link";
import NavbarLower from "./navbar-lower";

const Navbar = async () => {
  const session = await auth();
  if (session && session.user) {
    console.log(session.user.id);
  }

  const logOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <section className="hidden sm:block">
        <div className="fixed top-0 w-full h-20 px-3 sm:px-10 flex justify-between items-center border-b-2 bg-gradient-to-l from-green-100 to-white">
          <div className="flex items-center w-min">
            <div className="relative w-16 h-16">
              <Image
                src={illustrDog}
                fill
                className="object-cover object-center bg-transparent"
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
          <div className="flex text-lg font-semibold text-slate-600">
            <Link
              href="/"
              className="text-lg mr-10 font-semibold text-slate-600 hover:text-amber-600"
            >
              Home
            </Link>

            {session && session.user ? (
              <>
                <h1 className="text-cyan-500 italic mr-10">
                  Hello, {session.user.name}
                </h1>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
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
      <div className="sm:hidden">
        <NavbarLower logOut={logOut} />
      </div>
    </>
  );
};
export default Navbar;
