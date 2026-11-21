import { z } from "zod";

const soloLetras = (texto) => /^[\p{L}\s'-]+$/u.test(texto);

export const esquemaFormularioEstudiante = z.object({
  nombre: z.string().trim()
    .min(2, "El nombre es demasiado corto")
    .refine(soloLetras, { error: "El nombre solo puede contener letras" }),
  apellidos: z.string().trim()
    .min(2, "Los apellidos son demasiado cortos")
    .refine(soloLetras, { error: "Los apellidos solo pueden contener letras" }),
  edad: z.coerce
    .number({ error: "La edad debe ser un número" })
    .int("La edad debe ser un número entero")
    .min(16, "Debes tener al menos 16 años")
    .max(100, "Introduce una edad realista"),
  universidadId: z.coerce.number().int().min(1, "Elige una universidad"),
  facultadId: z.coerce.number().int().min(1, "Elige una facultad"),
});

