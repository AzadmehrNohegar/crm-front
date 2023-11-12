import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useCallback, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import {
  Bag,
  Calling,
  Bookmark,
  Home,
  Logout,
  Notification,
  Wallet,
  Search,
} from "react-iconly";
import { useMutation, useQuery } from "react-query";
import { getAccountMyProfile, postAccountAuthLogout } from "@/api/account";
import { useAuthStore } from "@/store/auth";
import { toast } from "react-toastify";
import { Close } from "@/assets/icons/Close";
import { Input } from "@/components/input";

interface IMobileSlideoverProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

function MobileSlideover({ isOpen, setIsOpen }: IMobileSlideoverProps) {
  const { pathname } = useLocation();
  const matches = useMediaQuery("(max-width: 1280px)");

  const { data: userProfile } = useQuery("user-profile", () =>
    getAccountMyProfile()
  );

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

  if (!matches) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className="fixed z-50 inset-0 overflow-hidden">
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500 xl:duration-700"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 xl:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="flex h-full flex-col overflow-y-auto bg-grey-50 pt-6 shadow-xl">
            <div className="flex items-center justify-between px-6 flex-wrap gap-y-4">
              <Link
                to="/wallet"
                className="text-sm bg-secondary-100 items-center py-2 px-4 rounded-xl text-grey-600 gap-x-2 inline-flex"
              >
                <Wallet />
                موجودی کیف پول
                <span className="inline-flex items-center gap-x-2 ms-auto xl:ms-10">
                  <strong className="text-grey-800">
                    {Number(
                      userProfile?.data.customer?.wallet
                    ).toLocaleString()}{" "}
                  </strong>
                  تومان
                </span>
              </Link>
              <button
                className="btn btn-ghost btn-sm btn-square"
                onClick={() => setIsOpen(false)}
              >
                <Close />
              </button>

              <Input
                name="search"
                placeholder="جست و جو..."
                containerClassName="w-full relative basis-auto"
                className="input input-bordered input-ghost w-96"
                block={false}
                iconEnd={
                  <button
                    type="button"
                    className="absolute end-2 inset-y-auto btn btn-secondary btn-sm"
                  >
                    پیدا کن
                    <Search />
                  </button>
                }
              />
            </div>
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

export { MobileSlideover };
