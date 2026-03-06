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
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start justify-between gap-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {/* Avatar + info */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
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
            <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
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
            className="text-sm px-3 py-1.5 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
          >
            Editar
          </button>
        )}

        <button
          onClick={onEliminar}
          className="text-sm px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
