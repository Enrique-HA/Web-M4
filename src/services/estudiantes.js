import { obtener, enviar } from "./http.js";

export function obtenerEstudiantes() {
  return obtener("/estudiantes");
}

export function crearEstudiante(datos) {
  return enviar("/estudiantes", datos);
}