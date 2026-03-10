import { useState, useEffect } from "react";

function FormularioContacto({ onAgregar, onActualizar, contactoInicial, onCancelar }) {
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

  // cuando cambia el contactoInicial, actualizamos el formulario
  useEffect(() => {
    if (contactoInicial) {
      setForm({
        nombre: contactoInicial.nombre || "",
        telefono: contactoInicial.telefono || "",
        correo: contactoInicial.correo || "",
        etiqueta: contactoInicial.etiqueta || "",
      });
    } else {
      // limpiar
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
    }
  }, [contactoInicial]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      setEnviando(true);

      if (contactoInicial && onActualizar) {
        await onActualizar({ ...form, id: contactoInicial.id });
      } else {
        await onAgregar(form);
      }

      // reset solo si no estamos editando o después de actualizar
      if (!contactoInicial) {
        setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      }

      setErrores({ nombre: "", telefono: "", correo: "" });
    } finally {
      setEnviando(false);
    }
  };

 return (
  <form
    className="bg-gradient-to-br from-white to-purple-50 shadow-2xl rounded-3xl p-8 sm:p-10 border border-purple-200 max-w-4xl mx-auto space-y-8 backdrop-blur-sm"
    onSubmit={onSubmit}
  >

    <div className="flex items-center gap-4 mb-6">
      <div className="w-2 h-10 bg-gradient-to-b from-purple-600 to-purple-800 rounded-full shadow-lg"></div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
        {contactoInicial ? "Editar contacto" : "Nuevo contacto"}
      </h2>
    </div>

    {/* GRID CAMPOS */}
    <div className="grid sm:grid-cols-2 gap-5">

      {/* nombre */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nombre <span className="text-red-500">*</span>
        </label>

        <input
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Ej: Camila Pérez"
          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-400"
        />

        {errores.nombre && (
          <p className="text-xs text-red-600 mt-1">{errores.nombre}</p>
        )}
      </div>

      {/* telefono */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Teléfono <span className="text-red-500">*</span>
        </label>

        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={onChange}
          placeholder="300 123 4567"
          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-400"
        />

        {errores.telefono && (
          <p className="text-xs text-red-600 mt-1">{errores.telefono}</p>
        )}
      </div>

      {/* correo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Correo <span className="text-red-500">*</span>
        </label>

        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="correo@email.com"
          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-400"
        />

        {errores.correo && (
          <p className="text-xs text-red-600 mt-1">{errores.correo}</p>
        )}
      </div>

      {/* etiqueta */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Etiqueta <span className="text-gray-400">(opcional)</span>
        </label>

        <input
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: Trabajo"
          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-400"
        />
      </div>

    </div>

    {/* botones */}
    <div className="flex flex-col sm:flex-row gap-3 pt-4">

      <button
        type="submit"
        disabled={enviando}
        className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-300 disabled:to-purple-400 text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
      >
        {enviando ? "Guardando..." : contactoInicial ? "Actualizar contacto" : "Agregar contacto"}
      </button>

      {contactoInicial && onCancelar && (
        <button
          type="button"
          onClick={() => {
            setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
            setErrores({ nombre: "", telefono: "", correo: "" });
            onCancelar();
          }}
          className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
        >
          Cancelar
        </button>
      )}

    </div>

  </form>
);
}

export default FormularioContacto;