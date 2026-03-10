export default function Notificacion({ mensaje, tipo = "exito" }) {
  const estilosBase =
    "fixed top-6 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-2xl shadow-2xl text-white font-semibold text-sm z-50 animate-bounce-in border-2 border-white/20 backdrop-blur-sm";

  const estilosTipo = {
    exito: "bg-gradient-to-r from-green-400 to-green-600",
    error: "bg-gradient-to-r from-red-400 to-red-600",
  };

  return (
    <div className={`${estilosBase} ${estilosTipo[tipo]}`}>
      {mensaje}
    </div>
  );
}
