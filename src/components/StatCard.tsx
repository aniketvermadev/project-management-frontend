import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
} from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  description?: string;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  description,
}: StatCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

      {/* Decorative background */}

      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-150" />

      <div className="relative">

        {/* Top */}

        <div className="flex items-start justify-between">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Icon size={21} strokeWidth={2} />
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-500">
            <ArrowUpRight size={17} />
          </div>

        </div>

        {/* Value */}

        <div className="mt-5">

          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-xs text-slate-400">
              {description}
            </p>
          )}

        </div>

      </div>
    </div>
  );
};

export default StatCard;