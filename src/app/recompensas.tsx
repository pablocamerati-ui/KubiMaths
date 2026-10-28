import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { Kubi } from '@/components/kubi/Kubi';
import { AppText } from '@/components/ui/AppText';
import { Button } from '@/components/ui/Button';
import { CheckIcon, HeartIcon, XpIcon } from '@/components/ui/icons';
import { LogroBanner } from '@/components/ui/LogroBanner';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getMission } from '@/features/missions/catalog';
import { useSonidoDeEntrada } from '@/features/sonido/sonidos';
import { decodificarResumen, esPractica, PRACTICAS, pruebaDe } from '@/features/practice/practica';
import { colors, radius, spacing } from '@/theme';

type Params = {
  misionId: string;
  correctas: string;
  total: string;
  xp: string;
  corazones: string;
  completada: string;
  resumen?: string;
  semilla?: string;
  /** Logros recién desbloqueados, separados por coma. */
  logros?: string;
};

const idsLogros = (p: Params) => (p.logros ? p.logros.split(',').filter(Boolean) : []);

/** Pantalla 4 — Recompensas */
export default function Recompensas() {
  const p = useLocalSearchParams<Params>();
  if (esPractica(p.misionId)) return <ResultadosPractica p={p} />;
  const correctas = Number(p.correctas ?? 0);
  const total = Number(p.total ?? 0);
  const xp = Number(p.xp ?? 0);
  const corazones = Number(p.corazones ?? 0);
  const completada = p.completada === '1';
  const titulo = (p.misionId && getMission(p.misionId)?.titulo) || 'la misión';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.hero}>
        <Svg width={320} height={320} style={styles.halo} accessible={false}>
          <Defs>
            <RadialGradient id="aura">
              <Stop offset="0" stopColor={completada ? colors.amarillo : colors.morado} stopOpacity={0.35} />
              <Stop offset="1" stopColor={completada ? colors.amarillo : colors.morado} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={160} cy={160} r={160} fill="url(#aura)" />
        </Svg>
        <SonidoDeEntrada nombre={completada ? 'celebracion' : null} conLogro={idsLogros(p).length > 0} />
        <Kubi
          expression={completada ? 'celebrando' : 'feliz'}
          reaccion={completada ? 'fiesta' : undefined}
          size={220}
          accessibilityLabel={completada ? 'KUBI celebrando' : 'KUBI dándote ánimo'}
        />
      </View>

      <View style={styles.copy}>
        <AppText variant="title" style={styles.centerText} accessibilityRole="header" testID="titulo-recompensa">
          {completada ? '¡Misión cumplida!' : '¡Casi lo logras!'}
        </AppText>
        <AppText color={colors.textoSecundario} style={styles.centerText}>
          {completada
            ? `Completaste ${titulo}. ¡Sigue avanzando en el mapa!`
            : 'Te quedaste sin corazones, pero cada error te acerca a la respuesta. ¡Inténtalo de nuevo!'}
        </AppText>
      </View>

      {idsLogros(p).length > 0 && (
        <View style={styles.bannerWrap}>
          <LogroBanner ids={idsLogros(p)} />
        </View>
      )}

      <View style={styles.stats}>
        <Stat
          icon={<XpIcon size={26} />}
          value={`+${xp}`}
          label="XP ganado"
          bg={colors.amarilloSuave}
          color={colors.amarilloOscuro}
          testID="stat-xp"
        />
        <Stat
          icon={
            <View style={styles.checkBadge}>
              <CheckIcon size={16} />
            </View>
          }
          value={`${correctas}/${total}`}
          label="Correctas"
          bg={colors.celesteSuave}
          color={colors.celesteOscuro}
          testID="stat-correctas"
        />
        <Stat
          icon={<HeartIcon size={24} />}
          value={String(corazones)}
          label="Corazones"
          bg={colors.superficieSuave}
          color={colors.violeta}
        />
      </View>

      <View style={styles.actions}>
        {completada ? (
          <Button label="Continuar" onPress={() => router.dismissTo('/mapa')} testID="boton-continuar-mapa" />
        ) : (
          <>
            <Button
              label="Reintentar"
              testID="boton-reintentar"
              onPress={() =>
                router.replace({ pathname: '/desafio/[misionId]', params: { misionId: p.misionId ?? '' } })
              }
            />
            <Button label="Volver al mapa" variant="secondary" onPress={() => router.dismissTo('/mapa')} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

/** Resultados de la práctica PAES: logro total y por eje. */
function ResultadosPractica({ p }: { p: Params }) {
  const correctas = Number(p.correctas ?? 0);
  const total = Number(p.total ?? 0) || 1;
  const xp = Number(p.xp ?? 0);
  const logro = Math.round((correctas / total) * 100);
  const ejes = decodificarResumen(p.resumen);
  const bien = logro >= 60;
  const debil = ejes.filter((e) => e.total > 0).sort((a, b) => a.correctas / a.total - b.correctas / b.total)[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.practicaScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.practicaHero}>
          <SonidoDeEntrada nombre={bien ? 'celebracion' : null} conLogro={idsLogros(p).length > 0} />
          <Kubi
            expression={bien ? 'celebrando' : 'feliz'}
            reaccion={bien ? 'fiesta' : undefined}
            size={150}
            accessibilityLabel={bien ? 'KUBI celebrando' : 'KUBI dándote ánimo'}
          />
        </View>

        <View style={styles.copy}>
          <AppText variant="title" style={styles.centerText} accessibilityRole="header" testID="titulo-recompensa">
            ¡Práctica terminada!
          </AppText>
          <AppText color={colors.textoSecundario} style={styles.centerText}>
            {bien
              ? `Lograste el ${logro} % de la práctica. ¡Vas bien encaminado!`
              : `Lograste el ${logro} %. Cada práctica te deja más preparado.`}
            {debil && debil.correctas < debil.total ? ` Te conviene reforzar ${debil.nombre}.` : ''}
          </AppText>
        </View>

        {idsLogros(p).length > 0 && (
          <View style={styles.bannerWrap}>
            <LogroBanner ids={idsLogros(p)} />
          </View>
        )}

        <View style={styles.ejes}>
          {ejes.map((e) => (
            <View
              key={e.eje}
              style={styles.eje}
              accessible
              accessibilityLabel={`${e.nombre}: ${e.correctas} de ${e.total}`}
              testID={`eje-${e.eje}`}
            >
              <View style={styles.ejeFila}>
                <AppText variant="label">{e.nombre}</AppText>
                <AppText variant="label" color={colors.violeta}>
                  {e.correctas}/{e.total}
                </AppText>
              </View>
              <ProgressBar value={e.total ? e.correctas / e.total : 0} height={10} color={colors.morado} />
            </View>
          ))}
        </View>

        <View style={styles.stats}>
          <Stat icon={<XpIcon size={26} />} value={`+${xp}`} label="XP ganado" bg={colors.amarilloSuave} color={colors.amarilloOscuro} testID="stat-xp" />
          <Stat
            icon={
              <View style={styles.checkBadge}>
                <CheckIcon size={16} />
              </View>
            }
            value={`${correctas}/${total}`}
            label="Correctas"
            bg={colors.celesteSuave}
            color={colors.celesteOscuro}
            testID="stat-correctas"
          />
          <Stat icon={<View style={styles.pctBadge}><AppText variant="caption" color={colors.blanco}>%</AppText></View>} value={`${logro} %`} label="Logro" bg={colors.superficieSuave} color={colors.violeta} testID="stat-logro" />
        </View>

        <AppText variant="caption" color={colors.textoSecundario} style={[styles.centerText, styles.nota]}>
          {pruebaDe(p.misionId) === 'M2'
            ? 'Práctica de repaso con preguntas de 3.º y 4.º medio.'
            : 'Práctica de repaso con preguntas de 7.º básico a 2.º medio.'}{' '}
          No es un ensayo oficial ni entrega puntaje PAES.
        </AppText>

        <View style={styles.actions}>
          <Button
            label="Otra práctica"
            testID="boton-otra-practica"
            onPress={() =>
              router.replace({ pathname: '/desafio/[misionId]', params: { misionId: PRACTICAS[pruebaDe(p.misionId)].id, semilla: String(Date.now()) } })
            }
          />
          <Button label="Volver al mapa" variant="secondary" onPress={() => router.dismissTo('/mapa')} testID="boton-continuar-mapa" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/** Componente sin dibujo: suena al aparecer la pantalla. */
function SonidoDeEntrada({ nombre, conLogro }: { nombre: 'celebracion' | null; conLogro: boolean }) {
  useSonidoDeEntrada(nombre, conLogro);
  return null;
}

function Stat({
  icon,
  value,
  label,
  bg,
  color,
  testID,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  bg: string;
  color: string;
  testID?: string;
}) {
  return (
    <View style={[styles.stat, { backgroundColor: bg }]} accessible accessibilityLabel={`${label}: ${value}`} testID={testID}>
      {icon}
      <AppText variant="title" color={color}>
        {value}
      </AppText>
      <AppText variant="caption" color={colors.textoSecundario}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.fondo, paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: spacing.xl },
  halo: { position: 'absolute' },
  copy: { gap: spacing.sm, marginBottom: spacing.xl },
  centerText: { textAlign: 'center' },
  stats: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  stat: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: spacing.lg, borderRadius: radius.lg },
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.celesteOscuro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: { gap: spacing.md },
  bannerWrap: { marginBottom: spacing.lg },
  practicaScroll: { flexGrow: 1, justifyContent: 'flex-end', paddingTop: spacing.lg },
  practicaHero: { alignItems: 'center', marginBottom: spacing.md },
  ejes: { gap: spacing.md, marginBottom: spacing.xl },
  eje: { gap: 6 },
  ejeFila: { flexDirection: 'row', justifyContent: 'space-between' },
  nota: { marginBottom: spacing.lg },
  pctBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.violeta,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
