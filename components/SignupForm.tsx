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
    <div style={{ marginBottom: "1.75rem" }}>
      <div
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "14px",
          fontWeight: "bold",
          marginBottom: "3px",
          color: "var(--text)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "11px",
          color: "var(--muted)",
          marginBottom: "8px",
          lineHeight: 1.5,
        }}
      >
        {sublabel}
      </div>

      {status === "success" ? (
        <div
          style={{
            fontSize: "11px",
            color: "var(--success)",
          }}
        >
          {successMessage}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "4px", maxWidth: "360px" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              padding: "5px 7px",
              background: "var(--input-bg)",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              color: "var(--text)",
              fontFamily: "Verdana, Geneva, sans-serif",
              fontSize: "11px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "5px 14px",
              background: "var(--link)",
              color: "white",
              border: "none",
              borderRadius: "2px",
              fontFamily: "Verdana, Geneva, sans-serif",
              fontSize: "10px",
              fontWeight: "bold",
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
            fontSize: "10px",
            color: "#c47a42",
            marginTop: "4px",
          }}
        >
          Something went wrong. Try again.
        </div>
      )}
    </div>
  );
}
