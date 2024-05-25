import { SearchPetForm } from "@/components/pets/search-pet-form";

const SearchPetPage = () => {
  return (
    <div className="w-[250px] sm:w-[400px] h-fit mt-20 sm:mt-0 border rounded-lg bg-white">
      <SearchPetForm />
    </div>
  );
};
export default SearchPetPage;
