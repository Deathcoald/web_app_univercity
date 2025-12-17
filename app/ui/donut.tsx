"use client";

import { useRef, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

type Category = {
  category_name: string;
  amount: number;
  color: string;
};

type DonutChartProps = {
  percent: Category[];
  option: string;
  color: string;
  label?: string;
};

export default function DonutChart({ percent, option, color, label }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

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
        animation: { duration: 800 },
      },
    });
  }, [percent, color, option]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>

      {label && (
        <span className="absolute text-2xl font-bold text-gray-800 bg-white rounded-full px-3 py-1 shadow">
          {label}
        </span>
      )}
    </div>
  );
}
