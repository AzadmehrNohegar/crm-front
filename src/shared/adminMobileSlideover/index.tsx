import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";
import {
  Bag,
  Calling,
  Bookmark,
  Home,
  Logout,
  ChevronDown,
  TwoUsers,
} from "react-iconly";
import { useMutation } from "react-query";
import { postAccountAuthLogout } from "@/api/account";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";

interface IAdminMobileSlideoverProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

function AdminMobileSlideover({
  isOpen,
  setIsOpen,
}: IAdminMobileSlideoverProps) {
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const matches = useMediaQuery("(max-width: 1280px)");

  const changeOpenState = useCallback(
    (openState: boolean) => setIsOpen(openState),
    [setIsOpen]
  );

  useEffect(() => {
    if (pathname) changeOpenState(false);
  }, [pathname, changeOpenState]);
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
  const isCurrentEndpoint = (to: string) =>
    pathname.split("/").includes(to.slice(1));

  useOnClickOutside(dropdownRef, () =>
    dropdownRef.current?.removeAttribute("open")
  );

  if (!matches) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className="fixed z-40 inset-0 overflow-hidden">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500 xl:duration-700"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 xl:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="flex h-full flex-col overflow-y-auto bg-white pt-6 shadow-xl">
            <ul className="w-full h-full pb-8 pt-16 flex flex-col gap-y-2">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-x-2 ms-6 p-5 transition-colors rounded-r-[50px]",
                      isActive && "text-secondary bg-grey-100"
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
                <details
                  className={clsx("collapse rounded-lg transition-colors flex")}
                  ref={dropdownRef}
                >
                  <summary
                    className={clsx(
                      "flex items-center gap-x-2 ms-6 p-5 transition-colors rounded-r-[50px]",
                      isCurrentEndpoint("/products") &&
                        "bg-grey-100 text-secondary"
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
                      "flex items-center gap-x-2 ms-6 p-5 transition-colors rounded-r-[50px]",
                      isActive && "text-secondary bg-grey-100"
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
                  to="/users"
                  end
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-x-2 ms-6 p-5 transition-colors rounded-r-[50px]",
                      isActive && "text-secondary bg-grey-100"
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
                      "flex items-center gap-x-2 ms-6 p-5 transition-colors rounded-r-[50px]",
                      isActive && "text-secondary bg-grey-100"
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
                  className={clsx(
                    "flex text-danger items-center gap-x-2 ms-6 p-5"
                  )}
                  onClick={handleLogout}
                >
                  <Logout />
                  خروج از حساب کاربری
                </button>
              </li>
            </ul>
          </div>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
}

export { AdminMobileSlideover };
