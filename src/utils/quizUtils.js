import { PREGUNTAS } from "../data/preguntas";
import {
  PUNTOS_BASE, BONUS_RACHA, RACHA_PARA_BONUS,
  PREGUNTAS_POR_PARTIDA, LS_SCORES,
} from "../data/constants";

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function obtenerPreguntas(categoriaId) {
  let pool;

  if (categoriaId === "MIX") {
    pool = [
      ...PREGUNTAS.MUSICA,
      ...PREGUNTAS.CINE,
      ...PREGUNTAS.SERIES,
    ];
  } else {
    pool = PREGUNTAS[categoriaId] || [];
  }

  return shuffle(pool).slice(0, PREGUNTAS_POR_PARTIDA);
}

export function calcularPuntos(rachaActual) {
  const esBonus = rachaActual > 0 && rachaActual % RACHA_PARA_BONUS === 0;
  return PUNTOS_BASE + (esBonus ? BONUS_RACHA : 0);
}

export function guardarPuntaje(nombre, puntaje, categoria) {
  let scores = [];
  try {
    scores = JSON.parse(localStorage.getItem(LS_SCORES)) || [];
  } catch {
    scores = [];
  }
  scores.push({
    nombre:    nombre.trim() || "ANÓNIMO",
    puntaje,
    categoria,
    fecha:     new Date().toLocaleDateString("es-AR"),
  });
  scores.sort((a, b) => b.puntaje - a.puntaje);
  const top5 = scores.slice(0, 5);
  localStorage.setItem(LS_SCORES, JSON.stringify(top5));
  return top5;
}

export function cargarHighscores() {
  try {
    return JSON.parse(localStorage.getItem(LS_SCORES)) || [];
  } catch {
    return [];
  }
}

export function mensajeFinal(puntaje, total) {
  const porcentaje = puntaje / (total * PUNTOS_BASE);
  if (porcentaje >= 0.9) return { texto: "¡BRILLANTE! 🌟", color: "#F6B40E" };
  if (porcentaje >= 0.7) return { texto: "¡MUY BIEN! 🎉", color: "#00D4FF" };
  if (porcentaje >= 0.5) return { texto: "¡BIEN! 👏",     color: "#E91E8C" };
  return { texto: "SEGUÍ PRACTICANDO 💪",                   color: "#FF6B35" };
}
