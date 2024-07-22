import { useState, useRef } from "react";
import FormButton from "./FormButton";
import Spinner from "./Spinner";
import Avatar from "./Avatar";
import { toast } from "react-toastify";

export default function PictureForm({ initialImage, onSave }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileEl = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSave = async () => {
    try {
      if (file) {
        console.log("first");
        setLoading(true);
        await onSave(file);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
      {loading && <Spinner transparent />}
      <input type="file" className="hidden" ref={fileEl} onChange={handleFileChange} />
      <div className="mb-4 cursor-pointer" onClick={() => fileEl.current.click()}>
        <Avatar src={file ? URL.createObjectURL(file) : initialImage} size={7} />
      </div>
      <div className="flex space-x-2">
        <>
          <FormButton onClick={handleSave}>Save</FormButton>
          <FormButton
            onClick={() => {
              setFile(null);
              fileEl.current.value = "";
            }}
          >
            Cancel
          </FormButton>
        </>
      </div>
    </div>
  );
}
