import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Kubi } from '@/components/kubi/Kubi';
import { AppText } from '@/components/ui/AppText';
import { Button } from '@/components/ui/Button';
import { BackIcon, FlameIcon, MedalIcon, XpIcon } from '@/components/ui/icons';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ALL_LEVELS, COURSES, getCourse, getMission } from '@/features/missions/catalog';
import { PRACTICA_ID, PREGUNTAS_POR_PRACTICA } from '@/features/practice/practica';
import { diaLocal, LOGROS, rachaVigente, validarAlias } from '@/features/progress/logros';
import { useProgress } from '@/features/progress/ProgressContext';
import { supabase } from '@/lib/supabase';
import { colors, fonts, radius, spacing } from '@/theme';

/** Pantalla 5 — Perfil del estudiante */
export default function Perfil() {
  const { progress, setAlias } = useProgress();
  const [editando, setEditando] = useState(!progress.alias);
  const [texto, setTexto] = useState(progress.alias ?? '');
  const [error, setError] = useState<string | null>(null);

  const hoy = diaLocal(new Date(Date.now()));
  const racha = rachaVigente(progress.racha, hoy);
  const totalMisiones = ALL_LEVELS.filter((l) => l.missionId).length;
  const completadas = ALL_LEVELS.filter((l) => l.missionId && progress.misiones[l.missionId]?.completada).length;
  const logros = progress.logros ?? {};
  const obtenidos = LOGROS.filter((l) => logros[l.id]).length;
  const practica = progress.misiones[PRACTICA_ID];

  const guardar = () => {
    const r = validarAlias(texto);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    setAlias(r.alias);
    setTexto(r.alias);
    setError(null);
    setEditando(false);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable
          testID="boton-volver"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/mapa'))}
          accessibilityRole="button"
          accessibilityLabel="Volver al mapa"
          hitSlop={8}
          style={styles.back}
        >
          <BackIcon />
        </Pressable>
        <AppText variant="subtitle" accessibilityRole="header">
          Mi perfil
        </AppText>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Identidad */}
        <View style={styles.card}>
          <View style={styles.identidad}>
            <Kubi expression="orgulloso" size={96} accessibilityLabel="KUBI orgulloso" />
            <View style={{ flex: 1, gap: 2 }}>
              {progress.alias && !editando ? (
                <>
                  <AppText variant="title" style={styles.alias} numberOfLines={1} testID="alias-actual">
                    {progress.alias}
                  </AppText>
                  <AppText variant="caption" color={colors.textoSecundario}>
                    {getCourse(progress.curso).nombre}
                  </AppText>
                  <Pressable
                    testID="boton-cambiar-alias"
                    onPress={() => setEditando(true)}
                    accessibilityRole="button"
                    hitSlop={8}
                    style={styles.link}
                  >
                    <AppText variant="label" color={colors.morado}>
                      Cambiar apodo
                    </AppText>
                  </Pressable>
                </>
              ) : (
                <>
                  <AppText variant="subtitle">¿Cómo te llamo?</AppText>
                  <AppText variant="caption" color={colors.textoSecundario}>
                    Elige un apodo. No uses tu nombre completo.
                  </AppText>
                </>
              )}
            </View>
          </View>

          {editando && (
            <View style={styles.editor}>
              <TextInput
                testID="input-alias"
                value={texto}
                onChangeText={(t) => {
                  setTexto(t);
                  setError(null);
                }}
                placeholder="Por ejemplo: Cometa_7"
                placeholderTextColor={colors.bloqueadoTexto}
                maxLength={16}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                returnKeyType="done"
                onSubmitEditing={guardar}
                accessibilityLabel="Apodo"
                style={[styles.input, error && styles.inputError]}
              />
              {error && (
                <AppText variant="caption" color="#B42318" testID="error-alias" accessibilityLiveRegion="polite">
                  {error}
                </AppText>
              )}
              <Button label="Guardar apodo" onPress={guardar} testID="boton-guardar-alias" />
            </View>
          )}
        </View>

        {/* Números */}
        <View style={styles.stats}>
          <Stat icono={<XpIcon size={24} />} valor={String(progress.xpTotal)} etiqueta="XP total" bg={colors.amarilloSuave} color={colors.amarilloOscuro} testID="stat-xp-total" />
          <Stat
            icono={<FlameIcon size={24} />}
            valor={String(racha)}
            etiqueta={racha === 1 ? 'Día de racha' : 'Días de racha'}
            bg="#FFEFE4"
            color="#A3410A"
            testID="stat-racha"
          />
          <Stat
            icono={<FlameIcon size={24} color="#C9A7FF" />}
            valor={String(progress.racha?.mejor ?? 0)}
            etiqueta="Mejor racha"
            bg={colors.superficieSuave}
            color={colors.violeta}
            testID="stat-mejor-racha"
          />
          <Stat
            icono={<MedalIcon size={24} />}
            valor={`${completadas}/${totalMisiones}`}
            etiqueta="Misiones"
            bg={colors.celesteSuave}
            color={colors.celesteOscuro}
            testID="stat-misiones"
          />
        </View>

        {/* Logros */}
        <View style={styles.seccion}>
          <View style={styles.seccionTitulo}>
            <AppText variant="subtitle" accessibilityRole="header">
              Logros
            </AppText>
            <AppText variant="label" color={colors.violeta}>
              {obtenidos}/{LOGROS.length}
            </AppText>
          </View>
          <View style={styles.logros}>
            {LOGROS.map((l) => {
              const ok = !!logros[l.id];
              return (
                <View
                  key={l.id}
                  style={[styles.logro, ok ? styles.logroOk : styles.logroNo]}
                  accessible
                  accessibilityLabel={`Logro ${l.titulo}: ${ok ? 'obtenido' : `pendiente. ${l.descripcion}`}`}
                  testID={`logro-${l.id}`}
                >
                  <MedalIcon size={34} apagada={!ok} />
                  <AppText variant="label" style={styles.logroTitulo} color={ok ? colors.texto : colors.bloqueadoTexto}>
                    {l.titulo}
                  </AppText>
                  <AppText variant="caption" style={styles.logroTitulo} color={colors.textoSecundario}>
                    {ok ? 'Obtenido' : l.descripcion}
                  </AppText>
                </View>
              );
            })}
          </View>
        </View>

        {/* Avance por curso */}
        {COURSES.map((c) => {
          const ids = c.levels.map((l) => l.missionId).filter((id): id is string => !!id);
          const hechas = ids.filter((id) => progress.misiones[id]?.completada).length;
          return (
            <View key={c.id} style={styles.seccion} testID={`curso-perfil-${c.id}`}>
              <View style={styles.seccionTitulo}>
                <AppText variant="subtitle" accessibilityRole="header">
                  {c.nombre}
                </AppText>
                <AppText variant="label" color={colors.violeta}>
                  {hechas}/{ids.length}
                </AppText>
              </View>
              <ProgressBar value={ids.length ? hechas / ids.length : 0} color={colors.morado} label={`${hechas} de ${ids.length} misiones completadas`} />
              <View style={styles.lista}>
                {ids.map((id) => {
                  const mp = progress.misiones[id];
                  const titulo = getMission(id)?.titulo ?? id;
                  const estado = mp?.completada ? 'Completada' : mp ? 'En progreso' : 'Sin jugar';
                  return (
                    <View
                      key={id}
                      style={styles.fila}
                      accessible
                      testID={`fila-${id}`}
                      accessibilityLabel={
                        mp
                          ? `${titulo}: ${estado.toLowerCase()}, mejor resultado ${mp.mejorCorrectas} de 8, ${mp.intentos} ${mp.intentos === 1 ? 'intento' : 'intentos'}`
                          : `${titulo}: sin jugar`
                      }
                    >
                      <View style={[styles.punto, mp?.completada ? styles.puntoOk : mp ? styles.puntoMedio : styles.puntoNo]} />
                      <View style={{ flex: 1 }}>
                        <AppText variant="label" numberOfLines={1}>
                          {titulo}
                        </AppText>
                        <AppText variant="caption" color={colors.textoSecundario}>
                          {mp ? `${estado} · ${mp.intentos} ${mp.intentos === 1 ? 'intento' : 'intentos'}` : estado}
                        </AppText>
                      </View>
                      {mp && (
                        <AppText variant="label" color={mp.completada ? colors.celesteOscuro : colors.violeta}>
                          {mp.mejorCorrectas}/8
                        </AppText>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}

        {/* Práctica PAES */}
        <View style={[styles.card, styles.practica]} accessible testID="perfil-practica"
          accessibilityLabel={practica ? `Práctica PAES: mejor resultado ${practica.mejorCorrectas} de ${PREGUNTAS_POR_PRACTICA}, ${practica.intentos} prácticas` : 'Práctica PAES: aún no la haces'}
        >
          <AppText variant="label">Práctica PAES M1</AppText>
          <AppText variant="caption" color={colors.textoSecundario}>
            {practica
              ? `Mejor resultado: ${practica.mejorCorrectas}/${PREGUNTAS_POR_PRACTICA} · ${practica.intentos} ${practica.intentos === 1 ? 'práctica' : 'prácticas'}`
              : 'Aún no haces una práctica. La encuentras en el mapa.'}
          </AppText>
        </View>

        <AppText variant="caption" color={colors.textoSecundario} style={styles.nota}>
          {supabase
            ? 'Tu progreso se guarda en este teléfono y se respalda en la nube cuando hay conexión.'
            : 'Tu progreso se guarda solo en este teléfono.'}
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({
  icono,
  valor,
  etiqueta,
  bg,
  color,
  testID,
}: {
  icono: React.ReactNode;
  valor: string;
  etiqueta: string;
  bg: string;
  color: string;
  testID?: string;
}) {
  return (
    <View style={[styles.stat, { backgroundColor: bg }]} accessible accessibilityLabel={`${etiqueta}: ${valor}`} testID={testID}>
      {icono}
      <AppText variant="subtitle" color={color}>
        {valor}
      </AppText>
      <AppText variant="caption" color={colors.textoSecundario}>
        {etiqueta}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.fondo },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  back: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.blanco },
  scroll: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl, gap: spacing.xl },
  card: { backgroundColor: colors.superficie, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 2, borderColor: colors.borde, gap: spacing.md },
  identidad: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  alias: { fontSize: 24 },
  link: { alignSelf: 'flex-start', paddingVertical: 4 },
  editor: { gap: spacing.sm },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.borde,
    backgroundColor: colors.fondo,
    paddingHorizontal: spacing.lg,
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: colors.texto,
  },
  inputError: { borderColor: '#F04438' },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  stat: { flexBasis: '47%', flexGrow: 1, alignItems: 'center', gap: 2, paddingVertical: spacing.lg, borderRadius: radius.lg },
  seccion: { gap: spacing.md },
  seccionTitulo: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  logros: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  logro: { flexBasis: '47%', flexGrow: 1, alignItems: 'center', gap: 4, padding: spacing.md, borderRadius: radius.lg, borderWidth: 2 },
  logroOk: { backgroundColor: colors.amarilloSuave, borderColor: colors.amarillo },
  logroNo: { backgroundColor: colors.superficie, borderColor: colors.borde },
  logroTitulo: { textAlign: 'center' },
  lista: { backgroundColor: colors.superficie, borderRadius: radius.lg, borderWidth: 2, borderColor: colors.borde, paddingVertical: spacing.xs },
  fila: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, minHeight: 56 },
  punto: { width: 12, height: 12, borderRadius: 6 },
  puntoOk: { backgroundColor: colors.celeste },
  puntoMedio: { backgroundColor: colors.morado },
  puntoNo: { backgroundColor: colors.bloqueado },
  practica: { gap: 4 },
  nota: { textAlign: 'center' },
});
