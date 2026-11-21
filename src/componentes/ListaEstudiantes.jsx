import { useQuery } from "@tanstack/react-query";
import { obtenerEstudiantes } from "../services/estudiantes.js";
import { useUniversidades, useFacultades } from "../hooks/useCatalogo.js";

function ListaEstudiantes() {
  const estudiantes = useQuery({
    queryKey: ["estudiantes"],
    queryFn: obtenerEstudiantes,
  });
  const universidades = useUniversidades();
  const facultades = useFacultades();

  if (estudiantes.isPending) {
    return <p role="status">Cargando estudiantes…</p>;
  }

  if (estudiantes.isError) {
    return <p role="alert">Error: {estudiantes.error.message}</p>;
  }

  if (estudiantes.data.length === 0) {
    return <p>Todavía no hay estudiantes registrados.</p>;
  }

  const nombreUniversidad = (id) =>
    universidades.data?.find((uni) => uni.id === id)?.nombre ?? "Universidad desconocida";
  const nombreFacultad = (id) =>
    facultades.data?.find((fac) => fac.id === id)?.nombre ?? "Facultad desconocida";

  return (
    <>
      {estudiantes.isFetching && <p role="status">Actualizando listado…</p>}
      <ul>
        {estudiantes.data.map((e) => (
          <li key={e.id}>
            {e.nombre} {e.apellidos}, {e.edad} años — {nombreFacultad(e.facultadId)} ({nombreUniversidad(e.universidadId)})
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListaEstudiantes;
