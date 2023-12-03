import { getAccountMyProfile } from "@/api/account";
import { Close } from "@/assets/icons/Close";
import { Menu } from "@/assets/icons/Menu";
import { AdminMobileSlideover } from "@/shared/adminMobileSlideover";
import { Fragment, useState } from "react";
import { Notification, Setting } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

function AdminDashboardHeader() {
  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery(
    "user-profile",
    () => getAccountMyProfile()
  );

  const matches = useMediaQuery("(max-width: 1280px)");

  const [isMobileSlideoverOpen, setIsMobileSlideoverOpen] = useState(false);

  return (
    <header className="p-5 sticky top-0 w-full z-10">
      <div className="flex p-2 xl:p-0 items-center rounded-xl bg-grey-50 xl:bg-white gap-x-2 xl:gap-x-3 relative z-50 xl:static">
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
              <span className="inline-block text-sm xl:text-base w-36">
                {userProfile?.data.first_name || "کاربر"}{" "}
                {userProfile?.data.last_name}
              </span>
            </Fragment>
          )}
        </Link>

        <Link
          to="/settings"
          className="btn btn-ghost btn-sm xl:btn-md bg-transparent xl:bg-secondary-50 btn-square ms-auto"
        >
          <Setting />
        </Link>
        <Link
          to="/notification"
          className="btn btn-ghost btn-sm xl:btn-md bg-transparent xl:bg-secondary-50 btn-square"
        >
          <Notification />
        </Link>
        {matches ? (
          <button
            className="btn btn-ghost btn-sm btn-square"
            onClick={() => setIsMobileSlideoverOpen((prevState) => !prevState)}
          >
            {isMobileSlideoverOpen ? <Close /> : <Menu />}
          </button>
        ) : null}
      </div>
      {matches ? (
        <AdminMobileSlideover
          isOpen={isMobileSlideoverOpen}
          setIsOpen={setIsMobileSlideoverOpen}
        />
      ) : null}
    </header>
  );
}

export { AdminDashboardHeader };
