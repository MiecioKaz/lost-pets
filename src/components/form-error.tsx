import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-200 p-3 rounded-md flex justify-center items-center gap-x-2 text-sm text-red-700">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
