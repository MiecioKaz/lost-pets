import Image from "next/image";

import illustrGroup from "/public/illustr-group.jpg";
import illustrBalloons from "/public/illustr-balloons.jpg";
import { tilt_neon } from "./fonts";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`grid grid-cols-2 mt-44 sm:mt-40 ${tilt_neon.className}`}>
      <div className="col-span-2 text-2xl sm:text-4xl text-purple-900 font-extrabold pl-10 sm:px-20">
        <p>Zaginął twój zwierzak?</p>
        <p>Znalazłeś zabłąkanego zwierzaka?</p>
        <p>Tutaj możesz znaleźć pomoc.</p>
      </div>
      <div className="text-slate-600 pl-10 sm:px-20">
        <p className="my-2">
          Przeglądaj naszą bazę danych, gdzie możesz znaleźć dane kontaktowe
          osoby, która znalazła lub poszukuje rozpoznanego przez ciebie
          zwierzaka.
        </p>

        <p className="hidden sm:block">
          Zarejestruj dane twojego zaginionego, lub przez ciebie przygarniętego
          zwierzaka umożliwiając w ten sposób jego identyfikację przez inne
          zainteresowane osoby.
        </p>
      </div>

      <Image
        src={illustrGroup}
        style={{
          width: "80%",
          height: "auto",
        }}
        sizes="33vw"
        alt="vecteezy image"
        className="place-self-center"
      />
      <div className="col-span-2 sm:hidden px-10">
        <p>
          Zarejestruj dane twojego zaginionego, lub przez ciebie przygarniętego
          zwierzaka umożliwiając w ten sposób jego identyfikację przez inne
          zainteresowane osoby.
        </p>
      </div>

      <Image
        src={illustrBalloons}
        style={{
          width: "60%",
          height: "auto",
        }}
        sizes="33vw"
        alt="vecteezy image"
        className="place-self-center"
      />
      <div className="pt-6 sm:pt-20 text-purple-900 font-bold">
        <Link
          href="/pets/search-pet"
          className="inline-block sm:inline border-2 border-orange-600 hover:bg-orange-200 rounded-full px-1 sm:p-2 mr-4"
        >
          Szukaj
        </Link>
        <Link
          href="/pets/register-pet"
          className="inline-block sm:inline border-2 border-orange-600 hover:bg-orange-200 rounded-full px-1 sm:p-2 mt-2 sm:mb-0"
        >
          Zarejestruj
        </Link>
      </div>

      <Link
        href="/privacy.html"
        className="hidden sm:block fixed w-40 bottom-4 left-4 hover:underline"
      >
        Polityka Prywatności
      </Link>

      <div className="hidden sm:block fixed w-40 bottom-2 right-0 text-xs">
        <h1>Ilustracje od:</h1>
        <Link
          href="https://www.vecteezy.com/free-vector/pets"
          className="hover:underline"
        >
          Pets Vectors by Vecteezy
        </Link>
      </div>
    </main>
  );
}
