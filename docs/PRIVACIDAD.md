# Política de privacidad de KUBI

*Borrador para revisión legal — versión 0.1, 28 de octubre de 2026*

KUBI es una app para practicar matemáticas de 7.º básico a 4.º medio y preparar la PAES. Está pensada para estudiantes, muchos de ellos menores de edad, por eso recoge lo mínimo posible.

**Responsable:** [nombre de la persona o empresa responsable], [domicilio], [correo de contacto].

## Qué datos guarda KUBI

- **Apodo** que elige el estudiante. Le pedimos que no use su nombre completo; la app rechaza correos, teléfonos y RUT.
- **Curso** elegido en el mapa.
- **Progreso de juego:** puntos de experiencia (XP), misiones jugadas y completadas, mejor resultado e intentos de cada misión, prácticas PAES, racha de días y logros.
- **Ajuste de sonido** (solo en el teléfono).

KUBI **no** pide ni guarda nombre real, correo, teléfono, RUT, fecha de nacimiento, colegio, fotos, ubicación, contactos ni micrófono.

## Dónde se guardan

- En el **teléfono** del estudiante.
- En la **nube**, en un servidor de Supabase (región São Paulo), asociado a una **cuenta anónima** que la app crea sola, sin correo ni contraseña. Cada cuenta solo puede leer y escribir sus propios datos.

## Tutor con inteligencia artificial

Cuando el estudiante toca «Pedir pista» o «Explícamelo de otra forma», la app envía **solo el ejercicio**: el enunciado, las alternativas, la respuesta correcta, los pasos y, si corresponde, la alternativa que eligió. No se envía el apodo, el progreso ni ningún identificador del estudiante. El ejercicio lo procesa Claude, de Anthropic, a través de nuestro servidor, para generar la pista o la explicación.

## Lo que KUBI no hace

- No muestra publicidad.
- No usa herramientas de analítica ni de rastreo de terceros.
- No vende ni comparte datos con terceros, salvo los proveedores técnicos indicados arriba (Supabase para guardar el progreso y Anthropic para el tutor), que actúan por nuestra cuenta.

## Cuánto tiempo se guardan

Mientras la cuenta esté en uso. Si el estudiante borra la app, la cuenta anónima queda inaccesible; la eliminamos a solicitud o tras [plazo] sin uso.

## Derechos

El estudiante, o su madre, padre o apoderado, puede pedir acceder, corregir o eliminar sus datos escribiendo a [correo de contacto]. Como la cuenta es anónima, indícanos el apodo y el curso para ubicarla.

## Menores de edad

KUBI está diseñada para estudiantes de educación básica y media. Recomendamos que la madre, padre o apoderado conozca esta política. Si eres apoderado y quieres que eliminemos los datos de tu hijo o hija, escríbenos.

## Cambios

Si cambiamos esta política, publicaremos la nueva versión con su fecha en esta misma dirección.

---

*Notas para la revisión (eliminar antes de publicar):*
- *Completar responsable, domicilio, correo y plazo de eliminación.*
- *Revisar con un abogado según la Ley 19.628 y la Ley 21.719 de protección de datos personales (que entra en vigencia en diciembre de 2026), en especial lo referido a datos de niños, niñas y adolescentes.*
- *Para TestFlight externo y la App Store, publicar esta política en una URL pública (por ejemplo, en un sitio propio) y completar «Privacidad de la app» en App Store Connect con lo mismo: datos de uso de la app vinculados a una cuenta anónima, sin rastreo.*
