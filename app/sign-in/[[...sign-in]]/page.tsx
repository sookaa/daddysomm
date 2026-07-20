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
            colorPrimary: "#cf4647",
            colorBackground: "#333333",
            colorText: "#e6e6e6",
            colorInputBackground: "#2a2a2a",
            colorInputText: "#e6e6e6",
            fontFamily: "Verdana, sans-serif",
          },
        }}
      />
    </main>
  );
}
