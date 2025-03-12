import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface props {
  title: string;
  value: number;
  change: number;
}

const StatsCard = ({ title, value, change }: props) => {
  return (
    <Card className="p-4 flex flex-col bg-gray-900 shadow-md rounded-xl border-none">
      <div className="flex items-center justify-start gap-2">
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        <div className="flex items-center gap-1 text-sm">
          {change > 0 ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : change < 0 ? (
            <ArrowDown className="w-4 h-4 text-red-500" />
          ) : null}
          <span className={change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-gray-500"}>
            {change > 0 ? `${change}` : change}
          </span>
        </div>
      </div>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </Card>
  );
};

export default StatsCard;
