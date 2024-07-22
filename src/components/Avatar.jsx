import profileImg from "../assets/blank.png";

export default function Avatar({ src, size = 2.5, onClick }) {
  return (
    <img
      src={src || profileImg}
      alt="user"
      style={{ width: `${size}rem`, height: `${size}rem` }}
      className="rounded-full cursor-pointer"
      onClick={onClick}
    />
  );
}
