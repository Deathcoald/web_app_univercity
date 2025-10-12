"use client";

import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { useRef, useState, useEffect } from "react";
import Select from "./select";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

type Category = {
  category_name: string;
  amount: number;
  color: string;
};

type Option = "present" | "salary" | "percent" | "etc";
type Period = "day" | "week" | "month" | "year";

type FormProps = {
  type: "incomes" | "outcomes";
  options: { value: string; label: string }[];
};

export default function Form({ type, options }: FormProps) {
  const [option, setOption] = useState<Option>("present");
  const [percent, setPercent] = useState<Category[]>([]);
  const [color, setColor] = useState("#476EAE");
  const [period, setPeriod] = useState<Period>("day");

  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isIncome = type === "incomes";

  useEffect(() => {
    let mockPercent: Category[] = [];

    switch (period) {
      case "day":
        mockPercent.push({
          category_name: "salary",
          amount: 500,
          color: "blue",
        });
        break;

      case "week":
        mockPercent.push(
          { category_name: "salary", amount: 500, color: "blue" },
          { category_name: "present", amount: 100, color: "red" },
          { category_name: "bank", amount: 250, color: "green" }
        );
        break;

      case "month":
        mockPercent.push(
          { category_name: "salary", amount: 1200, color: "blue" },
          { category_name: "present", amount: 300, color: "orange" }
        );
        break;

      case "year":
        mockPercent.push(
          { category_name: "salary", amount: 6000, color: "blue" },
          { category_name: "present", amount: 1500, color: "red" },
          { category_name: "investments", amount: 3000, color: "green" }
        );
        break;
    }

    setPercent(mockPercent);
  }, [period]);

  useEffect(() => {
    if (!canvasRef.current || percent.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: percent.map((item) => item.category_name),
        datasets: [
          {
            data: percent.map((item) => item.amount),
            backgroundColor: percent.map((item) =>
              item.category_name === option ? color : item.color
            ),
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "60%",
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        animation: { duration: 1000 },
      },
    });
  }, [percent, color, option]);

  return (
    <div className="default-form flex shadow-2xl w-full h-full bg-white rounded-2xl">
      <div className="w-full h-full flex flex-col justify-center items-center text-white rounded-l-2xl p-6">
        <div className="flex gap-3 mb-6">
          {(["day", "week", "month", "year"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                period === p
                  ? "bg-white text-[#476EAE] shadow-md"
                  : "bg-[#5a78c7] hover:bg-[#6d89d9]"
              }`}
            >
              {p === "day"
                ? "День"
                : p === "week"
                ? "Неделя"
                : p === "month"
                ? "Месяц"
                : "Год"}
            </button>
          ))}
        </div>

        <div className="relative w-2/5 aspect-square flex items-center justify-center">
          <canvas ref={canvasRef}></canvas>
          <span className="text-2xl font-bold z-10 text-gray-800 bg-white rounded-full px-3 py-1">
            {period}
          </span>
        </div>

        <p className="mt-4 text-lg font-medium">Chart JS</p>
      </div>

      <div className="w-full h-full p-10 flex flex-col justify-center">
        <form className="flex flex-col gap-6 sm:w-full md:w-1/2 lg:w-1/2">
          <p className="text-2xl font-semibold text-gray-800 mb-2">
            {isIncome ? "Доходы" : "Расходы"}
          </p>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm">Сумма</label>
            <input
              type="number"
              placeholder="Введите сумму"
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-2 rounded-20px">
            <label className="text-sm rounded-20px">Категория</label>
            <Select
              options={options}
              value={option}
              onChange={(val) => setOption(val as Option)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm">Дата</label>
            <input
              type="date"
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm">Комментарий</label>
            <input
              type="text"
              placeholder="Комментарий"
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 py-3 rounded-full bg-gradient-to-r from-[#8896BA] to-[#2555da] text-white font-semibold hover:opacity-90 transition-all shadow-md"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
