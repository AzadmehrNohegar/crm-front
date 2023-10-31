import { getAccountMyProfile } from "@/api/account";
import { Search, Wallet } from "react-iconly";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Input } from "@/components/input";
import { CartDropdown } from "@/shared/cartDropdown";

function CustomerDashboardHeader() {
  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery(
    "user-profile",
    () => getAccountMyProfile()
  );

  const { pathname } = useLocation();

  return (
    <header className="px-5 sticky top-0 bg-white w-full py-5 flex items-center border-b border-b-grey-200 gap-x-3 z-10">
      <Link to="/account" className="flex items-center">
        {isUserProfileLoading ? (
          <Skeleton width={144} height={16} />
        ) : (
          <span className="inline-block w-36">
            {userProfile?.data.first_name} {userProfile?.data.last_name}
          </span>
        )}
      </Link>
      {!pathname.includes("wallet") ? (
        <Link
          to="/wallet"
          className="order-last sm:order-none basis-full sm:basis-auto text-sm inline-flex bg-secondary-100 items-center py-2 px-4 rounded-xl text-grey-600 gap-x-2"
        >
          <Wallet />
          موجودی کیف پول
          <span className="inline-flex items-center gap-x-2 ms-auto sm:ms-10">
            <strong className="text-grey-800">
              {isUserProfileLoading ? (
                <Skeleton height={16} width={36} inline />
              ) : (
                Number(userProfile?.data.customer?.wallet).toLocaleString()
              )}{" "}
            </strong>
            تومان
          </span>
        </Link>
      ) : null}

      <Input
        name="search"
        placeholder="جست و جو..."
        containerClassName="w-fit ms-auto relative"
        className="input input-bordered w-96"
        block={false}
        iconEnd={
          <button
            type="button"
            className="absolute end-4 inset-y-auto btn btn-secondary btn-sm"
          >
            پیدا کن
            <Search />
          </button>
        }
      />
      <CartDropdown />
    </header>
  );
}

export { CustomerDashboardHeader };
