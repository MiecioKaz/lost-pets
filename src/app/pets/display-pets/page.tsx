import prisma from "@/lib/db";
import type { Owner } from "../../../../types/types";
import { MatchedPetData } from "@/components/pets/matched-pet-data";

const getMatchedPets = async (status: string, breed: string, town: string) => {
  try {
    const pets = await prisma.owner.findMany({
      where: {
        town,
        pet: {
          is: {
            status,
            breed,
          },
        },
      },
    });

    return pets;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const DisplayPetsPage = async ({
  searchParams,
}: {
  searchParams: { status: string; breed: string; town: string };
}) => {
  const { status, breed, town } = searchParams;
  const matchedPets: Owner[] | undefined = await getMatchedPets(
    status,
    breed,
    town
  );
  const [dog, cat, other] = ["Pies", "Kot", "Inne"];

  if (matchedPets?.length === 0) {
    return (
      <>
        <div className="fixed top-36 sm:top-40 w-[300px] sm:w-[590px] h-fit p-1 border rounded-xl bg-white z-10">
          <div className="flex justify-around">
            <p>
              Miasto: <span className="font-bold">{town}</span>
            </p>
            <p>
              Rasa:{" "}
              <span className="font-bold">
                {breed === "dog" && "Pies"} {breed === "cat" && "Kot"}{" "}
                {breed === "other" && "Inny"}
              </span>
            </p>
            <p>
              Status:{" "}
              <span className="font-bold">
                {status === "lost" && "Zagubiony"}{" "}
                {status === "found" && "Znaleziony"}
              </span>
            </p>
          </div>
        </div>
        <h1 className="text-xl text-red-600">
          Nie ma jeszcze zwierzaka odpowiadającego podanym parametrom
          wyszukiwania.
        </h1>
      </>
    );
  } else {
    return (
      <>
        <div className="fixed top-36 sm:top-40 w-[300px] sm:w-[590px] h-fit p-1 border rounded-2xl bg-white z-10">
          <div className="flex justify-around">
            <p>
              Miasto: <span className="font-bold">{town}</span>
            </p>
            <p>
              Rasa:{" "}
              <span className="font-bold">
                {breed === "dog" && "Pies"} {breed === "cat" && "Kot"}{" "}
                {breed === "other" && "Inny"}
              </span>
            </p>
            <p>
              Status:{" "}
              <span className="font-bold">
                {status === "lost" && "Zagubiony"}{" "}
                {status === "found" && "Znaleziony"}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-52">
          {matchedPets?.map((matchedPet, index) => (
            <MatchedPetData
              key={matchedPet.id}
              matchedPet={matchedPet}
              matchedPets={matchedPets}
              index={index}
            />
          ))}
        </div>
      </>
    );
  }
};
export default DisplayPetsPage;
