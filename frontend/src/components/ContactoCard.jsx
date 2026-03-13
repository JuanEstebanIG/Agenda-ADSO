export default function ContactoCard({
  nombre,
  telefono,
  correo,
  etiqueta,
  empresa,
  onEliminar,
  onEditar,
}) {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between gap-5 hover:-translate-y-1 group relative overflow-hidden h-full">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neoAccent/0 via-transparent to-neoAccentCyan/0 group-hover:from-neoAccent/10 group-hover:to-neoAccentCyan/10 transition-all duration-500 pointer-events-none"></div>
      
      {/* Avatar + info */}
      <div className="flex items-start gap-4 relative z-10 w-full overflow-hidden">
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-black/50 border border-neoAccent text-neoAccent font-bold text-xl shadow-[0_0_10px_rgba(217,70,239,0.5)] group-hover:shadow-[0_0_15px_rgba(217,70,239,0.8)] transition-all duration-300 font-mono">
          {nombre.charAt(0).toUpperCase()}
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="font-bold text-gray-100 text-lg leading-none tracking-wide truncate">
            {nombre}
          </h3>

          <p className="text-sm text-neoAccentCyan font-mono truncate">{telefono}</p>
          <p className="text-sm text-gray-400 truncate">{correo}</p>

          {empresa && (
            <p className="text-sm text-neoAccent font-medium tracking-wider truncate">{empresa}</p>
          )}

          {etiqueta && (
            <span className="inline-block mt-3 text-xs bg-black/60 border border-neoBorder text-gray-300 px-3 py-1 rounded-sm shadow-sm font-mono tracking-widest uppercase truncate max-w-full">
              {etiqueta}
            </span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-row gap-2 sm:gap-3 relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300 w-full mt-auto">
        {onEditar && (
          <button
            onClick={onEditar}
            className="flex-1 text-xs font-mono uppercase tracking-widest px-2 sm:px-4 py-2 rounded-sm bg-black/40 border border-neoAccent/50 text-neoAccent hover:bg-neoAccent hover:text-white transition-all duration-300 shadow-[0_0_5px_rgba(217,70,239,0.2)] hover:shadow-[0_0_15px_rgba(217,70,239,0.6)] transform hover:scale-105"
          >
            Editar
          </button>
        )}

        <button
          onClick={onEliminar}
          className="flex-1 text-xs font-mono uppercase tracking-widest px-2 sm:px-4 py-2 rounded-sm bg-black/40 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-[0_0_5px_rgba(239,68,68,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.6)] transform hover:scale-105"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
