import { SignIn } from "@clerk/nextjs";

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center">
      <SignIn
        routing="hash"
        fallbackRedirectUrl="/admin"
        appearance={{
          variables: { colorPrimary: "#C9A227", colorBackground: "#0F2443" },
        }}
      />
    </div>
  );
}
