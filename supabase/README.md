# Supabase en KUBI

**Estado: conectado al proyecto `kubi-dev`** (región São Paulo, `zmtjylyqgtkbsrzpsmio`), creado y migrado el 28-10-2026 con tu aprobación.

## Qué hay

- `migrations/20261021000000_progreso_estudiantes.sql`: tablas `perfiles_estudiante` y `progreso_mision`, con seguridad por fila (cada estudiante solo lee y escribe lo suyo). **Aplicada en kubi-dev.** Sin políticas de borrado.
- `src/lib/supabase.ts`: cliente; la sesión se guarda en el teléfono (AsyncStorage).
- `src/features/progress/supabaseProgressRepository.ts`: lee y guarda el progreso en esas tablas.
- `src/features/progress/syncProgressRepository.ts`: primero el teléfono, después la nube. La app abre al instante con lo local, luego une lo de la nube (se queda con lo mejor de cada lado) y sube cada cambio en orden. Sin conexión, sigue funcionando y sincroniza la próxima vez.
- `app.json` → `expo.extra.supabase`: URL y clave publicable de kubi-dev (la clave publicable es pública por diseño). Las variables `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` de un `.env.local`, si existen, tienen prioridad.

## Ajustes del panel de Supabase (28-10-2026)

- **Authentication → Sign In / Providers → Allow anonymous sign-ins:** activado.
- **Authentication → Rate Limits → anonymous users:** 150 por hora por IP (antes 30), para que un curso completo pueda entrar a la vez desde el wifi del colegio.
- **Captcha para cuentas anónimas:** aún no; requiere integrarlo en la app antes de activarlo.

## Cuentas

Inicio de sesión anónimo: no hay correo ni contraseña. El estudiante solo elige un apodo. Si borra la app o cambia de teléfono, esa cuenta anónima se pierde (más adelante se puede vincular a un correo del apoderado o un código del profesor).

## Datos de menores

Solo se guarda apodo, curso, XP, racha, logros y resultados por misión. No se guarda nombre, correo, RUT, colegio ni fecha de nacimiento. Nada se envía a servicios de IA externos.

## Tutor IA (función `tutor`)

- `functions/tutor/index.ts`, publicada en kubi-dev. Usa **Claude Haiku 5.5** (US$0,10 por millón de tokens de entrada y US$0,50 de salida; una pista cuesta del orden de US$0,0002).
- Solo recibe el ejercicio (nivel, habilidad, enunciado, alternativas, respuesta correcta, pasos y, para explicar un error, la alternativa elegida). Nunca el apodo ni el progreso. Exige una sesión de la app.
- Topes: **US$10 al mes** en total (`KUBI_TUTOR_TOPE_MES_USD`) y **40 solicitudes por estudiante al día** (`KUBI_TUTOR_MAX_DIA`). Los lleva la migración `20261028000000_uso_tutor.sql` (tablas sin acceso para la app; solo la función del servidor).
- Si no hay clave, se acabó el presupuesto, no hay red o la pista revela la respuesta, la app usa las pistas y explicaciones sin IA.

**Paso pendiente (lo haces tú):** crear una clave en console.anthropic.com y guardarla en el panel de Supabase de kubi-dev → Edge Functions → Secrets con el nombre `ANTHROPIC_API_KEY`. Recomendado: fijar también un límite de gasto en la consola de Anthropic como segunda protección.
