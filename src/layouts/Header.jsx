import { useState } from "react";
import Button from "../components/Button";
import { PokeballIcon } from "../icons";
import Menu from "./Menu";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import PictureForm from "../components/PictureForm";
import Avatar from "../components/Avatar";

export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { logout, authUser, uploadProfileImage } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownVisible(false);
    logout();
    navigate("/login");
    window.location.reload();
  };

  const handleCreateEvent = () => {
    navigate("/events");
  };

  const handleUpdateProfileImage = async (file) => {
    console.log("formData");
    const formData = new FormData();
    formData.append("profileImage", file);
    await uploadProfileImage(formData);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {authUser && (
        <header className="flex justify-between items-center py-2.5 px-3.5 bg-gray-800 text-white sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <PokeballIcon />
            <span className="text-xl font-sans font-semibold">Pok.GO</span>
          </div>
          <div>
            <Menu />
          </div>
          <div className="flex items-center space-x-4 relative">
            <Button onClick={handleCreateEvent}>Create Event</Button>
            <Avatar
              src={authUser?.profileImage}
              onClick={() => {
                if (!authUser) return;
                setDropdownVisible((prev) => !prev);
              }}
            />
            {dropdownVisible && (
              <div className="absolute right-0 translate-y-11 mt-12 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsModalOpen(true)}
                >
                  Edit Profile Image
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
      )}

      <Modal width={30} title="Edit Profile Image" open={isModalOpen} onClose={handleCancel}>
        <PictureForm
          initialImage={authUser?.profileImage}
          onSave={handleUpdateProfileImage}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
}
