import { IDictionary, notification, NOTIFICATION_VARIANT } from "@/model";
import clsx from "clsx";
import { ReactNode } from "react";
import {
  ArrowLeft,
  Bag,
  Calendar,
  Danger,
  Discount,
  Download,
  TimeCircle,
  User,
} from "react-iconly";
import { useSearchParams } from "react-router-dom";

function NotificationDetails({
  file,
  message,
  title,
  type,
  created_at,
}: notification) {
  const NOTIFICATION_ICON: IDictionary<ReactNode> = {
    USER: <User />,
    ORDER: <Bag />,
    NOTICE: <Danger />,
    PRODUCT: <Discount />,
  };

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="rounded-[10px] sm:p-5 flex flex-col gap-y-3">
      <h6 className="flex items-center gap-x-3 sm:text-xl font-semibold">
        <span className={clsx("rounded-lg p-1.5", NOTIFICATION_VARIANT[type])}>
          {NOTIFICATION_ICON[type]}
        </span>
        {title}
        <button
          className="btn btn-link decoration-transparent btn-square ms-auto text-grey-800 btn-sm"
          onClick={() => {
            searchParams.set("notification", "");
            setSearchParams("");
          }}
        >
          <ArrowLeft />
        </button>
      </h6>
      <div className="flex justify-between items-center border-b border-b-grey-200 w-full">
        <span className="inline-flex items-center gap-x-2 font-light text-sm text-grey-600 py-2">
          <Calendar size="small" />
          {new Intl.DateTimeFormat("fa-IR", {
            dateStyle: "short",
          }).format(new Date(created_at))}
        </span>
        <span className="inline-flex items-center gap-x-2 font-light text-sm text-grey-600 pt-2">
          <TimeCircle size="small" />
          {new Intl.DateTimeFormat("fa-IR", {
            timeStyle: "short",
          }).format(new Date(created_at))}
        </span>
      </div>
      <p className="text-grey-600 font-light">{message}</p>
      {file ? (
        <a
          href={file}
          download
          target="_blank"
          rel="noreferrer noopener"
          className="w-full pt-2 flex justify-between items-center"
        >
          <span className="inline-flex flex-col gap-y-2">
            <span className="text-sm text-grey-600 font-light">
              فایل ضمیمه شده
            </span>
            <span className="text-grey-500 font-light inline-flex items-center gap-x-1 text-xs">
              <TimeCircle size="small" />
              {new Intl.DateTimeFormat("fa-IR", {
                timeStyle: "short",
              }).format(new Date(created_at))}
            </span>
          </span>
          <Download />
        </a>
      ) : null}
    </div>
  );
}

export { NotificationDetails };
