import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { Kubi } from '@/components/kubi/Kubi';
import { AppText } from '@/components/ui/AppText';
import { XpChip } from '@/components/ui/Chips';
import { CheckIcon, ClockIcon, FlameIcon, LockIcon, PlayIcon, UserIcon } from '@/components/ui/icons';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { COURSES, getCourse, LevelStatus, levelStatuses, MapLevel } from '@/features/missions/catalog';
import { PRACTICA_ID } from '@/features/practice/practica';
import { diaLocal, rachaVigente } from '@/features/progress/logros';
import { useProgress } from '@/features/progress/ProgressContext';
import { colors, fonts, radius, spacing } from '@/theme';

const PATH_W = 320;
const ROW_H = 132;
const NODE = 78;
const OFFSETS = [0, 72, 0, -72, 0, 72];

const STATUS_LABEL: Record<LevelStatus, string> = {
  completada: 'Completada',
  disponible: 'Disponible',
  proximamente: 'Próximamente',
  bloqueada: 'Bloqueada',
};

/** Pantalla 2 — Mapa de aventuras */
export default function Mapa() {
  const { progress, completedMissionIds, setCurso } = useProgress();
  const course = getCourse(progress.curso);
  const levels = course.levels;
  const statuses = levelStatuses(completedMissionIds, levels);
  const completadas = statuses.filter((s) => s === 'completada').length;
  const actual = statuses.findIndex((s) => s === 'disponible' || s === 'proximamente');
  const kubiRow = actual === -1 ? levels.length - 1 : actual;
  const racha = rachaVigente(progress.racha, diaLocal(new Date(Date.now())));

  const centers = levels.map((_, i) => ({ x: PATH_W / 2 + OFFSETS[i % OFFSETS.length], y: i * ROW_H + NODE / 2 }));
  const trail = centers
    .map((c, i) => {
      if (i === 0) return `M${c.x} ${c.y}`;
      const p = centers[i - 1];
      const midY = (p.y + c.y) / 2;
      return `C${p.x} ${midY} ${c.x} ${midY} ${c.x} ${c.y}`;
    })
    .join(' ');

  const kubiOnRight = (OFFSETS[kubiRow % OFFSETS.length] ?? 0) <= 0;
  const bubbleText =
    statuses[kubiRow] === 'disponible'
      ? '¡Vamos con esta misión!'
      : statuses[kubiRow] === 'proximamente'
        ? '¡Muy bien! Esta misión llega pronto.'
        : '¡Completaste todo!';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <AppText variant="title" style={styles.title} numberOfLines={1} accessibilityRole="header">
          Mapa de aventuras
        </AppText>
        <View style={styles.headerRight}>
          <XpChip xp={progress.xpTotal} />
          <Pressable
            testID="boton-perfil"
            onPress={() => router.push('/perfil')}
            accessibilityRole="button"
            accessibilityLabel={`Mi perfil${racha > 0 ? `. Racha de ${racha} ${racha === 1 ? 'día' : 'días'}` : ''}`}
            hitSlop={6}
            style={({ pressed }) => [styles.avatar, pressed && styles.avatarPressed]}
          >
            <UserIcon size={24} />
            {racha > 0 && (
              <View style={styles.rachaBadge}>
                <FlameIcon size={13} />
                <AppText variant="caption" color="#A3410A" style={styles.rachaTexto}>
                  {racha}
                </AppText>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.selectorScroll}
        contentContainerStyle={styles.selector}
        accessibilityRole="tablist"
      >
        {COURSES.map((c) => {
          const activo = c.id === course.id;
          return (
            <Pressable
              key={c.id}
              testID={`curso-${c.id}`}
              accessibilityRole="tab"
              accessibilityState={{ selected: activo }}
              accessibilityLabel={c.nombre}
              onPress={() => setCurso(c.id)}
              style={[styles.pill, activo && styles.pillActiva]}
            >
              <AppText variant="label" color={activo ? colors.blanco : colors.violeta}>
                {c.nombre}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      <Pressable
        testID="boton-practica"
        accessibilityRole="button"
        accessibilityLabel="Práctica PAES: 15 preguntas mezcladas de todos los ejes"
        onPress={() =>
          router.push({ pathname: '/desafio/[misionId]', params: { misionId: PRACTICA_ID, semilla: String(Date.now()) } })
        }
        style={({ pressed }) => [styles.practica, pressed && styles.practicaPressed]}
      >
        <View style={styles.practicaIcono}>
          <AppText variant="caption" color={colors.azulOscuro} style={styles.practicaIconoTexto}>
            PAES
          </AppText>
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="label">Práctica PAES M1</AppText>
          <AppText variant="caption" color={colors.textoSecundario}>
            15 preguntas mezcladas de todos los ejes
          </AppText>
        </View>
        <PlayIcon size={22} color={colors.violeta} />
      </Pressable>

      <View style={styles.unitCard}>
        <View style={styles.unitTop}>
          <View style={{ flex: 1 }}>
            <AppText variant="caption" color="#D9D0FF">
              {course.nombre.toUpperCase()}
            </AppText>
            <AppText variant="subtitle" color={colors.blanco}>
              {course.descripcion}
            </AppText>
          </View>
          <AppText variant="label" color={colors.blanco}>
            {completadas}/{levels.length}
          </AppText>
        </View>
        <ProgressBar
          value={completadas / levels.length}
          color={colors.celeste}
          label={`${completadas} de ${levels.length} misiones completadas`}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={{ width: PATH_W, height: levels.length * ROW_H, alignSelf: 'center' }}>
          <Svg width={PATH_W} height={levels.length * ROW_H} style={StyleSheet.absoluteFill} accessible={false}>
            <Path d={trail} fill="none" stroke={colors.borde} strokeWidth={10} strokeLinecap="round" strokeDasharray="2 18" />
          </Svg>

          {levels.map((level, i) => (
            <LevelNode
              key={level.id}
              level={level}
              status={statuses[i]}
              index={i}
              left={centers[i].x - NODE / 2}
              top={i * ROW_H}
            />
          ))}

          <View
            pointerEvents="none"
            style={[
              styles.kubiWrap,
              { top: kubiRow * ROW_H - 18 },
              kubiOnRight ? { left: centers[kubiRow].x + NODE / 2 + 2 } : { right: PATH_W - centers[kubiRow].x + NODE / 2 + 2 },
            ]}
          >
            <Kubi
              expression={statuses[kubiRow] === 'disponible' ? 'animando' : 'orgulloso'}
              size={96}
              accessibilityLabel={`KUBI: ${bubbleText}`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LevelNode({
  level,
  status,
  index,
  left,
  top,
}: {
  level: MapLevel;
  status: LevelStatus;
  index: number;
  left: number;
  top: number;
}) {
  const playable = (status === 'disponible' || status === 'completada') && level.missionId != null;
  const onPress = () => {
    if (!playable || !level.missionId) return;
    router.push({ pathname: '/desafio/[misionId]', params: { misionId: level.missionId } });
  };

  const nodeStyle =
    status === 'completada'
      ? styles.nodeDone
      : status === 'disponible'
        ? styles.nodeAvailable
        : status === 'proximamente'
          ? styles.nodeSoon
          : styles.nodeLocked;

  return (
    <View style={[styles.nodeWrap, { left: left - 41, top }]}>
      {status === 'disponible' && <View style={styles.ring} />}
      <Pressable
        testID={`nivel-${level.id}`}
        onPress={onPress}
        disabled={!playable}
        accessibilityRole="button"
        accessibilityLabel={`Misión ${index + 1}: ${level.titulo}. ${STATUS_LABEL[status]}`}
        accessibilityState={{ disabled: !playable }}
        style={({ pressed }) => [styles.node, nodeStyle, pressed && playable && styles.nodePressed]}
      >
        {status === 'completada' && <CheckIcon size={34} />}
        {status === 'disponible' && <PlayIcon size={32} />}
        {status === 'proximamente' && <ClockIcon size={28} />}
        {status === 'bloqueada' && <LockIcon size={26} />}
      </Pressable>
      <AppText
        variant="caption"
        style={styles.nodeLabel}
        color={status === 'bloqueada' || status === 'proximamente' ? colors.bloqueadoTexto : colors.texto}
        numberOfLines={2}
      >
        {level.titulo}
      </AppText>
      {status === 'proximamente' && (
        <AppText variant="caption" color={colors.violeta} style={styles.soon}>
          Próximamente
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.fondo },
  title: { fontSize: 19, lineHeight: 24, flexShrink: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.superficieSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPressed: { opacity: 0.8 },
  rachaBadge: {
    position: 'absolute',
    right: -6,
    bottom: -4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radius.pill,
    backgroundColor: '#FFEFE4',
    borderWidth: 1.5,
    borderColor: colors.fondo,
  },
  rachaTexto: { fontSize: 12, lineHeight: 15 },
  selectorScroll: { flexGrow: 0, flexShrink: 0, marginBottom: spacing.md },
  selector: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: 2,
  },
  pill: {
    paddingHorizontal: spacing.lg,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.borde,
    backgroundColor: colors.blanco,
  },
  pillActiva: { backgroundColor: colors.morado, borderColor: colors.morado },
  practica: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 56,
    borderRadius: radius.lg,
    backgroundColor: colors.celesteSuave,
    borderWidth: 2,
    borderColor: '#B8EEF4',
  },
  practicaPressed: { opacity: 0.85 },
  practicaIcono: {
    width: 44,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.celeste,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practicaIconoTexto: { fontSize: 11, letterSpacing: 0.5 },
  unitCard: {
    marginHorizontal: spacing.xl,
    backgroundColor: colors.violeta,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    borderBottomWidth: 5,
    borderBottomColor: '#3E2A8C',
  },
  unitTop: { flexDirection: 'row', alignItems: 'center' },
  scroll: { paddingTop: spacing.xxl + 16, paddingBottom: 48 },
  nodeWrap: { position: 'absolute', width: NODE + 82, alignItems: 'center' },
  ring: {
    position: 'absolute',
    top: -8,
    width: NODE + 16,
    height: NODE + 16,
    borderRadius: (NODE + 16) / 2,
    borderWidth: 4,
    borderColor: colors.celeste,
    opacity: 0.6,
  },
  node: {
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
  },
  nodePressed: { transform: [{ translateY: 3 }], borderBottomWidth: 3 },
  nodeDone: { backgroundColor: colors.violeta, borderBottomColor: '#3E2A8C' },
  nodeAvailable: { backgroundColor: colors.morado, borderBottomColor: colors.violeta },
  nodeSoon: { backgroundColor: colors.blanco, borderWidth: 3, borderColor: colors.bloqueado, borderBottomColor: colors.bloqueado },
  nodeLocked: { backgroundColor: colors.bloqueado, borderBottomColor: '#C7C8D9' },
  nodeLabel: { marginTop: 8, textAlign: 'center', fontFamily: fonts.semibold, fontSize: 13 },
  soon: { marginTop: 2, textAlign: 'center' },
  kubiWrap: { position: 'absolute', width: 96 },
});
