import { CATEGORIAS } from "../data/constants";

export default function CategoryScreen({ onElegir, highscores, isMobile }) {
  const mejorPuntaje = highscores.length > 0 ? highscores[0].puntaje : 0;

  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center",
      width:         "100%",
      maxWidth:      560,
      padding:       "0 8px",
    }}>

      <div style={{ textAlign: "center", marginBottom: isMobile ? 24 : 36 }}>
        <div style={{
          fontSize:      isMobile ? 11 : 13,
          letterSpacing: 6,
          color:         "#F6B40E",
          textTransform: "uppercase",
          marginBottom:  8,
        }}>
          ✦ Elegí tu categoría ✦
        </div>
        <h2 style={{
          margin:        0,
          fontSize:      isMobile ? 18 : 22,
          color:         "#e8e8f0",
          fontWeight:    400,
          letterSpacing: 1,
        }}>
          ¿De qué querés que sean las preguntas?
        </h2>
      </div>

      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:                 isMobile ? 12 : 16,
        width:               "100%",
        marginBottom:        isMobile ? 24 : 32,
      }}>
        {Object.values(CATEGORIAS).map((cat) => (
          <button
            key={cat.id}
            onClick={() => onElegir(cat)}
            style={{
              padding:       isMobile ? "20px 12px" : "28px 16px",
              background:    cat.bg,
              border:        `2px solid ${cat.color}33`,
              borderRadius:  12,
              cursor:        "pointer",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              gap:           8,
              transition:    "all 0.2s ease",
              touchAction:   "manipulation",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background   = cat.bg.replace("0.12", "0.25");
              e.currentTarget.style.borderColor  = cat.color;
              e.currentTarget.style.transform    = "translateY(-3px)";
              e.currentTarget.style.boxShadow    = `0 8px 24px ${cat.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background   = cat.bg;
              e.currentTarget.style.borderColor  = `${cat.color}33`;
              e.currentTarget.style.transform    = "translateY(0)";
              e.currentTarget.style.boxShadow    = "none";
            }}
          >
            <span style={{ fontSize: isMobile ? 32 : 40 }}>{cat.emoji}</span>
            <span style={{
              fontSize:      isMobile ? 14 : 16,
              fontWeight:    "bold",
              color:         cat.color,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily:    "inherit",
            }}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {mejorPuntaje > 0 && (
        <div style={{
          fontSize:      12,
          color:         "#5a5a7a",
          letterSpacing: 2,
          textAlign:     "center",
        }}>
          🏆 RÉCORD GLOBAL: <span style={{ color: "#F6B40E", fontWeight: "bold" }}>{mejorPuntaje}</span>
        </div>
      )}
    </div>
  );
}
