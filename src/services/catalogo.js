import { obtener } from "./peticiones.js";

export function obtenerUniversidades() {
  return obtener("/universidades");
}

export function obtenerFacultades() {
  return obtener("/facultades");
}