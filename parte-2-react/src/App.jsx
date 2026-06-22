import { useState } from "react";
import "./App.css";

// Datos iniciales proporcionados (completé el tercero que se cortó)
const tareasIniciales = [
  { id: 1, texto: "Revisar diseño responsive", completada: false },
  { id: 2, texto: "Validar formulario de contacto", completada: false },
  { id: 3, texto: "Actualizar dependencias del proyecto", completada: false },
];

function App() {
  // Estados de la aplicación
  const [tareas, setTareas] = useState(tareasIniciales);
  const [textoNuevaTarea, setTextoNuevaTarea] = useState("");

  //Cálculos contadores
  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter((tarea) => tarea.completada).length;

  // Función para agregar una nueva tarea
  const agregarTarea = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Validación: No permitir tareas vacías
    if (textoNuevaTarea.trim() === "") return;

    const nuevaTarea = {
      id: Date.now(), // generar id unico con la fecha actual
      texto: textoNuevaTarea,
      completada: false, //estado por defecto de la tarea
    };

    // Actualizamos el estado de forma inmutable usando el spread operator
    setTareas([...tareas, nuevaTarea]);
    setTextoNuevaTarea(""); // Limpiamos el input
  };

  // Función para marcar o desmarcar como completada
  const alternarEstadoTarea = (id) => {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: !tarea.completada };
      }
      return tarea;
    });
    setTareas(tareasActualizadas);
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    // Filtramos todas las tareas que NO coincidan con el ID a eliminar
    const tareasRestantes = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasRestantes);
  };

  // 4. Renderizado del componente (UI)
  return (
    <div className="container">
      <header className="row">
        <h1>Gestor de Tareas APROS</h1>

        {/* Panel de estadísticas */}
        <div className="col-12">
          <p>
            Total: <strong>{totalTareas}</strong>
          </p>
          <p>
            Completadas: <strong>{tareasCompletadas}</strong>
          </p>
          <p>
            Pendientes: <strong>{totalTareas - tareasCompletadas}</strong>
          </p>
        </div>
      </header>

      {/* Formulario para agregar tareas */}
      <form onSubmit={agregarTarea} className="formulario-tarea">
        <div className="row">
          <div className="col-12 col-md-10">
            <input
              type="text"
              placeholder="¿Qué necesitas hacer hoy?"
              value={textoNuevaTarea}
              onChange={(e) => setTextoNuevaTarea(e.target.value)}
              className="form-control mx-auto"
            />
          </div>
          <div className="col-12 col-md-2">
            <button type="submit" className="btn btn-success">
              Agregar
            </button>
          </div>
        </div>
      </form>

      {/* Lista de Tareas */}
      <ul className="row mt-4">
        {tareas.length === 0 ? (
          <p className="col-12 text-success">
            No hay tareas pendientes.
          </p>
        ) : (
          tareas.map((tarea) => (
            <>
              <div className="row mt-4">
                <li
                  key={tarea.id}
                  className={`${tarea.completada ? "text-success col-12 col-md-6" : "text-warning col-12 col-md-6"}`}
                >
                  <div
                    // className="col-12 col-md-2"
                    onClick={() => alternarEstadoTarea(tarea.id)}
                  >
                    <input
                      type="checkbox"
                      checked={tarea.completada}
                      onChange={() => alternarEstadoTarea(tarea.id)}
                    />
                    <span className="texto-tarea">{tarea.texto}</span>
                  </div>
                </li>

                <div className="col-6 col-md-2">
                  <button
                    onClick={() => eliminarTarea(tarea.id)}
                    title="Eliminar tarea"
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
