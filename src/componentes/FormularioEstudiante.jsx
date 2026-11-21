import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { esquemaFormularioEstudiante } from "../esquemas/esquemaEstudiante.js";
import { crearEstudiante } from "../services/estudiantes.js";
import { useUniversidades, useFacultades } from "../hooks/useCatalogo.js";

function FormularioEstudiante() {
  const queryClient = useQueryClient();
  const universidades = useUniversidades();
  const facultades = useFacultades();

  const {register,handleSubmit,reset,setFocus,watch,formState: { errors },} = useForm({
    resolver: zodResolver(esquemaFormularioEstudiante),
    defaultValues: {
      nombre: "",
      apellidos: "",
      edad: "",
      universidadId: "",
      facultadId: "",
    },
  });

  const mutacion = useMutation({
    mutationFn: crearEstudiante,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["estudiantes"] });
    },
  });

  function onSubmit(datos) {
    mutacion.mutate(datos);
  }

  function alHaberErrores(erroresActuales) {
    setFocus(Object.keys(erroresActuales)[0]);
  }

  const universidadElegida = Number(watch("universidadId"));
  const facultadesDeLaUniversidad = (facultades.data ?? []).filter(
    (f) => f.universidadId === universidadElegida
  );

  if (universidades.isPending || facultades.isPending) {
    return <p role="status">Cargando datos del formulario…</p>;
  }

  if (universidades.isError || facultades.isError) {
    const fallo = universidades.error ?? facultades.error;
    return <p role="alert">Error al cargar el formulario: {fallo.message}</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, alHaberErrores)} noValidate>
      <p>
        <label>
          Nombre
          <input
            autoComplete="given-name"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? "error-nombre" : undefined}
            {...register("nombre")}
          />
        </label>
      </p>
      {errors.nombre && (
        <p id="error-nombre" role="alert">
          {errors.nombre.message}
        </p>
      )}

      <p>
        <label>
          Apellidos
          <input
            autoComplete="family-name"
            aria-invalid={!!errors.apellidos}
            aria-describedby={errors.apellidos ? "error-apellidos" : undefined}
            {...register("apellidos")}
          />
        </label>
      </p>
      {errors.apellidos && (
        <p id="error-apellidos" role="alert">
          {errors.apellidos.message}
        </p>
      )}

      <p>
        <label>
          Edad
          <input
            type="number"
            aria-invalid={!!errors.edad}
            aria-describedby={errors.edad ? "error-edad" : undefined}
            {...register("edad")}
          />
        </label>
      </p>
      {errors.edad && (
        <p id="error-edad" role="alert">
          {errors.edad.message}
        </p>
      )}

      <p>
        <label>
          Universidad
          <select
            aria-invalid={!!errors.universidadId}
            aria-describedby={errors.universidadId ? "error-universidad" : undefined}
            {...register("universidadId")}
          >
            <option value="">Elige una universidad</option>
            {universidades.data.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre}
              </option>
            ))}
          </select>
        </label>
      </p>
      {errors.universidadId && (
        <p id="error-universidad" role="alert">
          {errors.universidadId.message}
        </p>
      )}

      <p>
        <label>
          Facultad
          <select
            aria-invalid={!!errors.facultadId}
            aria-describedby={errors.facultadId ? "error-facultad" : undefined}
            {...register("facultadId")}
          >
            <option value="">
              {universidadElegida
                ? "Elige una facultad"
                : "Elige primero una universidad"}
            </option>
            {facultadesDeLaUniversidad.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </select>
        </label>
      </p>
      {errors.facultadId && (
        <p id="error-facultad" role="alert">
          {errors.facultadId.message}
        </p>
      )}

      <button disabled={mutacion.isPending}>
        {mutacion.isPending ? "Registrando…" : "Registrar estudiante"}
      </button>

      {mutacion.isError && <p role="alert">{mutacion.error.message}</p>}
      {mutacion.isSuccess && <p role="status">¡Estudiante registrado!</p>}
    </form>
  );
}

export default FormularioEstudiante;
