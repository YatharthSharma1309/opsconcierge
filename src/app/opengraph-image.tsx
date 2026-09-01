import { ImageResponse } from "next/og";

export const alt = "OpsConcierge — AI Ops Desk (Support + Hiring)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "#050508",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-80px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(62,232,200,0.18) 0%, rgba(62,232,200,0.04) 45%, transparent 70%)",
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#3ee8c8",
          }}
        >
          Support + Hiring · Next.js · RAG
        </p>
        <h1
          style={{
            margin: "20px 0 0",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#f4f4f5",
            maxWidth: 980,
          }}
        >
          OpsConcierge
        </h1>
        <p
          style={{
            margin: "24px 0 0",
            fontSize: 28,
            fontWeight: 600,
            color: "#d4d4d8",
            maxWidth: 900,
          }}
        >
          AI ops desk for small businesses
        </p>
        <p
          style={{
            margin: "20px 0 0",
            fontSize: 22,
            lineHeight: 1.45,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          Widget FAQ deflection, tickets with full chat, execution logs, and
          resume shortlisting with evidence.
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
          <span
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(62,232,200,0.35)",
              color: "#3ee8c8",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Live demo
          </span>
          <span
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px dashed rgba(62,232,200,0.25)",
              color: "#e4e4e7",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            No sign-in required
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
