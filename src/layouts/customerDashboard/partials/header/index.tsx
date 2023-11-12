import { getAccountMyProfile } from "@/api/account";
import { Search, Wallet } from "react-iconly";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Input } from "@/components/input";
import { CartDropdown } from "@/shared/cartDropdown";
import { useDebounce, useMediaQuery, useOnClickOutside } from "usehooks-ts";
import { Fragment, useRef, useState } from "react";
import { Popover, PopoverButton } from "@/components/popover";
import { Menu } from "@/assets/icons/Menu";
import { MobileSlideover } from "@/shared/mobileSlideover";
import { getProductProduct } from "@/api/product";
import { product } from "@/model";

function CustomerDashboardHeader() {
  const [isMobileSlidoverOpen, setIsMobileSlidoverOpen] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLButtonElement>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery(
    "user-profile",
    () => getAccountMyProfile()
  );

  const { data: products } = useQuery(
    ["products-pagination", debouncedSearch],
    () =>
      getProductProduct({
        params: {
          search: debouncedSearch,
        },
      }),
    {
      enabled: search === "",
    }
  );

  useOnClickOutside(desktopDropdownRef, () => setSearch(""));

  const matches = useMediaQuery("(max-width: 1280px)");

  const { pathname } = useLocation();

  console.log(search);

  return (
    <header className="px-5 sticky top-0 bg-white w-full gap-x-3 z-40">
      <div className="flex bg-white w-full py-5 items-center border-b border-b-grey-200 gap-x-3">
        <Link to="/account" className="flex items-center me-auto xl:me-0">
          {isUserProfileLoading ? (
            <Skeleton width={144} height={16} />
          ) : (
            <span className="inline-block">
              {userProfile?.data.first_name || "کاربر"}{" "}
              {userProfile?.data.last_name}
            </span>
          )}
        </Link>
        {!pathname.includes("wallet") ? (
          <Link
            to="/wallet"
            className="order-last xl:order-none basis-full xl:basis-auto text-sm bg-secondary-100 items-center py-2 px-4 rounded-xl text-grey-600 gap-x-2 hidden xl:inline-flex"
          >
            <Wallet />
            موجودی کیف پول
            <span className="inline-flex items-center gap-x-2 ms-auto xl:ms-10">
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

        {!matches ? (
          <div className="ms-auto relative" ref={desktopDropdownRef}>
            <Input
              name="search"
              placeholder="جست و جو..."
              containerClassName="w-fit relative hidden xl:block"
              className="input input-bordered w-96"
              block={false}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearch("")}
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
            {search !== "" ? (
              <div className="absolute top-full inset-y-0 w-full divide-y bg-white rounded-b-lg shadow-ev3 h-fit flex flex-col z-50">
                {products?.data.results.map((item: product) => (
                  <Link
                    className="py-3 px-2"
                    key={item.id}
                    to={`/products/${item.id}`}
                    onClick={() => {
                      setSearch("");
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        <CartDropdown />
        {matches ? (
          <Fragment>
            <Popover
              className="w-full xl:w-[430px] max-w-screen top-2/3 shadow-card rounded-custom shadow-ev3 z-30"
              orientation="left"
              popoverBtn={
                <PopoverButton
                  ref={mobileDropdownRef}
                  className="btn btn-square btn-sm btn-ghost focus:outline-none hover:bg-white decoration-transparent text-grey-800 ms-auto"
                >
                  <Search />
                </PopoverButton>
              }
            >
              <div className="py-2">
                <Input
                  name="search"
                  placeholder="جست و جو..."
                  containerClassName="w-full ms-auto relative"
                  className="input input-bordered w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                {search !== "" ? (
                  <div className="w-full divide-y bg-white h-fit flex flex-col">
                    {products?.data.results.map((item: product) => (
                      <Link
                        to={`/products/${item.id}`}
                        className="py-3 px-2"
                        key={item.id}
                        onClick={() => {
                          setSearch("");
                          mobileDropdownRef.current?.blur();
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </Popover>
            <Link
              to="/wallet"
              className="btn btn-sm btn-square text-grey-800 btn-ghost"
            >
              <Wallet />
            </Link>
            <button
              className="btn px-0 text-grey-800 btn-sm btn-ghost"
              onClick={() => setIsMobileSlidoverOpen(true)}
            >
              <Menu />
            </button>
          </Fragment>
        ) : (
          ""
        )}
      </div>

      <MobileSlideover
        isOpen={isMobileSlidoverOpen}
        setIsOpen={setIsMobileSlidoverOpen}
      />
    </header>
  );
}

export { CustomerDashboardHeader };
