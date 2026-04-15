"use client";

import { useState, FormEvent } from "react";

interface SignupFormProps {
  endpoint: string;
  label: string;
  sublabel: string;
  buttonText: string;
  successMessage: string;
}

export default function SignupForm({
  endpoint,
  label,
  sublabel,
  buttonText,
  successMessage,
}: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 409) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          fontFamily: '"Fraunces", serif',
          fontSize: "1.1rem",
          fontWeight: 600,
          marginBottom: "0.25rem",
          color: "var(--text)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          color: "var(--muted)",
          marginBottom: "0.75rem",
          lineHeight: 1.5,
        }}
      >
        {sublabel}
      </div>

      {status === "success" ? (
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "0.85rem",
            color: "var(--success)",
          }}
        >
          {successMessage}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "0.5rem", maxWidth: "400px" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              background: "var(--input-bg)",
              border: "1px solid var(--border)",
              borderRadius: "3px",
              color: "var(--text)",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "0.5rem 1.25rem",
              background: "var(--accent)",
              color: "white",
              border: "none",
              borderRadius: "3px",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {status === "loading" ? "..." : buttonText}
          </button>
        </form>
      )}

      {status === "error" && (
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "0.8rem",
            color: "var(--accent)",
            marginTop: "0.5rem",
          }}
        >
          Something went wrong. Try again.
        </div>
      )}
    </div>
  );
}
