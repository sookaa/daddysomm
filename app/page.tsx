export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <h1
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "clamp(40px, 9vw, 60px)",
          fontWeight: "bold",
          letterSpacing: "-0.02em",
          margin: 0,
          textAlign: "center",
          color: "var(--text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
        }}
      >
        daddy
        <svg viewBox="0 0 24 32" width="34" height="46" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="3" rx="1" fill="var(--link)" />
          <rect x="10" y="5" width="4" height="8" fill="var(--link)" />
          <path d="M 12,13 Q 7,15 12,18 Q 17,20 12,23 Q 7,25 12,28" fill="none" stroke="var(--link)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        somm
      </h1>
      <p
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "15px",
          color: "var(--muted)",
          margin: "14px 0 0",
          letterSpacing: "0.03em",
          fontStyle: "italic",
        }}
      >
        wine, irreverently
      </p>
      <a
        href="/sign-in"
        style={{
          marginTop: "2.75rem",
          display: "inline-block",
          background: "var(--link)",
          color: "#fff",
          fontFamily: "Verdana, sans-serif",
          fontSize: "15px",
          fontWeight: "bold",
          padding: "14px 40px",
          borderRadius: "6px",
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        Sign in / Sign up
      </a>
    </div>
  );
}
