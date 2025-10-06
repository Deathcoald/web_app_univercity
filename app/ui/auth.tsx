"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type AuthFormProps = {
  type: "login" | "signin";
};

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const isSignIn = type === "signin";

  return (
    <div className="login-form flex items-center justify-center shadow-2xl">
      <div className="flex flex-col w-full h-full">
        <h2 className="text-center text-4xl font-semibold text-[#454242] mb-8">
          {isSignIn ? "Регистрация" : "Авторизация"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Введите логин"
            className="px-4 py-2 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Введите пароль"
            className="px-4 py-2 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {isSignIn && (
            <input
              type="password"
              placeholder="Подтвердите пароль"
              className="px-4 py-2 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          <button
            type="submit"
            className="
              w-full py-3 rounded-full text-white font-semibold
              bg-gradient-to-r from-[#8896BA] to-[#2555da]
              hover:opacity-90 transition-all shadow-md
            "
          >
            {isSignIn ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        {!isSignIn && (
          <div className="m-auto mt-4">
            <Link href="/signin">Нет аккаунта? Зарегистрироваться</Link>
          </div>
        )}
      </div>
    </div>
  );
}
