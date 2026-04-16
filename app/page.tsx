import SignupForm from "@/components/SignupForm";

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
      <svg
        viewBox="0 0 250 310"
        style={{
          width: "180px",
          height: "auto",
          marginBottom: "2rem",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bottle inverted and tilted 45 degrees */}
        <g transform="translate(178, 58) rotate(225)">
          <rect x="-12" y="0" width="24" height="70" rx="2" fill="none" stroke="#4281c4" strokeWidth="1.5"/>
          <rect x="-6" y="-35" width="12" height="38" rx="2" fill="none" stroke="#4281c4" strokeWidth="1.5"/>
          <rect x="-4" y="-42" width="8" height="9" rx="1" fill="none" stroke="#4281c4" strokeWidth="1.5"/>
          <rect x="-10" y="30" width="20" height="38" rx="1" fill="#4281c4" opacity="0.2"/>
          <rect x="-9" y="15" width="18" height="22" rx="1" fill="none" stroke="#4281c4" strokeWidth="0.75" opacity="0.4"/>
        </g>
        {/* Pour stream */}
        <path d="M 148,90 Q 135,115 122,140 Q 116,150 113,158" fill="none" stroke="#4281c4" strokeWidth="1.5" opacity="0.6"/>
        <path d="M 151,93 Q 139,117 126,141 Q 120,150 117,158" fill="none" stroke="#4281c4" strokeWidth="1" opacity="0.3"/>
        {/* Rim */}
        <ellipse cx="112" cy="160" rx="28" ry="4.5" fill="none" stroke="#4281c4" strokeWidth="1.5"/>
        {/* Bowl left */}
        <path d="M 84,160 Q 74,172 70,188 Q 68,204 74,218 Q 83,234 100,242" fill="none" stroke="#4281c4" strokeWidth="1.5"/>
        {/* Bowl right */}
        <path d="M 140,160 Q 150,172 154,188 Q 156,204 150,218 Q 141,234 124,242" fill="none" stroke="#4281c4" strokeWidth="1.5"/>
        {/* Wine in glass */}
        <path d="M 72,198 Q 70,210 76,220 Q 84,233 100,240 L 124,240 Q 140,233 148,220 Q 154,210 152,198 Z" fill="#4281c4" opacity="0.15"/>
        <path d="M 72,198 Q 112,208 152,198" fill="none" stroke="#4281c4" strokeWidth="1" opacity="0.4"/>
        {/* Stem */}
        <line x1="112" y1="242" x2="112" y2="275" stroke="#4281c4" strokeWidth="1.5"/>
        {/* Base */}
        <ellipse cx="112" cy="277" rx="22" ry="4" fill="none" stroke="#4281c4" strokeWidth="1.5"/>
      </svg>

      <h1
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "21px",
          fontWeight: "bold",
          letterSpacing: "-0.02em",
          marginBottom: "4px",
          textAlign: "center",
          color: "var(--text)",
        }}
      >
        daddysomm
      </h1>

      <p
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "10px",
          color: "var(--muted)",
          marginBottom: "2.5rem",
          letterSpacing: "0.04em",
        }}
      >
        wine, irreverently
      </p>

      <div style={{ width: "100%", maxWidth: "380px" }}>
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
            margin: "0 0 2rem 0",
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

      <div
        style={{
          marginTop: "auto",
          paddingTop: "4rem",
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "9px",
          color: "var(--muted)",
        }}
      >
        drink what you like
      </div>
    </div>
  );
}
