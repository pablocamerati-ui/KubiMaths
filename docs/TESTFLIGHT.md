# KUBI en TestFlight (beta para iPhone)

La app ya quedó preparada: `eas.json` (perfiles `preview` y `production`), identificador `cl.kubi.app`, versión 1.0.0, sin permiso de micrófono y con la declaración de cifrado estándar (`ITSAppUsesNonExemptEncryption: false`), así App Store Connect no pregunta por exportación de cifrado en cada build.

Los pasos de abajo usan **tus cuentas** (Apple y Expo), por eso los haces tú en la Terminal del Mac, dentro de la carpeta KUBIMATHS.

## 1. Cuentas (una sola vez)

1. **Apple Developer Program**: inscríbete en developer.apple.com/programs (US$99 al año). Como persona natural es más rápido; como empresa (por ejemplo, tu SpA) necesitas un número D-U-N-S.
2. **Cuenta de Expo**: créala gratis en expo.dev.

## 2. Primera compilación y envío a TestFlight

```bash
cd ~/Downloads/KUBIMATHS
npm install
npx eas-cli@latest login                 # tu usuario de Expo
npx eas-cli@latest init                  # vincula el proyecto a tu cuenta de Expo (acepta)
npx eas-cli@latest build --platform ios --profile production --auto-submit
```

Durante la compilación, EAS te pedirá iniciar sesión con tu Apple ID y ofrecerá **crear los certificados y el perfil de aprovisionamiento por ti**: responde que sí. También creará la app en App Store Connect si no existe (si el nombre «KUBI» ya está tomado en la App Store, usa por ejemplo «KUBI Matemáticas»).

La compilación ocurre en los servidores de Expo (15 a 30 minutos). Con `--auto-submit` se sube sola a App Store Connect. El plan gratuito de Expo incluye una cantidad limitada de compilaciones al mes.

## 3. Instalar en iPhones de prueba

1. Entra a appstoreconnect.apple.com → tu app → **TestFlight**.
2. Espera a que la build termine de procesarse (unos minutos).
3. **Prueba interna** (hasta 100 personas con acceso a tu cuenta de App Store Connect): agrégalas en «Internal Testing». No requiere revisión de Apple.
4. **Prueba externa** (profesores, apoderados, estudiantes): crea un grupo en «External Testing». La primera build pasa por una revisión breve de Apple y necesita una **política de privacidad** publicada (URL).
5. Cada tester instala la app **TestFlight** desde la App Store y acepta la invitación.

## 4. Siguientes versiones

```bash
npx eas-cli@latest build --platform ios --profile production --auto-submit
```

El número de build sube solo (`autoIncrement`). Para cambiar la versión visible (1.0.1, 1.1.0…), edita `version` en `app.json`.

## Antes de abrirlo a estudiantes (menores de edad)

- Publicar una política de privacidad simple: qué se guarda (apodo, curso, resultados), que es una cuenta anónima, que no hay publicidad ni rastreo, y que el tutor IA recibe solo el ejercicio.
- En App Store Connect, completar «Privacidad de la app» con lo mismo.
- Si más adelante quieres publicarla en la **categoría Niños** de la App Store, Apple exige no tener publicidad ni analítica de terceros (KUBI hoy no tiene ninguna) y revisa con más cuidado.
- Activar los inicios de sesión anónimos en Supabase y la clave del tutor IA (ver `supabase/README.md`), para que la beta pruebe todo.

## Variables de Supabase en la compilación

La URL y la **clave publicable** de kubi-dev están en `app.json` (`expo.extra.supabase`), así que la compilación las incluye sin pasos extra. Esa clave es pública por diseño (la seguridad la dan las políticas por fila); nunca pongas en la app la clave `service_role` ni la de Anthropic.
