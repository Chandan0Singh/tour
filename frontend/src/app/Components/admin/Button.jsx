export default function Button({ children, type = "button" }) {
  return (
    <button
      type={type}
      className="rounded-lg bg-[#1B5E20] px-6 py-3 text-white font-medium hover:bg-[#2E7D32] transition"
    >
      {children}
    </button>
  );
}