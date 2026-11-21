import { obtener, enviar } from "./peticiones.js";

export function obtenerEstudiantes() {
  return obtener("/estudiantes");
}

export function crearEstudiante(datos) {
  return enviar("/estudiantes", datos);
}