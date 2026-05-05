const LETRAS = ["A", "B", "C", "D"];

export default function QuestionCard({
  pregunta, indice, total, seleccion,
  respondida, onResponder, categoria, isMobile,
}) {
  const color = categoria?.color || "#F6B40E";

  const getEstilo = (idx) => {
    if (!respondida) {
      return {
        bg:     "#16162a",
        border: "#2a2a4a",
        color:  "#e8e8f0",
        letraBg: "#2a2a4a",
        letraColor: color,
      };
    }
    const esCorrecta = idx === pregunta.correcta;
    const esElegida  = idx === seleccion;

    if (esCorrecta) return {
      bg:      "rgba(34,197,94,0.15)",
      border:  "#22c55e",
      color:   "#e8e8f0",
      letraBg: "#22c55e",
      letraColor: "#ffffff",
    };
    if (esElegida && !esCorrecta) return {
      bg:      "rgba(239,68,68,0.15)",
      border:  "#ef4444",
      color:   "#e8e8f0",
      letraBg: "#ef4444",
      letraColor: "#ffffff",
    };
    return {
      bg:      "#16162a",
      border:  "#1a1a2e",
      color:   "#4a4a6a",
      letraBg: "#1a1a2e",
      letraColor: "#4a4a6a",
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: 560 }}>

      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        marginBottom:   isMobile ? 10 : 14,
      }}>
        <span style={{
          fontSize:   isMobile ? 11 : 12,
          color:      color,
          letterSpacing: 2,
          fontWeight: "bold",
        }}>
          {categoria?.emoji} {categoria?.label?.toUpperCase()}
        </span>
        <span style={{ fontSize: isMobile ? 11 : 12, color: "#5a5a7a", letterSpacing: 2 }}>
          {indice + 1} / {total}
        </span>
      </div>

      <div style={{
        width: "100%", height: 3, background: "#2a2a3a",
        borderRadius: 2, marginBottom: isMobile ? 16 : 24, overflow: "hidden",
      }}>
        <div style={{
          width:      `${((indice + 1) / total) * 100}%`,
          height:     "100%",
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 2,
          transition: "width 0.4s ease",
        }} />
      </div>

      <div style={{
        background:   "#16162a",
        border:       `1px solid #2a2a4a`,
        borderRadius: 12,
        padding:      isMobile ? "16px" : "24px",
        marginBottom: isMobile ? 14 : 20,
        minHeight:    isMobile ? 80 : 100,
        display:      "flex",
        alignItems:   "center",
      }}>
        <p style={{
          margin:     0,
          fontSize:   isMobile ? 15 : 18,
          color:      "#e8e8f0",
          lineHeight: 1.5,
          fontWeight: 500,
        }}>
          {pregunta.pregunta}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 8 : 10 }}>
        {pregunta.opciones.map((opcion, idx) => {
          const est = getEstilo(idx);
          return (
            <button
              key={idx}
              onClick={() => !respondida && onResponder(idx)}
              style={{
                display:     "flex",
                alignItems:  "center",
                gap:         12,
                padding:     isMobile ? "12px 14px" : "14px 18px",
                background:  est.bg,
                border:      `2px solid ${est.border}`,
                borderRadius: 10,
                cursor:       respondida ? "default" : "pointer",
                transition:   "all 0.2s ease",
                textAlign:    "left",
                width:        "100%",
                touchAction:  "manipulation",
              }}
              onMouseEnter={(e) => {
                if (respondida) return;
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.background  = `${color}18`;
              }}
              onMouseLeave={(e) => {
                if (respondida) return;
                e.currentTarget.style.borderColor = "#2a2a4a";
                e.currentTarget.style.background  = "#16162a";
              }}
            >
              <span style={{
                width:          28,
                height:         28,
                borderRadius:   "50%",
                background:     est.letraBg,
                color:          est.letraColor,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                fontSize:       12,
                fontWeight:     "bold",
                flexShrink:     0,
                transition:     "all 0.2s",
              }}>
                {LETRAS[idx]}
              </span>
              <span style={{
                fontSize:   isMobile ? 13 : 15,
                color:      est.color,
                lineHeight: 1.4,
                fontFamily: "inherit",
                transition: "color 0.2s",
              }}>
                {opcion}
              </span>
              {respondida && idx === pregunta.correcta && (
                <span style={{ marginLeft: "auto", fontSize: 18 }}>✅</span>
              )}
              {respondida && idx === seleccion && idx !== pregunta.correcta && (
                <span style={{ marginLeft: "auto", fontSize: 18 }}>❌</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
