import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const AuthErrorPage = () => {
  return (
    <div className="bg-red-200 p-3 rounded-md flex justify-center items-center gap-x-2 text-sm text-red-700">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>Coś poszło nie tak!!</p>
    </div>
  );
};
export default AuthErrorPage;
