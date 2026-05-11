import { useState } from "react";
import { useQuiz }       from "./hooks/useQuiz";
import { useWindowSize } from "./hooks/useWindowSize";
import CategoryScreen    from "./components/CategoryScreen";
import QuestionCard      from "./components/QuestionCard";
import StreakBar          from "./components/StreakBar";
import ResultScreen      from "./components/ResultScreen";
import Leaderboard       from "./components/Leaderboard";
import { ESTADO, PREGUNTAS_POR_PARTIDA } from "./data/constants";

export default function App() {
  const {
    status, categoria, preguntas, indice,
    puntaje, racha, maxRacha, seleccion,
    respondida, correctas, highscores,
    iniciar, responder, siguiente,
    guardarResultado, reiniciar,
  } = useQuiz();

  const [mostrarLeaderboard, setMostrarLeaderboard] = useState(false);
  const { isMobile } = useWindowSize();

  const color = categoria?.color || "#F6B40E";

  return (
    <div style={{
      minHeight:     "100vh",
      background:    "#0a0a14",
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center",
      fontFamily:    "'Segoe UI', system-ui, sans-serif",
      padding:       isMobile ? "0 8px 24px" : "0 16px 32px",
    }}>

      <div style={{
        position:   "fixed",
        inset:      0,
        pointerEvents: "none",
        background: `
          radial-gradient(ellipse at 20% 0%, rgba(233,30,140,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 0%, rgba(0,212,255,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, rgba(246,180,14,0.04) 0%, transparent 50%)
        `,
      }} />

      <div style={{
        width:          "100%",
        maxWidth:       600,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        isMobile ? "16px 0 14px" : "24px 0 18px",
        borderBottom:   "1px solid #1a1a2e",
        marginBottom:   isMobile ? 20 : 28,
        position:       "relative",
        zIndex:         1,
      }}>
        <div>
          <div style={{
            fontSize:      isMobile ? 9 : 11,
            letterSpacing: 5,
            color:         "#3a3a5a",
            textTransform: "uppercase",
            marginBottom:  4,
          }}>
            🎬 POP CULTURE QUIZ
          </div>
          <h1 style={{
            margin:        0,
            fontSize:      isMobile ? 22 : 28,
            fontWeight:    800,
            background:    "linear-gradient(135deg, #F6B40E, #E91E8C, #00D4FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
            letterSpacing:        2,
          }}>
            TRIVIATE ESTA!
          </h1>
        </div>

        <button
          onClick={() => setMostrarLeaderboard(!mostrarLeaderboard)}
          style={{
            padding:      "8px 14px",
            background:   mostrarLeaderboard ? "rgba(246,180,14,0.15)" : "#16162a",
            border:       `1.5px solid ${mostrarLeaderboard ? "#F6B40E" : "#2a2a4a"}`,
            borderRadius: 8,
            color:        mostrarLeaderboard ? "#F6B40E" : "#5a5a7a",
            fontFamily:   "inherit",
            fontSize:     isMobile ? 11 : 12,
            fontWeight:   "bold",
            letterSpacing: 1,
            cursor:       "pointer",
            transition:   "all 0.2s",
            touchAction:  "manipulation",
          }}
        >
          🏆 {isMobile ? "" : "RÉCORDS"}
        </button>
      </div>

      <div style={{
        width:         "100%",
        maxWidth:      600,
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        position:      "relative",
        zIndex:        1,
      }}>

        {mostrarLeaderboard && (
          <div style={{ width: "100%", marginBottom: 24 }}>
            <Leaderboard highscores={highscores} isMobile={isMobile} />
          </div>
        )}

        {(status === ESTADO.INICIO || status === ESTADO.CATEGORIA) && (
          <>
            {!mostrarLeaderboard && (
              <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 40 }}>
                <div style={{ fontSize: isMobile ? 48 : 64, marginBottom: 12 }}>🎬🎵📺</div>
                <h2 style={{
                  margin:     0,
                  fontSize:   isMobile ? 20 : 26,
                  color:      "#e8e8f0",
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}>
                  ¿Cuánto sabés de<br />
                  <span style={{
                    background:          "linear-gradient(135deg, #F6B40E, #E91E8C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor:  "transparent",
                    backgroundClip:       "text",
                  }}>
                    cultura pop?
                  </span>
                </h2>
                <p style={{
                  margin:     "10px 0 0",
                  fontSize:   isMobile ? 12 : 14,
                  color:      "#3a3a5a",
                  letterSpacing: 1,
                }}>
                  {PREGUNTAS_POR_PARTIDA} preguntas · Racha con bonus · Top 5
                </p>
              </div>
            )}

            <CategoryScreen
              onElegir={iniciar}
              highscores={highscores}
              isMobile={isMobile}
            />
          </>
        )}

        {status === ESTADO.JUGANDO && preguntas.length > 0 && (
          <>
            <div style={{
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "center",
              width:          "100%",
              maxWidth:       560,
              marginBottom:   isMobile ? 10 : 14,
            }}>
              <div style={{
                fontSize:   isMobile ? 13 : 15,
                fontWeight: "bold",
                color:      color,
                letterSpacing: 1,
              }}>
                {puntaje} pts
              </div>
              {racha >= 2 && (
                <div style={{
                  fontSize:   isMobile ? 12 : 13,
                  color:      "#F6B40E",
                  letterSpacing: 1,
                }}>
                  🔥 × {racha}
                </div>
              )}
            </div>

            <StreakBar racha={racha} isMobile={isMobile} />

            <QuestionCard
              pregunta={preguntas[indice]}
              indice={indice}
              total={PREGUNTAS_POR_PARTIDA}
              seleccion={seleccion}
              respondida={respondida}
              onResponder={responder}
              categoria={categoria}
              isMobile={isMobile}
            />

            {respondida && (
              <button
                onClick={siguiente}
                style={{
                  marginTop:     isMobile ? 16 : 20,
                  padding:       isMobile ? "12px 36px" : "14px 48px",
                  background:    color,
                  border:        "none",
                  borderRadius:  10,
                  color:         "#0a0a14",
                  fontFamily:    "inherit",
                  fontSize:      isMobile ? 13 : 15,
                  fontWeight:    "bold",
                  letterSpacing: 2,
                  cursor:        "pointer",
                  transition:    "opacity 0.2s, transform 0.1s",
                  boxShadow:     `0 4px 20px ${color}44`,
                  animation:     "aparecer 0.3s ease",
                  touchAction:   "manipulation",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity   = "0.9";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity   = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {indice + 1 >= PREGUNTAS_POR_PARTIDA ? "VER RESULTADO →" : "SIGUIENTE →"}
              </button>
            )}
          </>
        )}

        {status === ESTADO.RESULTADO && (
          <ResultScreen
            puntaje={puntaje}
            correctas={correctas}
            maxRacha={maxRacha}
            categoria={categoria}
            highscores={highscores}
            onGuardar={guardarResultado}
            onReiniciar={reiniciar}
            isMobile={isMobile}
          />
        )}
      </div>

      <div style={{
        marginTop:     32,
        fontSize:      12,
        color:         "#8686ce",
        letterSpacing: 2,
        position:      "relative",
        zIndex:        1,
      }}>
        Hecho por Katherine Cobos
      </div>
    </div>
  );
}
