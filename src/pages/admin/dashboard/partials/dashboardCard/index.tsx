import { card_types } from "@/model";
import { ReactNode } from "react";
import clsx from "clsx";

interface IDashboardCardProps {
  title: string;
  value: number | string;
  unit: string;
  growth: number;
  type: card_types;
  icon: ReactNode;
}

function DashboardCard({
  growth,
  icon,
  title,
  unit,
  value,
  type,
}: IDashboardCardProps) {
  return (
    <div className="shadow-ev2 flex flex-col gap-y-4 p-5 w-full rounded-custom basis-modified xl:basis-auto">
      <div className="flex items-center justify-between">
        <h4 className="text-sm xl:text-base text-grey-600">{title}</h4>
        <span
          className={clsx(
            "p-1.5 xl:p-2 rounded-lg",
            type === "success" && "bg-success text-white",
            type === "danger" && "bg-danger text-white",
            type === "warning" && "bg-warning text-grey-800",
            type === "secondary" && "bg-secondary text-white",
            type === "primary" && "bg-primary text-white"
          )}
        >
          {icon}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <strong className="text-base xl:text-lg">
          {value}{" "}
          <span className="text-xs xl:text-sm font-light text-grey-500">
            {unit}
          </span>
        </strong>
        <span
          className={clsx(
            "text-xs font-light ltr",
            growth > 0 && "text-success",
            growth < 0 && "text-danger",
            growth === 0 && "text-grey-600"
          )}
        >
          {growth} %
        </span>
      </div>
    </div>
  );
}

export { DashboardCard };
