import { obtener } from "./http.js";

export function obtenerUniversidades() {
  return obtener("/universidades");
}

export function obtenerFacultades() {
  return obtener("/facultades");
}