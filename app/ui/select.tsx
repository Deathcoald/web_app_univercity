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
      className="w-full mb-[10px] px-[10px] py-[10px] bg-[#ffeaeb] rounded-20px appearance-none border border-black rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-400 lg:w-1/4 sm:w-1/2"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
