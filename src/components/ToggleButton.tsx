type ToggleOption = {
  label: string;
  value: string;
};

type Color = "blue" | "green" | "indigo" | "purple" | "red" | "gray";

interface Props {
  value: string;
  options: ToggleOption[];
  color?: Color;
  onChange: (value: string) => void;
}

const colorMap: Record<
  Color,
  { bg: string; active: string; inactive: string }
> = {
  blue: {
    bg: "bg-blue-100",
    active: "bg-blue-500 text-white",
    inactive: "text-blue-800",
  },
  green: {
    bg: "bg-green-100",
    active: "bg-green-500 text-white",
    inactive: "text-green-800",
  },
  indigo: {
    bg: "bg-indigo-100",
    active: "bg-indigo-500 text-white",
    inactive: "text-indigo-800",
  },
  purple: {
    bg: "bg-purple-100",
    active: "bg-purple-500 text-white",
    inactive: "text-purple-800",
  },
  red: {
    bg: "bg-red-100",
    active: "bg-red-500 text-white",
    inactive: "text-red-800",
  },
  gray: {
    bg: "bg-gray-100",
    active: "bg-gray-500 text-white",
    inactive: "text-gray-800",
  },
};

export function ToggleButton({
  value,
  options,
  color = "blue",
  onChange,
}: Props) {
  const { bg, active, inactive } = colorMap[color];

  return (
    <div className={`flex items-center rounded-full w-min ${bg}`}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`px-3 py-1 text-sm font-medium rounded-full focus:outline-none transition-colors ${
            value === option.value ? active : inactive
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
