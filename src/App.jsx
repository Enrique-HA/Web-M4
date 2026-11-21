import './App.css'
import FormularioEstudiante from "./componentes/FormularioEstudiante.jsx";
import ListaEstudiantes from "./componentes/ListaEstudiantes.jsx";

export default function App() {
  return (
    <main>
      <h1>Registro de estudiantes</h1>

      <section>
        <h2>Nuevo estudiante</h2>
        <FormularioEstudiante />
      </section>

      <section>
        <h2>Estudiantes registrados</h2>
        <ListaEstudiantes />
      </section>
    </main>
  );
}
