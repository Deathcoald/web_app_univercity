"use client";

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function Select({ options, value, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 appearance-none border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 lg:w-1/4 sm:w-1/2"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
