import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function MemberNav() {
  return (
    <nav
      style={{
        maxWidth: "44rem",
        margin: "0 auto",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link
        href="/portal"
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontWeight: "bold",
          fontSize: "16px",
          color: "var(--text)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        daddy
        <svg viewBox="0 0 24 32" width="12" height="16" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="3" rx="1" fill="var(--link)" />
          <rect x="10" y="5" width="4" height="8" fill="var(--link)" />
          <path d="M 12,13 Q 7,15 12,18 Q 17,20 12,23 Q 7,25 12,28" fill="none" stroke="var(--link)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        somm
      </Link>

      <span style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "13px" }}>
        <Link href="/drop">current drop</Link>
        <Link href="/portal/case">my case</Link>
        <SignOutButton>
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "var(--link)",
              fontFamily: "inherit",
              fontSize: "13px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            sign out
          </button>
        </SignOutButton>
      </span>
    </nav>
  );
}