import { CATEGORIAS } from "../data/constants";

const medallas = ["🥇", "🥈", "🥉", "4°", "5°"];

export default function Leaderboard({ highscores, isMobile }) {
  return (
    <div style={{
      width:        "100%",
      maxWidth:     560,
      background:   "#0e0e1a",
      border:       "1px solid #2a2a4a",
      borderRadius: 12,
      padding:      isMobile ? "16px" : "20px",
    }}>
      <div style={{
        fontSize:      12,
        color:         "#5a5a7a",
        letterSpacing: 3,
        marginBottom:  14,
        textTransform: "uppercase",
      }}>
        🏆 Tabla de récords
      </div>

      {highscores.length === 0 ? (
        <div style={{ fontSize: 13, color: "#3a3a5a", textAlign: "center", padding: "12px 0" }}>
          Aún no hay registros. ¡Jugá!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {highscores.map((entry, i) => {
            const catColor = Object.values(CATEGORIAS).find(
              (c) => c.label === entry.categoria
            )?.color || "#F6B40E";

            return (
              <div key={i} style={{
                display:        "flex",
                alignItems:     "center",
                gap:            10,
                padding:        "10px 12px",
                background:     i === 0 ? "rgba(246,180,14,0.08)" : "#16162a",
                borderRadius:   8,
                border:         `1px solid ${i === 0 ? "rgba(246,180,14,0.2)" : "#2a2a4a"}`,
              }}>
                <span style={{ fontSize: 16, minWidth: 28 }}>{medallas[i]}</span>
                <span style={{
                  flex:         1,
                  fontSize:     13,
                  color:        i === 0 ? "#F6B40E" : "#9a9ab8",
                  fontWeight:   i === 0 ? "bold" : "normal",
                  overflow:     "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace:   "nowrap",
                }}>
                  {entry.nombre}
                </span>
                <span style={{
                  fontSize:   10,
                  color:      catColor,
                  letterSpacing: 1,
                  padding:    "2px 6px",
                  background: `${catColor}18`,
                  borderRadius: 4,
                  flexShrink: 0,
                }}>
                  {entry.categoria}
                </span>
                <span style={{
                  fontSize:   15,
                  fontWeight: "bold",
                  color:      i === 0 ? "#F6B40E" : "#e8e8f0",
                  minWidth:   44,
                  textAlign:  "right",
                }}>
                  {entry.puntaje}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
