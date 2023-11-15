import {
  deleteNotificationNotificationById,
  getNotificationNotificationById,
} from "@/api/notification";
import { USER_TYPES } from "@/model";
import clsx from "clsx";
import { Delete, Download, Edit } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function NotificationDetails() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { notification } = useParams();

  const { data: notificationData, isLoading } = useQuery(
    `notification-${notification}`,
    () =>
      getNotificationNotificationById({
        id: notification,
      })
  );

  const deleteNotification = useMutation(deleteNotificationNotificationById, {
    onSuccess: () => {
      toast("پیام سیستم حذف شد.", {
        type: "info",
      });
      queryClient.invalidateQueries([
        "notifications",
        "notifications-pagination",
      ]);
      navigate("..");
    },
  });

  const handleDeleteNotification = () =>
    deleteNotification.mutate({
      id: notification,
    });

  if (isLoading) return <Skeleton height={574} />;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <strong className="inline-flex flex-col gap-y-2">
          {isLoading ? (
            <Skeleton width={144} height={50} />
          ) : (
            notificationData?.data.title
          )}
        </strong>
        <button
          className="btn btn-error btn-square ms-auto text-white"
          onClick={handleDeleteNotification}
        >
          <Delete />
        </button>
        <Link to="./edit" className="btn btn-secondary btn-square">
          <Edit />
        </Link>
      </div>
      <ul className="flex flex-col divide-y px-5 py-3 border border-grey-200 rounded-custom">
        <li className="flex items-center justify-between py-4 text-sm">
          <span className="text-grey-600 font-light">نوع کاربر</span>
          <strong
            className={clsx(
              "badge",
              notificationData?.data.user_type === "REAL" &&
                "bg-success-50 text-success-700",
              notificationData?.data.user_type === "ALL" &&
                "bg-secondary-50 text-secondary",
              notificationData?.data.user_type === "JURIDICAL" &&
                "bg-warning-50 text-warning"
            )}
          >
            {USER_TYPES[notificationData?.data.user_type]}
          </strong>
        </li>
        <li className="flex items-start flex-col gap-y-2.5 py-4 text-sm">
          <span className="text-grey-600 font-light">پیام</span>
          <p>{notificationData?.data.message}</p>
        </li>
        {notificationData?.data.file ? (
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">فایل</span>
            <a
              href={notificationData?.data.file}
              download
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex gap-x-2 justify-between items-center"
            >
              <span className="text-sm text-grey-600 font-light">
                فایل ضمیمه شده
              </span>
              <Download />
            </a>
          </li>
        ) : null}

        <li className="flex items-center justify-between py-4 text-sm">
          <span className="text-grey-600 font-light">تاریخ ارسال</span>
          <strong>
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
            }).format(new Date(notificationData?.data.created_at)) || "-"}
          </strong>
        </li>
        <li className="flex items-center justify-between py-4 text-sm">
          <span className="text-grey-600 font-light">تاریخ ارسال</span>
          <strong>
            {new Intl.DateTimeFormat("fa-IR", {
              timeStyle: "short",
            }).format(new Date(notificationData?.data.created_at)) || "-"}
          </strong>
        </li>
      </ul>
    </div>
  );
}

export default NotificationDetails;
