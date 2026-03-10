export default function Notificacion({ mensaje, tipo = "exito" }) {
  const estilosBase =
    "fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.5)] text-gray-100 font-mono tracking-widest uppercase text-xs z-50 animate-slide-down border border-neoBorder backdrop-blur-xl flex items-center gap-3";

  const estilosTipo = {
    exito: "bg-neoGlass border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    error: "bg-neoGlass border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
  };

  const indicador = tipo === "exito" 
    ? <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></div>
    : <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>;

  return (
    <div className={`${estilosBase} ${estilosTipo[tipo]}`}>
      {indicador}
      <span>{mensaje}</span>
    </div>
  );
}
