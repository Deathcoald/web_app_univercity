"use client";

import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { useState, useEffect } from "react";
import Select from "./select";
import DonutChart from "./donut";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

type Option = "present" | "salary" | "percent" | "etc";
type Period = "day" | "week" | "month" | "year";

type FormProps = {
  type: "incomes" | "outcomes";
  options: { value: string; label: string }[];
};

type Category = {
  category_name: string;
  amount: number;
  color: string;
};

export default function Form({ type, options }: FormProps) {
  const [option, setOption] = useState<Option>("present");
  const [period, setPeriod] = useState<Period>("day");
  const [color] = useState("#476EAE");
  const [percent, setPercent] = useState<Category[]>([]);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const isIncome = type === "incomes";

  useEffect(() => {
    fetchData(period);
  }, [period]);

  async function fetchData(period: Period) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:8000/finance?type=${type}&period=${period}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Ошибка при загрузке данных");

      const data: Category[] = await res.json();
      setPercent(data);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!amount || !date) {
      alert("Заполни сумму и дату");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Нет авторизации");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/create", {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          amount: Number(amount),
          category: option,
          date,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Ошибка сервера");

      setAmount("");
      setDate("");
      setComment("");

      fetchData(period);

      alert("Сохранено");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="default-form flex shadow-2xl w-full h-full bg-white rounded-2xl">
      <div className="w-full h-full flex flex-col items-center p-6">
        <div className="flex gap-3 mb-6">
          {(["day", "week", "month", "year"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full text-sm ${
                period === p ? "bg-white text-blue-600" : "bg-blue-500 text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="w-2/5">
          <DonutChart percent={percent} option={option} color={color} label={period} />
        </div>
      </div>

      <div className="w-full p-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:w-1/2">
          <h2 className="text-2xl font-semibold">
            {isIncome ? "Доходы" : "Расходы"}
          </h2>

          <input
            type="number"
            placeholder="Сумма"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
          />

          <Select
            options={options}
            value={option}
            onChange={(v) => setOption(v as Option)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded"
          >
            {loading ? "Сохранение..." : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
