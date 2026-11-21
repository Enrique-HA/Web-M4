# Registro-Estudiantes

Misión M4 · Full Contact Forms — Web Development I.

## Funcionamiento

Se ofrece una lista de estudiantes (nombre, apellidos, edad, universidad y facultad) y un formulario para agregarlos. Los datos se leen y se guardan en una API de pruebas con json-server. El formulario se valida con Zod, y el listado se actualiza solo tras cada registro.

## Uso de IA

Usé chatGPT para generar el css completo una vez ya finalizado el proyecto. También lo usé en el esquema de Zod para crear una función que comprobase si el nombre o apellidos contenían letras únicamente. La base de json server fue dada por ChatGPT también; le pedí 3 entidades con 6 propiedades relacionadas con universidades. Me sugirió agrupar los fetch en un archivo peticiones.js, para reutilziar código. Además, para agilizar la creación del form, ChatGPT me rellenó los inputs y selects con características: label anidado en cada campo, autocomplete en nombre y apellidos, y aria-invalid y aria-describedby en todos los campos para enlazarlos con su mensaje de error. Por último, me ayudó con el tema de env y env.example, indicando paso a paso cómo debo estructurarlos.

## Autopsia

1. Dónde guardar las facultades que se pueden elegir. El select de facultad depende de la universidad elegida, claramente. Primero pensé en guardar la lista filtrada usando un UseState. Al final vi que era mejor leer en cada render la universidad con "watch". 

2. Qué entidades se pueden registrar. En principio iba a permitir que tanto estudiantes como facultades y universidades pudiesen crearse, pero eso implicaría más esquemaz Zod, así que me limité a solo estudiantes. Quizá lo haga en un futuro como trabajo de ampliación.
