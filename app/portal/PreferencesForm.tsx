"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePreferences } from "./actions";

interface Props {
  deferCuration: boolean;
  wineLean: string;
  noSparkling: boolean;
  investmentBottle: boolean;
}

export default function PreferencesForm(props: Props) {
  const [defer, setDefer] = useState(props.deferCuration);
  const [lean, setLean] = useState(props.wineLean || "none");
  const [noSparkling, setNoSparkling] = useState(props.noSparkling);
  const [investment, setInvestment] = useState(props.investmentBottle);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const disabledStyle = defer
    ? { opacity: 0.4, pointerEvents: "none" as const }
    : {};

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    await savePreferences(formData);
    router.push("/portal/case");
  }

  const rowStyle = {
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
    marginBottom: "1.25rem",
    cursor: "pointer",
  };

  return (
    <form action={handleSubmit}>
      <label style={{ ...rowStyle, marginBottom: "1.75rem" }}>
        <input
          type="checkbox"
          name="defer_curation"
          checked={defer}
          onChange={(e) => setDefer(e.target.checked)}
          style={{ marginTop: "0.25rem" }}
        />
        <span>
          <strong>Happy for me to curate your full case?</strong>
          <br />
          <span style={{ color: "var(--muted)", fontSize: "13px" }}>
            Leave it to me. The taste options below switch off — I'll pick
            everything.
          </span>
        </span>
      </label>

      <div style={disabledStyle}>
        <p style={{ fontWeight: "bold", marginBottom: "0.75rem" }}>Your lean</p>
        {[
          { value: "red", label: "More red" },
          { value: "white", label: "More white" },
          { value: "none", label: "No preference" },
        ].map((opt) => (
          <label
            key={opt.value}
            style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", cursor: "pointer" }}
          >
            <input
              type="radio"
              name="wine_lean"
              value={opt.value}
              checked={lean === opt.value}
              onChange={() => setLean(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}

        <label style={{ ...rowStyle, marginTop: "1.25rem" }}>
          <input
            type="checkbox"
            name="no_sparkling"
            checked={noSparkling}
            onChange={(e) => setNoSparkling(e.target.checked)}
            style={{ marginTop: "0.25rem" }}
          />
          <span>
            <strong>No bubbles</strong>
            <br />
            <span style={{ color: "var(--muted)", fontSize: "13px" }}>
              Cases usually include one sparkling. Tick to swap it out.
            </span>
          </span>
        </label>
      </div>

      <label style={{ ...rowStyle, marginTop: "0.5rem" }}>
        <input
          type="checkbox"
          name="investment_bottle"
          checked={investment}
          onChange={(e) => setInvestment(e.target.checked)}
          style={{ marginTop: "0.25rem" }}
        />
        <span>
          <strong>Add an investment bottle</strong>
          <br />
          <span style={{ color: "var(--muted)", fontSize: "13px" }}>
            Swaps one of your twelve for a standout bottle. Opt in if you're
            curious.
          </span>
        </span>
      </label>

      <div style={{ marginTop: "1.5rem" }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: "var(--link)",
            color: "#fff",
            fontFamily: "Verdana, sans-serif",
            fontSize: "15px",
            fontWeight: "bold",
            padding: "12px 32px",
            border: "none",
            borderRadius: "6px",
            cursor: saving ? "default" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? "Saving..." : "Save preferences"}
        </button>
      </div>
    </form>
  );
}