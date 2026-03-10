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
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 flex items-start justify-between gap-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
      {/* Avatar + info */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300">
          {nombre.charAt(0).toUpperCase()}
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-gray-900 text-lg leading-none">
            {nombre}
          </h3>

          <p className="text-sm text-gray-600">{telefono}</p>
          <p className="text-sm text-gray-500">{correo}</p>

          {empresa && (
            <p className="text-sm text-indigo-600 font-medium">{empresa}</p>
          )}

          {etiqueta && (
            <span className="inline-block mt-2 text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-3 py-1 rounded-full shadow-sm font-medium">
              {etiqueta}
            </span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col gap-2">
        {onEditar && (
          <button
            onClick={onEditar}
            className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Editar
          </button>
        )}

        <button
          onClick={onEliminar}
          className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
