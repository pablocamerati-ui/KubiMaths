# KUBI · Matemáticas que se juegan

App de matemáticas gamificada para estudiantes de 7.º básico a 4.º medio (incluida la preparación PAES), protagonizada por KUBI, el personaje oficial (ver `KUBI_CHARACTER.md`).

**Contenido actual:** seis mapas de aventuras (7.º y 8.º básico, 1.º a 4.º medio) con 6 misiones cada uno y 3 corazones. Cada misión tiene un banco de 20 preguntas (8 escritas a mano y 12 variantes generadas con otros números) y en cada intento se sortean 8, así que repetir una misión no es memorizar respuestas. Cada misión completada desbloquea la siguiente de su curso. Además, la **Práctica PAES M1** (7.º básico a 2.º medio) y la **Práctica PAES M2** (3.º y 4.º medio) arman 15 preguntas mezcladas de los cuatro ejes (sin corazones) y muestran el logro por eje; no es un ensayo oficial ni entrega puntaje PAES. El **perfil** muestra el apodo, la XP, la racha de días seguidos, los logros (primera misión, misión perfecta, rachas de 3 y 7 días, curso completo y práctica PAES sobre 80 %) y el avance de cada misión. El progreso, el apodo, la racha y los logros quedan guardados en el teléfono y, con Supabase configurado (`.env.local`), también en la nube con una cuenta anónima (ver `supabase/README.md`).

## Ejecutar en tu iPhone con Expo Go

Requisitos: Node.js 22 LTS o más reciente en el Mac, la app **Expo Go** actualizada en el iPhone (App Store), y el Mac y el iPhone en la misma red Wi-Fi.

```bash
cd ~/Downloads/KUBIMATHS
npm install
npx expo start
```

Escanea el código QR que aparece en la Terminal con la **cámara del iPhone** y toca el aviso para abrir en Expo Go.

Si el iPhone no logra conectarse (redes de oficina o con aislamiento de equipos): `npx expo start --tunnel`.

## Comandos

| Comando | Para qué |
|---|---|
| `npx expo start` | Servidor de desarrollo |
| `npm test` | Pruebas (lógica matemática, motor de misión, navegación y flujo completo) |
| `npm run typecheck` | Verificación de TypeScript |

## Estructura

```
src/
  app/                    Pantallas (Expo Router)
    index.tsx             1 · Bienvenida
    mapa.tsx              2 · Mapa de aventuras
    desafio/[misionId].tsx 3 · Desafío matemático
    recompensas.tsx       4 · Recompensas
  components/
    kubi/                 Personaje oficial (SVG) y sus poses
    challenge/            Alternativas y panel de retroalimentación
    ui/                   Botones, textos, íconos, barra de progreso
  features/
    missions/             Preguntas, catálogo del mapa y motor de la misión
      generadores/        Variantes de preguntas por curso (banco.ts sortea 8 por intento)
    progress/             Progreso, racha y logros (teléfono + nube Supabase)
    practice/             Práctica PAES: selección balanceada por eje y resumen
    tutor/                Tutor KUBI: interfaz + tutor local sin IA externa
  theme/                  Colores, tipografía (Sora) y espaciados
assets/kubi/              KUBI en SVG transparente (vistas y expresiones)
supabase/                 Migración aplicada en kubi-dev y notas
__tests__/                Pruebas
```

## Tutor KUBI

`localTutor` explica paso a paso y aclara el error típico de cada alternativa, sin red. Además, el botón **Pedir pista** y **Explícamelo de otra forma** usan Claude Haiku 5.5 detrás de la función `tutor` de Supabase (tope de US$10 al mes y 40 solicitudes diarias por estudiante). Solo se envía el ejercicio, nunca datos del estudiante; si la IA no está disponible, KUBI usa sus pistas sin IA. Ver `supabase/README.md`.

## Agregar una misión

1. Crear `src/features/missions/data/<id>.ts` siguiendo `enteros7b.ts` (cada pregunta incluye `calcular()` para verificar la respuesta).
2. Registrarla en `MISSIONS` y asignar su `missionId` en `MAP_LEVELS` (`catalog.ts`).
3. Agregar al menos dos generadores de variantes en `generadores/gen<curso>.ts` (cada uno arma la pregunta, la respuesta y tres errores típicos con su explicación).
4. `npm test` comprueba automáticamente que cada respuesta correcta coincida con el cálculo, también en 300 variantes de cada generador.
