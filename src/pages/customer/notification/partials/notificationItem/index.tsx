import { IDictionary, notification, NOTIFICATION_VARIANT } from "@/model";
import clsx from "clsx";
import { ReactNode } from "react";
import {
  Bag,
  Calendar,
  Danger,
  Discount,
  TimeCircle,
  User,
} from "react-iconly";
import { useSearchParams } from "react-router-dom";

function NotificationItem({
  id,
  message,
  title,
  type,
  created_at,
}: notification) {
  const [searchParams, setSearchParams] = useSearchParams();

  const NOTIFICATION_ICON: IDictionary<ReactNode> = {
    USER: <User />,
    ORDER: <Bag />,
    NOTICE: <Danger />,
    PRODUCT: <Discount />,
  };

  return (
    <button
      className="rounded-[10px] bg-grey-50 p-5 flex flex-col gap-y-3"
      onClick={() => {
        searchParams.set("notification", id.toString());
        setSearchParams(searchParams);
      }}
    >
      <h6 className="flex items-center gap-x-3 xl:text-xl font-semibold">
        <span className={clsx("rounded-lg p-1.5", NOTIFICATION_VARIANT[type])}>
          {NOTIFICATION_ICON[type]}
        </span>
        {title}
      </h6>
      <p className="text-grey-600 font-light text-sm xl:text-base text-start">
        {message}
      </p>
      <div className="flex justify-between items-center border-t border-t-grey-200 w-full">
        <span className="inline-flex items-center gap-x-2 font-light text-xs xl:text-sm text-grey-600 pt-2">
          <Calendar size="small" />
          {new Intl.DateTimeFormat("fa-IR", {
            dateStyle: "short",
          }).format(new Date(created_at))}
        </span>
        <span className="inline-flex items-center gap-x-2 font-light text-xs xl:text-sm text-grey-600 pt-2">
          <TimeCircle size="small" />
          {new Intl.DateTimeFormat("fa-IR", {
            timeStyle: "short",
          }).format(new Date(created_at))}
        </span>
      </div>
    </button>
  );
}

export { NotificationItem };
