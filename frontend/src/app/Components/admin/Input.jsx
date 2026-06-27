export default function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none"
    />
  );
}