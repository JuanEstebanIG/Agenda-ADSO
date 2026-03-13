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
    className="glass-panel p-8 sm:p-12 w-full mx-auto space-y-10 rounded-2xl relative group"
    onSubmit={onSubmit}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-neoAccent to-neoAccentCyan rounded-2xl opacity-10 group-hover:opacity-30 blur transition duration-1000 -z-10"></div>

    <div className="flex items-center gap-4 mb-8">
      <div className="w-2 h-10 bg-neoAccentCyan shadow-[0_0_10px_rgba(6,182,212,0.6)] animate-pulse-slow"></div>
      <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-wider uppercase font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
        {contactoInicial ? "Editar contacto" : "Nuevo contacto"}
      </h2>
    </div>

    {/* GRID CAMPOS */}
    <div className="grid sm:grid-cols-2 gap-6">

      {/* nombre */}
      <div className="sm:col-span-2">
        <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">
          Nombre <span className="text-neoAccent">*</span>
        </label>

        <input
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Ej: Camila Pérez"
          className="w-full px-5 py-4 rounded-sm neo-input text-base font-mono placeholder:text-gray-600"
        />

        {errores.nombre && (
          <p className="text-xs text-red-500 mt-2 font-mono tracking-wider">{errores.nombre}</p>
        )}
      </div>

      {/* telefono */}
      <div>
        <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">
          Teléfono <span className="text-neoAccent">*</span>
        </label>

        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={onChange}
          placeholder="300 123 4567"
          className="w-full px-5 py-4 rounded-sm neo-input text-base font-mono placeholder:text-gray-600"
        />

        {errores.telefono && (
          <p className="text-xs text-red-500 mt-2 font-mono tracking-wider">{errores.telefono}</p>
        )}
      </div>

      {/* correo */}
      <div>
        <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">
          Correo <span className="text-neoAccent">*</span>
        </label>

        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="correo@email.com"
          className="w-full px-5 py-4 rounded-sm neo-input text-base font-mono placeholder:text-gray-600"
        />

        {errores.correo && (
          <p className="text-xs text-red-500 mt-2 font-mono tracking-wider">{errores.correo}</p>
        )}
      </div>

      {/* etiqueta */}
      <div className="sm:col-span-2">
        <label className="block text-xs font-mono tracking-widest text-gray-400 uppercase mb-2">
          Etiqueta <span className="text-gray-600">(opcional)</span>
        </label>

        <input
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: Trabajo"
          className="w-full px-5 py-4 rounded-sm neo-input text-base font-mono placeholder:text-gray-600"
        />
      </div>

    </div>

    {/* botones */}
    <div className="flex flex-col sm:flex-row gap-4 pt-6 relative z-10">

      <button
        type="submit"
        disabled={enviando}
        className="flex-1 bg-neoAccent/20 border border-neoAccent text-neoAccent hover:bg-neoAccent hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neoAccent disabled:cursor-not-allowed font-mono uppercase tracking-widest py-5 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transform hover:-translate-y-1 active:scale-95 text-base font-bold"
      >
        {enviando ? "Guardando..." : contactoInicial ? "Actualizar" : "Agregar"}
      </button>

      {contactoInicial && onCancelar && (
        <button
          type="button"
          onClick={() => {
            setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
            setErrores({ nombre: "", telefono: "", correo: "" });
            onCancelar();
          }}
          className="flex-1 bg-black/40 border border-neoBorder text-gray-400 hover:text-white hover:border-gray-500 font-mono uppercase tracking-widest py-5 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:scale-95 text-base font-bold"
        >
          Cancelar
        </button>
      )}

    </div>

  </form>
);
}

export default FormularioContacto;