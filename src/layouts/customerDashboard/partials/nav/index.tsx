import clsx from "clsx";
import { Fragment } from "react";
import { Bag, Bookmark, Buy, Calling, Home } from "react-iconly";
import { NavLink } from "react-router-dom";

function CustomerDashboardNavigation() {
  return (
    <div className="btm-nav z-30 flex items-center bg-gray-50 h-fit py-2">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          clsx(
            "btn rounded-[100px] max-w-max",
            !isActive && "btn-ghost",
            isActive && "btn-primary"
          )
        }
      >
        {({ isActive }) => (
          <Fragment>
            <Home filled={isActive} />
            {isActive ? "صفحه اصلی" : ""}
          </Fragment>
        )}
      </NavLink>
      <NavLink
        to="/products"
        end
        className={({ isActive }) =>
          clsx(
            "btn rounded-[100px] max-w-max",
            !isActive && "btn-ghost",
            isActive && "btn-primary"
          )
        }
      >
        {({ isActive }) => (
          <Fragment>
            <Bag filled={isActive} />
            {isActive ? "محصولات" : ""}
          </Fragment>
        )}
      </NavLink>
      <NavLink
        to="/orders"
        end
        className={({ isActive }) =>
          clsx(
            "btn rounded-[100px] max-w-max",
            !isActive && "btn-ghost",
            isActive && "btn-primary"
          )
        }
      >
        {({ isActive }) => (
          <Fragment>
            <Bookmark filled={isActive} />
            {isActive ? "سفارشات" : ""}
          </Fragment>
        )}
      </NavLink>
      <NavLink
        to="/support"
        end
        className={({ isActive }) =>
          clsx(
            "btn rounded-[100px] max-w-max",
            !isActive && "btn-ghost",
            isActive && "btn-primary"
          )
        }
      >
        {({ isActive }) => (
          <Fragment>
            <Calling filled={isActive} />
            {isActive ? "پشتیبانی" : ""}
          </Fragment>
        )}
      </NavLink>
      <NavLink
        to="/checkout"
        className={({ isActive }) =>
          clsx(
            "btn rounded-[100px] max-w-max",
            !isActive && "btn-ghost",
            isActive && "btn-primary"
          )
        }
      >
        {({ isActive }) => (
          <Fragment>
            <Buy filled={isActive} />
            {isActive ? "سبد خرید" : ""}
          </Fragment>
        )}
      </NavLink>
    </div>
  );
}

export { CustomerDashboardNavigation };
