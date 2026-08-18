export default function Home() {
  const copy = [
    "There is no shortage of wine. The problem is that most of it reaches you through systems built for scale, not judgment.",
    "The LCBO is very good at making wine available. It is less good at making the right wine visible. Familiar labels dominate the shelves, scores stand in for taste, and many of the bottles worth drinking never enter general circulation at all. They sit on importer lists, in small allocations, or on shelves in another province.",
    "DaddySomm exists in that gap.",
    "The world\u2019s great wine regions have long since been discovered. The map is not the problem. From Ontario, access is, and access is only part of the equation.",
    "The real work is knowing which producers are making their best wine now. Which younger winemakers are beginning to outperform established names. Which varietals are showing particularly well in a given vintage. Where quality is moving faster than price. When a celebrated bottle is worth the attention, and when the quieter one beside it will be far better at the table.",
    "That is what DaddySomm pays attention to.",
    "We eschew the familiar mediocrity of the LCBO shelf and work through relationships with Ontario importers and distributors to access bottles that most people will never encounter while wandering the aisles. When Ontario comes up short, we raid the SAQ for the sweet goodness of French wines that, for reasons known only to the machinery of provincial alcohol distribution, never seem to make it across the border.",
    "This is not about finding the most obscure bottle possible; it\u2019s about judgment and fun.",
    "Four or five times a year, as the seasons change, a case arrives. Twelve bottles, chosen with intent. Some will be immediately familiar. Others may come from producers or varietals you would not have found on your own. Every bottle earns its place.",
    "Tell us how you drink and the case will bend to you. More red. More white. Some bubbles. Bottles for Tuesday night, bottles for a long dinner, and perhaps one or two that deserve a little patience. Or say nothing and trust the hand packing the case.",
    "There are no tasting rituals. No vocabulary tests. No requirement to identify graphite, saddle leather, or the floor of a damp forest.",
    "Wine is not an exam.",
    "It is one of the small ways a meal becomes an occasion, a conversation runs longer than expected, or an ordinary evening becomes slightly less ordinary.",
    "You\u2019re entering into a standing arrangement with someone who has done the work, found the access, filtered out the noise, and made sure you feel horny after drinking the wine that DaddySomm has chosen.",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "4rem 1.5rem 3rem",
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
          color: "var(--link)",
          margin: "14px 0 0",
          letterSpacing: "0.03em",
          fontStyle: "italic",
        }}
      >
        wine, irreverently
      </p>
      <div
        style={{
          maxWidth: "500px",
          marginTop: "2.5rem",
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "12px",
          lineHeight: 1.75,
          color: "var(--text)",
          textAlign: "left",
        }}
      >
        {copy.map((para, i) => (
          <p key={i} style={{ margin: i === 0 ? 0 : "1.1em 0 0" }}>
            {para}
          </p>
        ))}
      </div>
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
