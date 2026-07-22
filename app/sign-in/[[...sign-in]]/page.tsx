import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#a3302b",
            colorText: "#2a2420",
            colorTextSecondary: "#6b6259",
            colorBackground: "#ffffff",
            colorInputBackground: "#ffffff",
            colorInputText: "#2a2420",
            colorTextOnPrimaryBackground: "#ffffff",
            borderRadius: "6px",
            fontFamily: "Verdana, sans-serif",
          },
          elements: {
            card: { border: "1px solid #e5ddd0", boxShadow: "none" },
            formButtonPrimary: {
              backgroundColor: "#a3302b",
              color: "#ffffff",
              fontWeight: "bold",
            },
            socialButtonsBlockButton: {
              borderColor: "#e5ddd0",
              color: "#2a2420",
            },
            formFieldInput: { borderColor: "#d8cfc2" },
          },
        }}
      />
    </main>
  );
}
