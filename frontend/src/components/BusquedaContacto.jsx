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
    `px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 active:scale-95 ${campo === miCampo
      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
    }`;

return (
  <div className="mb-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">

    {/* barra de búsqueda */}
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">

      <input
        type="text"
        placeholder="Buscar contactos..."
        value={valor}
        onChange={onChange}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl 
        focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 
        transition-all duration-300 text-sm bg-white shadow-sm hover:shadow-md"
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
