import { useState, useCallback } from "react";
import { ESTADO, PREGUNTAS_POR_PARTIDA } from "../data/constants";
import {
  obtenerPreguntas, calcularPuntos,
  guardarPuntaje, cargarHighscores,
} from "../utils/quizUtils";

export function useQuiz() {
  const [status,      setStatus]      = useState(ESTADO.INICIO);
  const [categoria,   setCategoria]   = useState(null);
  const [preguntas,   setPreguntas]   = useState([]);
  const [indice,      setIndice]      = useState(0);
  const [puntaje,     setPuntaje]     = useState(0);
  const [racha,       setRacha]       = useState(0);
  const [maxRacha,    setMaxRacha]    = useState(0);
  const [seleccion,   setSeleccion]   = useState(null);
  const [respondida,  setRespondida]  = useState(false);
  const [correctas,   setCorrectas]   = useState(0);
  const [highscores,  setHighscores]  = useState(() => cargarHighscores());

  const iniciar = useCallback((cat) => {
    const pool = obtenerPreguntas(cat.id);
    setCategoria(cat);
    setPreguntas(pool);
    setIndice(0);
    setPuntaje(0);
    setRacha(0);
    setMaxRacha(0);
    setSeleccion(null);
    setRespondida(false);
    setCorrectas(0);
    setStatus(ESTADO.JUGANDO);
  }, []);

  const responder = useCallback((opcionIdx) => {
    if (respondida) return;

    setSeleccion(opcionIdx);
    setRespondida(true);

    const esCorrecta = opcionIdx === preguntas[indice].correcta;

    if (esCorrecta) {
      const nuevaRacha = racha + 1;
      const puntos     = calcularPuntos(nuevaRacha);
      setRacha(nuevaRacha);
      setMaxRacha((prev) => Math.max(prev, nuevaRacha));
      setPuntaje((prev) => prev + puntos);
      setCorrectas((prev) => prev + 1);
    } else {
      setRacha(0);
    }
  }, [respondida, preguntas, indice, racha]);

  const siguiente = useCallback(() => {
    const siguienteIndice = indice + 1;

    if (siguienteIndice >= PREGUNTAS_POR_PARTIDA) {
      setStatus(ESTADO.RESULTADO);
    } else {
      setIndice(siguienteIndice);
      setSeleccion(null);
      setRespondida(false);
    }
  }, [indice]);

  const guardarResultado = useCallback((nombre) => {
    const nuevos = guardarPuntaje(nombre, puntaje, categoria?.label || "");
    setHighscores(nuevos);
  }, [puntaje, categoria]);

  const reiniciar = useCallback(() => {
    setStatus(ESTADO.INICIO);
    setCategoria(null);
    setPreguntas([]);
    setIndice(0);
    setPuntaje(0);
    setRacha(0);
    setMaxRacha(0);
    setSeleccion(null);
    setRespondida(false);
    setCorrectas(0);
  }, []);

  return {
    status,
    categoria,
    preguntas,
    indice,
    puntaje,
    racha,
    maxRacha,
    seleccion,
    respondida,
    correctas,
    highscores,
    iniciar,
    responder,
    siguiente,
    guardarResultado,
    reiniciar,
  };
}
