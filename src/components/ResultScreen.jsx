import { useState } from "react";
import { PREGUNTAS_POR_PARTIDA } from "../data/constants";
import { mensajeFinal } from "../utils/quizUtils";

export default function ResultScreen({
  puntaje, correctas, maxRacha, categoria,
  highscores, onGuardar, onReiniciar, isMobile,
}) {
  const [nombre,   setNombre]   = useState("");
  const [guardado, setGuardado] = useState(false);

  const { texto, color } = mensajeFinal(puntaje, PREGUNTAS_POR_PARTIDA);
  const esTopScore = highscores.length < 5 ||
    puntaje > (highscores[highscores.length - 1]?.puntaje ?? 0);

  const handleGuardar = () => {
    if (guardado) return;
    onGuardar(nombre || "ANÓNIMO");
    setGuardado(true);
  };

  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center",
      width:         "100%",
      maxWidth:      480,
      padding:       "0 8px",
    }}>

      <div style={{
        fontSize:      isMobile ? 24 : 32,
        fontWeight:    "bold",
        color:         color,
        letterSpacing: 3,
        marginBottom:  6,
        textAlign:     "center",
        textShadow:    `0 0 20px ${color}66`,
      }}>
        {texto}
      </div>

      <div style={{ fontSize: 13, color: "#5a5a7a", letterSpacing: 2, marginBottom: 24 }}>
        {categoria?.emoji} {categoria?.label?.toUpperCase()}
      </div>

      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap:                 isMobile ? 10 : 14,
        width:               "100%",
        marginBottom:        24,
      }}>
        {[
          { label: "PUNTAJE",  valor: puntaje,                        color: color   },
          { label: "CORRECTAS", valor: `${correctas}/${PREGUNTAS_POR_PARTIDA}`, color: "#22c55e" },
          { label: "MAX RACHA", valor: `🔥 ${maxRacha}`,              color: "#F6B40E" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background:   "#16162a",
            border:       "1px solid #2a2a4a",
            borderRadius: 10,
            padding:      isMobile ? "12px 8px" : "16px 12px",
            textAlign:    "center",
          }}>
            <div style={{ fontSize: 10, color: "#5a5a7a", letterSpacing: 2, marginBottom: 6 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: "bold", color: stat.color }}>
              {stat.valor}
            </div>
          </div>
        ))}
      </div>

      {!guardado ? (
        <div style={{ width: "100%", marginBottom: 16 }}>
          {esTopScore && (
            <div style={{
              textAlign:    "center",
              fontSize:     12,
              color:        "#F6B40E",
              letterSpacing: 1,
              marginBottom: 10,
              fontWeight:   "bold",
            }}>
              ⭐ ¡ENTRÁS AL TOP 5! ⭐
            </div>
          )}
          <div style={{ fontSize: 11, color: "#5a5a7a", letterSpacing: 2, marginBottom: 6 }}>
            TU NOMBRE
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value.slice(0, 14))}
              onKeyDown={(e) => e.key === "Enter" && handleGuardar()}
              placeholder="Tu nombre..."
              maxLength={14}
              style={{
                flex:         1,
                padding:      "10px 14px",
                background:   "#16162a",
                border:       "2px solid #2a2a4a",
                borderRadius: 8,
                color:        "#e8e8f0",
                fontFamily:   "inherit",
                fontSize:     14,
                outline:      "none",
              }}
              autoFocus
            />
            <button
              onClick={handleGuardar}
              style={{
                padding:      "10px 18px",
                background:   color,
                border:       "none",
                borderRadius: 8,
                color:        "#0a0a14",
                fontFamily:   "inherit",
                fontSize:     13,
                fontWeight:   "bold",
                cursor:       "pointer",
                letterSpacing: 1,
                transition:   "opacity 0.2s",
                flexShrink:   0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              GUARDAR
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          fontSize:     13, color: "#22c55e",
          marginBottom: 16, letterSpacing: 1,
        }}>
          ✅ ¡Puntaje guardado!
        </div>
      )}

      <div style={{ display: "flex", gap: 10, width: "100%" }}>
        <button
          onClick={onReiniciar}
          style={{
            flex:          1,
            padding:       "12px",
            background:    color,
            border:        "none",
            borderRadius:  10,
            color:         "#0a0a14",
            fontFamily:    "inherit",
            fontSize:      isMobile ? 13 : 14,
            fontWeight:    "bold",
            letterSpacing: 2,
            cursor:        "pointer",
            transition:    "opacity 0.2s, transform 0.1s",
            touchAction:   "manipulation",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          JUGAR DE NUEVO
        </button>
      </div>
    </div>
  );
}
