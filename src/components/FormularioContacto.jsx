import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
    empresa: ""
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;

    onAgregar(form);

    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      etiqueta: "",
      empresa: ""
    });
  };

  const input =
    "w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500";

  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow space-y-5">

      <div className="grid md:grid-cols-2 gap-4">
        <input className={input} name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange}/>
        <input className={input} name="telefono" placeholder="Teléfono" value={form.telefono} onChange={onChange}/>
      </div>

      <input className={input} name="correo" placeholder="Correo" value={form.correo} onChange={onChange}/>
      <input className={input} name="empresa" placeholder="Empresa" value={form.empresa} onChange={onChange}/>
      <input className={input} name="etiqueta" placeholder="Etiqueta" value={form.etiqueta} onChange={onChange}/>

      <button className="bg-purple-600 text-white px-6 py-2 rounded-xl">
        Guardar contacto
      </button>
    </form>
  );
}