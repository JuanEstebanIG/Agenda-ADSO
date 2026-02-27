import { useState } from "react";

function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [enviando, setEnviando] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      setEnviando(true);

      await onAgregar(form);

      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });

    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      className="bg-gradient-to-br from-white to-purple-50 shadow-lg rounded-3xl p-8 space-y-6 mb-8 border border-purple-100"
      onSubmit={onSubmit}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-purple-400 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900">
          Nuevo contacto
        </h2>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 placeholder-gray-400 bg-white hover:border-purple-300"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}
          onChange={onChange}
        />
        {errores.nombre && (
          <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
            <span>⚠</span>
            <p>{errores.nombre}</p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 placeholder-gray-400 bg-white hover:border-purple-300"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
        />
        {errores.telefono && (
          <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
            <span>⚠</span>
            <p>{errores.telefono}</p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Correo <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 placeholder-gray-400 bg-white hover:border-purple-300"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && (
          <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
            <span>⚠</span>
            <p>{errores.correo}</p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Etiqueta <span className="text-gray-400">(opcional)</span>
        </label>
        <input
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition duration-200 placeholder-gray-400 bg-white hover:border-purple-300"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-300 disabled:to-purple-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-lg"
        >
          {enviando ? (
            <>
              <span className="animate-spin">⏳</span>
              Guardando...
            </>
          ) : (
            <>
              <span>➕</span>
              Agregar contacto
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default FormularioContacto;