export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* content container */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-lg p-8 transform transition-all duration-300 scale-100 animate-fade-in backdrop-blur-sm border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Cerrar"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
