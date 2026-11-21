const API_URL = import.meta.env.VITE_API_URL;

export async function obtener(ruta) {
  const respuesta = await fetch(`${API_URL}${ruta}`);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }

  return respuesta.json();
}


export async function enviar(ruta, datos) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error(`No se pudo completar el registro (HTTP ${respuesta.status})`);
  }

  return respuesta.json();
}
