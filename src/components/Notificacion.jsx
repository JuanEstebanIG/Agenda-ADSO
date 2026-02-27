export default function Notificacion({ mensaje, tipo = "exito" }) {
  const estilosBase =
    "fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-medium text-sm z-50 animate-slide-down";

  const estilosTipo = {
    exito: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div className={`${estilosBase} ${estilosTipo[tipo]}`}>
      {mensaje}
    </div>
  );
}
