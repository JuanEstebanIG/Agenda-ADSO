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
    className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200 max-w-3xl mx-auto space-y-6"
    onSubmit={onSubmit}
  >

    {/* titulo */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
      <h2 className="text-2xl font-bold text-gray-900">
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
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
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
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
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
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
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
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
        />
      </div>

    </div>

    {/* botones */}
    <div className="flex flex-col sm:flex-row gap-3 pt-4">

      <button
        type="submit"
        disabled={enviando}
        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
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
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
        >
          Cancelar
        </button>
      )}

    </div>

  </form>
);
}

export default FormularioContacto;