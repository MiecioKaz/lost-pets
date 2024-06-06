import { auth } from "@/auth";
import prisma from "@/lib/db";
import { DeletePetsComp } from "@/components/pets/delete-pets-comp";

const getOwnerByUserId = async (userId: string | undefined) => {
  try {
    const matchedPets = await prisma.owner.findMany({
      where: {
        userId,
      },
    });
    if (matchedPets.length === 0) {
      return null;
    }
    return matchedPets;
  } catch {
    return null;
  }
};

const EditPetsPage = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return <h1 className="text-2xl text-red-800">Nie jesteś zalogowany</h1>;
  }

  const pets = await getOwnerByUserId(session.user.id);

  if (!pets) {
    return (
      <h1 className="text-2xl text-red-800">
        Nie zarejestrowałeś jeszcze żadnego zwierzaka
      </h1>
    );
  } else {
    return (
      <div className="mt-40">
        <DeletePetsComp ownerPets={pets} />
      </div>
    );
  }
};
export default EditPetsPage;
