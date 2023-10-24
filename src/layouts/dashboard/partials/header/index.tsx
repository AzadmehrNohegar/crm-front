import { getAccountMyProfile } from "@/api/account";
import { ArrowLeft, Search, Wallet } from "react-iconly";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Input } from "@/components/input";
import { CartDropdown } from "@/shared/cartDropdown";

function DashboardHeader() {
  const { data: userProfile, isLoading } = useQuery("user-profile", () =>
    getAccountMyProfile()
  );

  return (
    <header className="px-5 sticky top-0 bg-white w-full py-5 flex items-center border-b border-b-grey-200 gap-x-3">
      <Link to="/account" className="flex items-center">
        {isLoading ? (
          <Skeleton width={144} height={16} />
        ) : (
          <span className="inline-block w-36">
            {userProfile?.data.first_name} {userProfile?.data.last_name}
          </span>
        )}
        <ArrowLeft />
      </Link>
      <Link
        to="/wallet"
        className="order-last sm:order-none basis-full sm:basis-auto text-sm inline-flex bg-secondary-100 items-center py-2 px-4 rounded-xl text-grey-600 gap-x-2"
      >
        <Wallet />
        موجودی کیف پول
        <span className="inline-flex items-center gap-x-2 ms-auto sm:ms-10">
          <strong className="text-grey-800">0</strong>
          تومان
        </span>
      </Link>
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

export { DashboardHeader };
