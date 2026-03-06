export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* content container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Cerrar"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
