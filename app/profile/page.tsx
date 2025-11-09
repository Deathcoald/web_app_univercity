"use client";

import { useState } from "react";
import SideNav from "@/app/ui/nav";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!username) {
      setError("Введите username");
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get_user/me?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
          },
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении данных пользователя");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SideNav />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Введите username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 border rounded-lg flex-1"
          />
          <button
            onClick={fetchUserData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Получить
          </button>
        </div>

        {loading && <p>Загрузка...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {userData && (
          <div className="space-y-2 mt-4">
            <p>
              <strong>Имя:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email || "не указан"}
            </p>
            <p>
              <strong>Дата регистрации:</strong> {userData.created_at || "неизвестно"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
