export default function Input({ placeholder, type = 'text', error, value, onChange, name }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500 ${
          error
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
        }`}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error ? <small className="text-red-500">{error}</small> : null}
    </>
  );
}
