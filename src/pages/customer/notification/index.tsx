import { useInfiniteQuery, useQuery } from "react-query";
import { NotificationItem } from "./partials/notificationItem";
import { Fragment, useRef } from "react";
import {
  getNotificationNotification,
  getNotificationNotificationById,
} from "@/api/notification";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import Skeleton from "react-loading-skeleton";
import { notification } from "@/model";
import { useSearchParams } from "react-router-dom";
import { NotificationDetails } from "./partials/notificationDetails";
import clsx from "clsx";
import { useMediaQuery } from "usehooks-ts";

function Notification() {
  const [searchParams] = useSearchParams();
  const matches = useMediaQuery("(max-width: 1280px)");

  const loadMoreRef = useRef(null);
  const {
    data: paginationData,
    fetchNextPage,
    hasNextPage,
    isLoading: isPaginationLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "notifications-pagination",
    ({ pageParam = 1 }) =>
      getNotificationNotification({
        params: {
          page: pageParam,
          page_size: 8,
        },
      }).then((res) => ({
        next: res.data.next,
        results: res.data.results,
      })),
    {
      getNextPageParam: (lastPage: unknown, page) => {
        if ((lastPage as { next: string | null })?.next) return page.length + 1;
        return null;
      },
    }
  );

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    rootMargin: "200px",
  });

  const { data: notificationData, isLoading: isNotificationLoading } = useQuery(
    `notification-${searchParams.get("notification")}`,
    () =>
      getNotificationNotificationById({
        id: searchParams.get("notification")!,
      }),
    {
      enabled: !!searchParams.get("notification"),
    }
  );

  return (
    <div className="h-full xl:h-innerContainer flex items-stretch gap-x-4">
      <div
        className={clsx(
          "flex flex-col h-full gap-y-4 overflow-y-auto w-full pe-2",
          matches && searchParams.get("notification") && "hidden"
        )}
      >
        {isPaginationLoading ? <Skeleton height={153} /> : null}
        {paginationData?.pages.map((item, index) => (
          <Fragment key={index}>
            {(item as { results: notification[] }).results.map((entry) => (
              <NotificationItem key={entry.id} {...entry} />
            ))}
          </Fragment>
        ))}
        {isFetchingNextPage ? <Skeleton height={153} width="100%" /> : null}
        <div ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`} />
      </div>
      <div
        className={clsx(
          "w-full xl:shadow-ev3 rounded-custom",
          matches && !searchParams.get("notification") && "hidden"
        )}
      >
        {!searchParams.get("notification") ? (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/images/notification-empty.png"
              alt="notification empty"
            />
          </div>
        ) : isNotificationLoading ? (
          <Skeleton className="h-44 rounded-custom" />
        ) : (
          <NotificationDetails {...notificationData?.data} />
        )}
      </div>
    </div>
  );
}

export default Notification;
