import { Fragment, useRef } from "react";
import {
  Calling,
  Home,
  Logout,
  ChevronDown,
  Paper,
  TwoUsers,
  Bag,
} from "react-iconly";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useMutation } from "react-query";
import { postAccountAuthLogout } from "@/api/account";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { useOnClickOutside } from "usehooks-ts";

function AdminDashboardSidebar() {
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const { refresh, logoutUser } = useAuthStore();

  const { pathname } = useLocation();
  const isCurrentEndpoint = (to: string) =>
    pathname.split("/").includes(to.slice(1));

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

  useOnClickOutside(dropdownRef, () =>
    dropdownRef.current?.removeAttribute("open")
  );

  return (
    <aside className="w-1/6 bg-white relative z-20 h-full shadow-ev3">
      <ul className="w-full h-full py-8 flex flex-col gap-y-5">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-x-2 mx-5 px-5 py-4 transition-colors rounded-lg",
                !isActive && "hover:bg-secondary-100",
                isActive && "btn-secondary"
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
        <li className="px-5">
          <details
            className={clsx("collapse rounded-lg transition-colors flex")}
            ref={dropdownRef}
          >
            <summary
              className={clsx(
                "items-center w-full px-5 py-4 max-w-full cursor-pointer rounded-lg gap-x-2 transition-colors",
                isCurrentEndpoint("/products") &&
                  "bg-secondary text-white hover:bg-secondary-800",
                !isCurrentEndpoint("/products") && "hover:bg-secondary-100"
              )}
            >
              <Bag filled={isCurrentEndpoint("/products")} />
              محصول
              <span className="inline-block ms-auto">
                <ChevronDown />
              </span>
            </summary>
            <div className="collapse-content transition-colors">
              <ul
                tabIndex={0}
                className="shadow-none menu py-2 rounded-box w-full overflow-hidden"
              >
                <li className="relative before:absolute before:w-5 before:h-full before:border-r-2 before:border-r-grey-300 last-of-type:before:border-r-0">
                  <NavLink
                    end
                    to="/products/management"
                    className={({ isActive }) =>
                      clsx(
                        "py-4 focus:bg-secondary-50 rounded-lg relative before:absolute before:w-5 before:h-full before:top-0 before:border-r-2 before:border-r-grey-300 before:rounded-br-xl",
                        !isActive && "bg-transparent",
                        isActive && "bg-secondary-50"
                      )
                    }
                  >
                    لیست محصولات
                  </NavLink>
                </li>
                <li className="relative before:absolute before:w-5 before:h-full before:border-r-2 before:border-r-grey-300 last-of-type:before:border-r-0">
                  <NavLink
                    end
                    to="/products/categories"
                    className={({ isActive }) =>
                      clsx(
                        "py-4 focus:bg-secondary-50 rounded-lg relative before:absolute before:w-5 before:h-full before:top-0 before:border-r-2 before:border-r-grey-300 before:rounded-br-xl",
                        !isActive && "bg-transparent",
                        isActive && "bg-secondary-50"
                      )
                    }
                  >
                    دسته‌بندی
                  </NavLink>
                </li>
              </ul>
            </div>
          </details>
        </li>
        <li>
          <NavLink
            to="/orders"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-x-2 mx-5 px-5 py-4 transition-colors rounded-lg",
                !isActive && "hover:bg-secondary-100",
                isActive && "btn-secondary"
              )
            }
          >
            {({ isActive }) => (
              <Fragment>
                <Paper filled={isActive} />
                لیست سفارشات
              </Fragment>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            end
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-x-2 mx-5 px-5 py-4 transition-colors rounded-lg",
                !isActive && "hover:bg-secondary-100",
                isActive && "btn-secondary"
              )
            }
          >
            {({ isActive }) => (
              <Fragment>
                <TwoUsers filled={isActive} />
                کاربران
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
                "flex items-center gap-x-2 mx-5 px-5 py-4 transition-colors rounded-lg",
                !isActive && "hover:bg-secondary-100",
                isActive && "btn-secondary"
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

export { AdminDashboardSidebar };
