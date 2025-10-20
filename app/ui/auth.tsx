"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AuthFormProps = {
  type: "login" | "signin";
};

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const isSignIn = type === "signin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignIn && password !== confirm) {
      setError("Пароли не совпадают");
      return;
    }

    const endpoint = isSignIn ? "register" : "login";

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка авторизации");
      }

      if (data.token) {
        sessionStorage.setItem("token", data.token);
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {isSignIn && (
            <input
              type="password"
              placeholder="Подтвердите пароль"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="px-4 py-2 rounded-full border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

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
