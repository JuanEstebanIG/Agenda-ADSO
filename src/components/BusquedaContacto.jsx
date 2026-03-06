import { useState } from "react";

export default function BusquedaContacto({ contactos, setContactosFiltrados }) {
  // valor actual del input y campo seleccionado
  const [valor, setValor] = useState("");
  const [campo, setCampo] = useState("todos");

  function filtrar(v, c) {
    const valorLower = v.toLowerCase();
    const filtrados = contactos.filter((cobj) => {
      switch (c) {
        case "nombre":
          return cobj.nombre.toLowerCase().includes(valorLower);
        case "correo":
          return cobj.correo.toLowerCase().includes(valorLower);
        case "etiqueta":
          return cobj.etiqueta.toLowerCase().includes(valorLower);
        case "numero":
          return cobj.telefono.toLowerCase().includes(valorLower);
        default:
          // "todos": buscar en todas las propiedades
          return (
            cobj.nombre.toLowerCase().includes(valorLower) ||
            cobj.correo.toLowerCase().includes(valorLower) ||
            cobj.etiqueta.toLowerCase().includes(valorLower) ||
            cobj.telefono.toLowerCase().includes(valorLower)
          );
      }
    });
    setContactosFiltrados(filtrados);
  }

  function onChange(e) {
    const nuevoValor = e.target.value;
    setValor(nuevoValor);
    filtrar(nuevoValor, campo);
  }

  function cambiarCampo(nuevoCampo) {
    setCampo(nuevoCampo);
    filtrar(valor, nuevoCampo);
  }

  const botonClass = (miCampo) =>
    `px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      campo === miCampo
        ? "bg-blue-700 text-white"
        : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
    }`;

return (
  <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

    {/* barra de búsqueda */}
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

      <input
        type="text"
        placeholder="Buscar contactos..."
        value={valor}
        onChange={onChange}
        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-purple-500 
        focus:border-purple-500 transition text-sm"
      />

      {/* filtros */}
      <div className="flex flex-wrap gap-2">

        <button
          className={botonClass("todos")}
          onClick={() => cambiarCampo("todos")}
        >
          Todos
        </button>

        <button
          className={botonClass("nombre")}
          onClick={() => cambiarCampo("nombre")}
        >
          Nombre
        </button>

        <button
          className={botonClass("correo")}
          onClick={() => cambiarCampo("correo")}
        >
          Correo
        </button>

        <button
          className={botonClass("etiqueta")}
          onClick={() => cambiarCampo("etiqueta")}
        >
          Etiqueta
        </button>

        <button
          className={botonClass("numero")}
          onClick={() => cambiarCampo("numero")}
        >
          Número
        </button>

      </div>
    </div>

  </div>
);
}
