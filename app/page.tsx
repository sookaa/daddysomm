import SignupForm from "@/components/SignupForm";

const WINE_GLASS = `
         .
        ':'
        ':'
   .'''''''''.
   :..:::::::.:
   :  ':::::' :
    :  ':::' :
     '.  :  .'
       '.|.'
        |||
        |||
        |||
      .:|||:.
    .:::::::::.
`;

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
      {/* ASCII Wine Glass */}
      <pre
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "clamp(0.55rem, 1.8vw, 0.85rem)",
          lineHeight: 1.3,
          color: "var(--accent)",
          textAlign: "center",
          marginBottom: "2.5rem",
          userSelect: "none",
        }}
      >
        {WINE_GLASS}
      </pre>

      {/* Name */}
      <h1
        style={{
          fontFamily: '"Fraunces", serif',
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          marginBottom: "0.5rem",
          textAlign: "center",
        }}
      >
        daddysomm
      </h1>

      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "0.8rem",
          color: "var(--muted)",
          marginBottom: "3.5rem",
          letterSpacing: "0.05em",
        }}
      >
        wine, irreverently
      </p>

      {/* Signup Forms */}
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <SignupForm
          endpoint="/api/newsletter"
          label="The Newsletter"
          sublabel="Notes on wine. No scores, no gatekeeping."
          buttonText="subscribe"
          successMessage="You're in. Check your inbox."
        />

        <div
          style={{
            borderTop: "1px solid var(--border)",
            margin: "0 0 2.5rem 0",
          }}
        />

        <SignupForm
          endpoint="/api/wine-cases"
          label="Wine Case Drops"
          sublabel="Curated cases, a few times a year. This list gets first dibs."
          buttonText="notify me"
          successMessage="You'll hear from us when the next case drops."
        />
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "4rem",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "0.7rem",
          color: "var(--muted)",
        }}
      >
        drink what you like
      </div>
    </div>
  );
}
