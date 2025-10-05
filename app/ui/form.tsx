"use client";

import { useState } from "react";
import Select from "./select";

type Option = "present" | "salary" | "percent" | "etc";

type FormProps = {
  type: "incomes" | "outcomes";
  options: {value: string, label: string}[]
};

export default function Form({ type, options }: FormProps) {
  const [option, setOption] = useState("");
  
  const isIcome = type === "incomes"

  return (
    <div className="default-form flex shadow-2xl w-full h-full bg-white rounded-2xl overflow-hidden">
      <div className="w-full h-full flex flex-col justify-center items-center">

      </div>

      <div className="w-full h-full p-10 flex flex-col justify-center">
        <form className="flex flex-col gap-6 sm:w-full md:w-1/2 lg:w-1/2">
          <p className="text-2xl font-semibold text-gray-800 mb-2">{isIcome ? "Доходы" : "Расходы"}</p>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm">Сумма</label>
            <input
              type="number"
              placeholder="Введите сумму"
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-sm">Категория</label>
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
