export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* content container */}
      <div className="relative bg-neoBg/80 backdrop-blur-2xl rounded-2xl shadow-[0_0_30px_rgba(217,70,239,0.15)] w-full max-w-lg p-1 transform transition-all duration-300 scale-100 animate-slide-down border border-neoBorder">
        <div className="absolute inset-0 bg-gradient-to-b from-neoAccent/5 to-transparent rounded-2xl pointer-events-none"></div>
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white bg-black/50 border border-neoBorder rounded-sm p-2 w-8 h-8 flex items-center justify-center shadow-md hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Cerrar"
        >
          <span className="font-mono text-sm leading-none">✖</span>
        </button>
        <div className="relative z-10">
            {children}
        </div>
      </div>
    </div>
  );
}
