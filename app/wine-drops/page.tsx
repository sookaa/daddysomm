import fs from "fs";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wine Drops — daddysomm",
  description: "How the daddysomm wine drop experience works.",
};

interface FAQ {
  question: string;
  answer: string;
}

interface WineDropsContent {
  title: string;
  intro: string;
  faqs: FAQ[];
  closing: string;
}

function getContent(): WineDropsContent {
  const filePath = path.join(process.cwd(), "content/pages/wine-drops.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export default function WineDropsPage() {
  const content = getContent();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "3rem 1.5rem",
        maxWidth: "580px",
        margin: "0 auto",
      }}
    >
      {/* Back link */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/"
          style={{
            fontFamily: "Verdana, Geneva, sans-serif",
            fontSize: "11px",
            color: "#cf4647",
            textDecoration: "none",
          }}
        >
          ← daddysomm
        </Link>
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#e6e6e6",
          marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}
      >
        {content.title}
      </h1>

      {/* Intro */}
      <p
        style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "12px",
          color: "#999999",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
          fontStyle: "italic",
        }}
      >
        {content.intro}
      </p>

      {/* FAQs */}
      <div>
        {content.faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              marginBottom: "2rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid #4a4a4a",
            }}
          >
            <h2
              style={{
                fontFamily: "Verdana, Geneva, sans-serif",
                fontSize: "13px",
                fontWeight: "bold",
                color: "#e6e6e6",
                marginBottom: "0.5rem",
              }}
            >
              {faq.question}
            </h2>
            <p
              style={{
                fontFamily: "Verdana, Geneva, sans-serif",
                fontSize: "12px",
                color: "#999999",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Closing */}
      {content.closing && (
        <p
          style={{
            fontFamily: "Verdana, Geneva, sans-serif",
            fontSize: "11px",
            color: "#666666",
            lineHeight: 1.7,
            fontStyle: "italic",
            marginTop: "1rem",
          }}
        >
          {content.closing}
        </p>
      )}
    </div>
  );
}
