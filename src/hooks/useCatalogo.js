import { useQuery } from "@tanstack/react-query";
import { obtenerUniversidades, obtenerFacultades } from "../services/catalogo.js";

export function useUniversidades() {
  return useQuery({
    queryKey: ["universidades"],
    queryFn: obtenerUniversidades,
  });
}

export function useFacultades() {
  return useQuery({
    queryKey: ["facultades"],
    queryFn: obtenerFacultades,
  });
}