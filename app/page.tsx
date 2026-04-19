import SignupForm from "@/components/SignupForm";

const GLASS = `   

  _________
  /          \\
 /             \\
             (               )
|               |
|~~~~~~~~~~~~~~~|
{:::::::::::::::}
 \\:::::::::::://
  \\:::::::::://
   \\::::::://
    \\:::://
      \\://
      |
      |
      |
      |
     ___|___
     /       \\`

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
      <pre
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: "13px",
          lineHeight: 1.35,
          color: "#cf4647",
          textAlign: "center",
          marginBottom: "2rem",
          userSelect: "none",
        }}
      >
        {GLASS}
      </pre>

      <h1
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "-0.02em",
          marginBottom: "4px",
          textAlign: "center",
          color: "var(--text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        daddy
        <svg viewBox="0 0 24 32" width="16" height="22" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="3" rx="1" fill="#cf4647"/>
          <rect x="10" y="5" width="4" height="8" fill="#cf4647"/>
          <path d="M 12,13 Q 7,15 12,18 Q 17,20 12,23 Q 7,25 12,28" fill="none" stroke="#cf4647" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        somm
      </h1>

      <p
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "11px",
          color: "var(--muted)",
          marginBottom: "2.5rem",
          letterSpacing: "0.03em",
          fontStyle: "italic",
        }}
      >
        wine, irreverently
      </p>

      <div style={{ width: "100%", maxWidth: "380px" }}>
        <SignupForm
          endpoint="/api/newsletter"
          label="The Newsletter"
          sublabel="Notes on and about wine. No scores, no gatekeeping."
          buttonText="subscribe"
          successMessage="You're in. Check your inbox."
        />

        <div
          style={{
            borderTop: "1px solid var(--border)",
            margin: "0 0 2rem 0",
          }}
        />

        <SignupForm
          endpoint="/api/wine-cases"
          label="Wine Case Drops"
          sublabel="Curated cases, a few times a year. This list gets first dibs."
          buttonText="imbibe"
          successMessage="You'll hear from me when the next case drops (it's coming soon)."
        />
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "4rem",
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "10px",
          color: "var(--muted)",
        }}
      >
        drink what you like
      </div>
    </div>
  );
}