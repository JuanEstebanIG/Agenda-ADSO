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
    `px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-widest transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-neoAccentCyan transform hover:scale-105 active:scale-95 border ${campo === miCampo
      ? "bg-neoAccentCyan/20 border-neoAccentCyan text-neoAccentCyan shadow-[0_0_10px_rgba(6,182,212,0.4)]"
      : "bg-black/40 border-neoBorder text-gray-400 hover:bg-neoAccentCyan/10 hover:border-neoAccentCyan/50 hover:text-neoAccentCyan shadow-md"
    }`;

return (
  <div className="mb-8 glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-neoAccentCyan/0 via-transparent to-neoAccent/0 group-hover:from-neoAccentCyan/5 group-hover:to-neoAccent/5 transition-all duration-500 pointer-events-none"></div>

    {/* barra de búsqueda */}
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center relative z-10">

      <input
        type="text"
        placeholder="Buscar contactos..."
        value={valor}
        onChange={onChange}
        className="flex-1 px-5 py-3 rounded-sm neo-input text-base font-mono placeholder:text-gray-600 tracking-wide"
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
