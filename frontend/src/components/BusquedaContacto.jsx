import { useState, useEffect } from "react";

export default function BusquedaContacto({ contactos, setContactosFiltrados }) {
  const [valor, setValor] = useState("");
  const [campo, setCampo] = useState("todos");
  const [orden, setOrden] = useState("default");

  useEffect(() => {
    function filtrarYOrdenar() {
      const valorLower = valor.toLowerCase();
      
      // Filtrar
      let procesados = contactos.filter((cobj) => {
        switch (campo) {
          case "nombre":
            return cobj.nombre.toLowerCase().includes(valorLower);
          case "correo":
            return cobj.correo.toLowerCase().includes(valorLower);
          case "etiqueta":
            return cobj.etiqueta.toLowerCase().includes(valorLower);
          case "numero":
            return cobj.telefono.toLowerCase().includes(valorLower);
          default:
            return (
              cobj.nombre.toLowerCase().includes(valorLower) ||
              cobj.correo.toLowerCase().includes(valorLower) ||
              cobj.etiqueta.toLowerCase().includes(valorLower) ||
              cobj.telefono.toLowerCase().includes(valorLower)
            );
        }
      });

      // Ordenar
      if (orden === "a-z") {
        procesados.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (orden === "z-a") {
        procesados.sort((a, b) => b.nombre.localeCompare(a.nombre));
      } else if (orden === "asc") {
        procesados.sort((a, b) => parseInt(a.telefono.replace(/\D/g, '') || 0) - parseInt(b.telefono.replace(/\D/g, '') || 0));
      } else if (orden === "desc") {
        procesados.sort((a, b) => parseInt(b.telefono.replace(/\D/g, '') || 0) - parseInt(a.telefono.replace(/\D/g, '') || 0));
      }

      setContactosFiltrados(procesados);
    }

    filtrarYOrdenar();
  }, [contactos, valor, campo, orden, setContactosFiltrados]);

  return (
    <div className="glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-neoAccentCyan/0 via-transparent to-neoAccent/0 group-hover:from-neoAccentCyan/5 group-hover:to-neoAccent/5 transition-all duration-500 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row gap-4 relative z-10 w-full items-center">
        {/* Input búsqueda */}
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder="Buscar contactos..."
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full px-5 py-3 rounded-sm neo-input text-base font-mono placeholder:text-gray-600 tracking-wide"
          />
        </div>

        {/* Dropdown filtros */}
        <div className="w-full md:w-48 relative">
          <select
            value={campo}
            onChange={(e) => setCampo(e.target.value)}
            className="w-full px-4 py-3 rounded-sm font-mono text-xs uppercase tracking-widest text-gray-300 bg-black/40 border border-neoBorder focus:outline-none focus:border-neoAccentCyan focus:ring-1 focus:ring-neoAccentCyan cursor-pointer appearance-none transition-all duration-300 hover:bg-black/60 shadow-md"
            style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 50%', backgroundSize: '1.2rem auto' }}
          >
            <option value="todos" className="bg-gray-900">Filtrar: Todos</option>
            <option value="nombre" className="bg-gray-900">Nombre</option>
            <option value="correo" className="bg-gray-900">Correo</option>
            <option value="etiqueta" className="bg-gray-900">Etiqueta</option>
            <option value="numero" className="bg-gray-900">Número</option>
          </select>
        </div>

        {/* Dropdown ordenar */}
        <div className="w-full md:w-48 relative">
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="w-full px-4 py-3 rounded-sm font-mono text-xs uppercase tracking-widest text-gray-300 bg-black/40 border border-neoBorder focus:outline-none focus:border-neoAccentCyan focus:ring-1 focus:ring-neoAccentCyan cursor-pointer appearance-none transition-all duration-300 hover:bg-black/60 shadow-md"
            style={{ backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem top 50%', backgroundSize: '1.2rem auto' }}
          >
            <option value="default" className="bg-gray-900">Ordenar: Default</option>
            <option value="a-z" className="bg-gray-900">Letra (A-Z)</option>
            <option value="z-a" className="bg-gray-900">Letra (Z-A)</option>
            <option value="desc" className="bg-gray-900">Número Mayor</option>
            <option value="asc" className="bg-gray-900">Número Menor</option>
          </select>
        </div>
      </div>
    </div>
  );
}
