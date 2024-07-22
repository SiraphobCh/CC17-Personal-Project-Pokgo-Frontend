import { LoaderIcon } from "../icons";

export default function Spinner() {
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 z-40"></div>
      <div className="fixed inset-0 flex justify-center items-center z-50 animate-spin">
        <LoaderIcon className="fill-blue-600 w-10 h-10" />
      </div>
    </>
  );
}
