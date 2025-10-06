"use client";

import { useState, useEffect } from "react";
import Select from "./select";

type Option = "present" | "salary" | "percent" | "etc";
type Period = "day" | "week" | "month" | "year";

type FormProps = {
  type: "incomes" | "outcomes";
  options: { value: string; label: string }[];
};

export default function Form({ type, options }: FormProps) {
  const [option, setOption] = useState("");
  const [percent, setPercent] = useState(0);
  const [color, setColor] = useState("#476EAE");
  const [period, setPeriod] = useState<Period>("day");

  const isIncome = type === "incomes";

  useEffect(() => {
    let mockPercent = 0;

    switch (period) {
      case "day":
        mockPercent = 25;
        break;
      case "week":
        mockPercent = 55;
        break;
      case "month":
        mockPercent = 80;
        break;
      case "year":
        mockPercent = 95;
        break;
    }

    setPercent(mockPercent);

    if (mockPercent < 30) setColor("#FF6B6B");
    else if (mockPercent < 70) setColor("#FFD93D");
    else setColor("#6BCB77");
  }, [period]);

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
          <svg
            className="absolute -rotate-90 w-full h-full"
            viewBox="0 0 160 160"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="15"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke={color}
              strokeWidth="15"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * percent) / 100}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <span className="text-2xl font-bold z-10 text-gray-800 bg-white rounded-full px-3 py-1">
            {percent}%
          </span>
        </div>

        <p className="mt-4 text-lg font-medium">Заполнение</p>
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
