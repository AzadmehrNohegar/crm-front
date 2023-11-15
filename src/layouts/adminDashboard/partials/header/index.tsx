import { getAccountMyProfile } from "@/api/account";
import { Fragment } from "react";
import { Notification, Setting } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function AdminDashboardHeader() {
  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery(
    "user-profile",
    () => getAccountMyProfile()
  );

  return (
    <header className="p-5 sticky top-0 bg-white w-full flex items-center gap-x-3 z-10">
      <Link to="/account" className="flex items-center gap-x-2">
        {isUserProfileLoading ? (
          <Skeleton width={144} height={16} />
        ) : (
          <Fragment>
            <img
              src="/images/user-profile.png"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="inline-block w-36">
              {userProfile?.data.first_name || "کاربر"}{" "}
              {userProfile?.data.last_name}
            </span>
          </Fragment>
        )}
      </Link>

      <Link
        to="/settings"
        className="btn btn-ghost bg-secondary-50 btn-square ms-auto"
      >
        <Setting />
      </Link>
      <Link
        to="/notification"
        className="btn btn-ghost bg-secondary-50 btn-square"
      >
        <Notification />
      </Link>
    </header>
  );
}

export { AdminDashboardHeader };
