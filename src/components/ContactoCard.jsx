export default function ContactoCard({
  nombre,
  telefono,
  correo,
  etiqueta,
  empresa,
  onEliminar
}) {
  return (
    <div className="bg-white border rounded-2xl p-5 flex justify-between shadow-sm">
      <div className="space-y-1">
        <h3 className="font-bold text-lg">{nombre}</h3>
        <p className="text-sm text-gray-600">{telefono}</p>
        <p className="text-sm text-gray-600">{correo}</p>

        {empresa && (
          <p className="text-sm text-purple-600 font-medium">
            {empresa}
          </p>
        )}

        {etiqueta && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {etiqueta}
          </span>
        )}
      </div>

      <button
        onClick={onEliminar}
        className="bg-red-500 text-white px-3 h-fit rounded-lg"
      >
        Eliminar
      </button>
    </div>
  );
}