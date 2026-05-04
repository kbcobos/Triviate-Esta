import { RACHA_PARA_BONUS } from "../data/constants";

export default function StreakBar({ racha, isMobile }) {
  if (racha === 0) return null;

  const progreso    = (racha % RACHA_PARA_BONUS) || RACHA_PARA_BONUS;
  const esBonus     = racha > 0 && racha % RACHA_PARA_BONUS === 0;
  const porcentaje  = (progreso / RACHA_PARA_BONUS) * 100;

  return (
    <div style={{
      width:      "100%",
      maxWidth:   560,
      marginBottom: isMobile ? 10 : 14,
    }}>
      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        marginBottom:   4,
      }}>
        <span style={{
          fontSize:      11,
          color:         "#F6B40E",
          letterSpacing: 2,
          fontWeight:    "bold",
        }}>
          🔥 RACHA x {racha}
        </span>
        {esBonus ? (
          <span style={{
            fontSize:      11,
            color:         "#F6B40E",
            letterSpacing: 1,
            animation:     "pulso 0.6s ease",
          }}>
            ⭐ +50 BONUS
          </span>
        ) : (
          <span style={{ fontSize: 10, color: "#5a5a7a", letterSpacing: 1 }}>
            {RACHA_PARA_BONUS - progreso} para bonus
          </span>
        )}
      </div>

      <div style={{
        width:        "100%",
        height:       4,
        background:   "#2a2a3a",
        borderRadius: 2,
        overflow:     "hidden",
      }}>
        <div style={{
          width:        `${porcentaje}%`,
          height:       "100%",
          background:   "linear-gradient(90deg, #F6B40E, #ffdd57)",
          borderRadius: 2,
          transition:   "width 0.3s ease",
          boxShadow:    "0 0 8px rgba(246,180,14,0.5)",
        }} />
      </div>
    </div>
  );
}
