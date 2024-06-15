const bgMap = {
  blue: 'bg-blue-500 hover:bg-blue-600',
  green: 'bg-green-500 hover:bg-green-600',
  gray: 'bg-gray-200 hover:bg-gray-300',
  white: 'bg-white hover:bg-gray-100',
};

const colorMap = {
  white: 'text-white',
  black: 'text-black',
};

const widthMap = {
  full: 'w-full',
  40: 'w-40',
};

export default function Button({
  children,
  bg = 'white',
  color = 'black',
  width = 'full',
  onClick,
}) {
  return (
    <button
      className={`px-4 py-2 rounded-md ${bgMap[bg]} ${colorMap[color]} ${widthMap[width]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
