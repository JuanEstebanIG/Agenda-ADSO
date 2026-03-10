import { useEffect, useState } from "react";
import { APP_INFO } from "../config";

import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto,
} from "./api";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import Notificacion from "./components/Notificacion";
import BusquedaContacto from "./components/BusquedaContacto";
import Modal from "./components/Modal";

function App() {
  const [contactos, setContactos] = useState([]);
  const [contactosFiltrados, setContactosFiltrados] = useState([]);
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  // utility para mantener sincronizados los contactos filtrados
  const actualizarFiltrados = (lista) => setContactosFiltrados(lista);

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");

        const data = await listarContactos();
        setContactos(data);
        actualizarFiltrados(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);

        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo.",
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => {
        setExito("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [exito]);

  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");

      const creado = await crearContacto(nuevoContacto);

      setContactos((prev) => [...prev, creado]);
      actualizarFiltrados([...contactos, creado]);
      setExito(`Contacto "${creado.nombre}" agregado exitosamente`);
    } catch (error) {
      console.error("Error al crear contacto:", error);

      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente.",
      );

      throw error;
    }
  };

  const onActualizarContacto = async (datosActualizados) => {
    try {
      setError("");
      const { id, ...resto } = datosActualizados;
      const actualizado = await actualizarContacto(id, resto);

      const nuevos = contactos.map((c) => (c.id === id ? actualizado : c));
      setContactos(nuevos);
      actualizarFiltrados(nuevos);

      setExito(`Contacto "${actualizado.nombre}" actualizado exitosamente`);
      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      setError(
        "No se pudo actualizar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente.",
      );
      throw error;
    }
  };

  const iniciarEdicion = (contacto) => {
    setContactoEnEdicion(contacto);
  };

  const onEliminarContacto = async (id) => {
    try {
      setError("");
      const contactoAEliminar = contactos.find((c) => c.id === id);
      await eliminarContactoPorId(id);

      const nuevos = contactos.filter((c) => c.id !== id);
      setContactos(nuevos);
      actualizarFiltrados(nuevos);
      setExito(`Contacto "${contactoAEliminar.nombre}" eliminado exitosamente`);
    } catch (error) {
      console.error("Error al eliminar contacto:", error);

      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {exito && <Notificacion mensaje={exito} tipo="exito" />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* HEADER */}
        <header className="mb-10 text-center">
          <p className="text-xs tracking-[0.35em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
            {APP_INFO.titulo}
          </h1>

          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <p className="text-center text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            {/* MODAL EDICIÓN */}
            {contactoEnEdicion && (
              <Modal onClose={() => setContactoEnEdicion(null)}>
                <FormularioContacto
                  onAgregar={onAgregarContacto}
                  onActualizar={onActualizarContacto}
                  contactoInicial={contactoEnEdicion}
                  onCancelar={() => setContactoEnEdicion(null)}
                />
              </Modal>
            )}

            {/* FORMULARIO */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-8">
              <FormularioContacto onAgregar={onAgregarContacto} />
            </div>

            {/* BUSCADOR */}
            <div className="mb-8">
              <BusquedaContacto
                contactos={contactos}
                setContactosFiltrados={setContactosFiltrados}
              />
            </div>

            {/* LISTA CONTACTOS */}
            {contactos.length === 0 ? (
              <p className="text-center text-gray-500">
                Aún no tienes contactos registrados.
              </p>
            ) : (
              <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {contactosFiltrados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
                    onEditar={() => iniciarEdicion(c)}
                  />
                ))}
              </section>
            )}
          </>
        )}

        {/* FOOTER */}
        <footer className="mt-14 text-center text-xs text-gray-400 space-y-1">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
