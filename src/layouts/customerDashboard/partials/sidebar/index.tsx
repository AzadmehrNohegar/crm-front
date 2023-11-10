import { Fragment } from "react";
import {
  Bag,
  Calling,
  Bookmark,
  Home,
  Logout,
  Notification,
} from "react-iconly";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useMutation } from "react-query";
import { postAccountAuthLogout } from "@/api/account";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";

function CustomerDashboardSidebar() {
  const navigate = useNavigate();

  const { refresh, logoutUser } = useAuthStore();

  const logoutAccount = useMutation(postAccountAuthLogout, {
    onSuccess: () => {
      toast("از حساب کاربری خود خارج شدید.", {
        type: "info",
      });
      logoutUser();
      navigate("/auth");
    },
  });

  const handleLogout = () =>
    logoutAccount.mutate({
      body: {
        refresh,
      },
    });

  return (
    <aside className="w-1/6 bg-grey-50 h-full rounded-l-[30px]">
      <ul className="w-full h-full py-8 flex flex-col gap-y-5">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-x-2 ms-6 p-5 transition-colors hover:bg-grey-100 rounded-r-[50px]",
                isActive && "text-primary bg-white"
              )
            }
          >
            {({ isActive }) => (
              <Fragment>
                <Home filled={isActive} />
                صفحه اصلی
              </Fragment>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-x-2 ms-6 p-5 transition-colors hover:bg-grey-100 rounded-r-[50px]",
                isActive && "text-primary bg-white"
              )
            }
          >
            {({ isActive }) => (
              <Fragment>
                <Bag filled={isActive} />
                محصولات
              </Fragment>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-x-2 ms-6 p-5 transition-colors hover:bg-grey-100 rounded-r-[50px]",
                isActive && "text-primary bg-white"
              )
            }
          >
            {({ isActive }) => (
              <Fragment>
                <Bookmark filled={isActive} />
                سفارشات
              </Fragment>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/support"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-x-2 ms-6 p-5 transition-colors hover:bg-grey-100 rounded-r-[50px]",
                isActive && "text-primary bg-white"
              )
            }
          >
            {({ isActive }) => (
              <Fragment>
                <Calling filled={isActive} />
                پشتیبانی
              </Fragment>
            )}
          </NavLink>
        </li>
        <li className="mt-auto">
          <NavLink
            to="/notification"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-x-2 ms-6 p-5 transition-colors hover:bg-grey-100 rounded-r-[50px]",
                isActive && "text-primary bg-white"
              )
            }
          >
            {({ isActive }) => (
              <Fragment>
                <Notification filled={isActive} />
                پیام‌های سیستم
              </Fragment>
            )}
          </NavLink>
        </li>
        <li>
          <button
            className={clsx("flex text-danger items-center gap-x-2 ms-6 p-5")}
            onClick={handleLogout}
          >
            <Logout />
            خروج از حساب کاربری
          </button>
        </li>
      </ul>
    </aside>
  );
}

export { CustomerDashboardSidebar };
