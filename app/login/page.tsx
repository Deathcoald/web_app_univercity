import AuthForm from "@/app/ui/auth";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthForm type="login" />
    </div>
  );
}
