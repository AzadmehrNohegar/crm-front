import { getPaymentWalletTransaction } from "@/api/payment";
import { Plus } from "@/assets/icons";
import { Checkbox } from "@/components/checkbox";
import { DatePicker } from "@/components/datepicker";
import { Input } from "@/components/input";
import { Popover, PopoverButton } from "@/components/popover";
import { Pagination } from "@/shared/pagination";
import { Fragment, useState } from "react";
import { Filter2, Search, Swap, Wallet as WalletIcon } from "react-iconly";
import { useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import { CreateWalletTransactionDialog } from "./partials/createWalletTransactionDialog";

function Wallet() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search: locationSearch } = useLocation();

  const [
    isCreateWalletTransactionDialogOpen,
    setIsCreateWalletTransactionDialogOpen,
  ] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const { data: walletTransactions } = useQuery(
    ["wallet-transactions", debouncedSearch, locationSearch],
    () =>
      getPaymentWalletTransaction({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
        },
      })
  );

  return (
    <Fragment>
      <div className="relative">
        <div className="flex items-center w-full gap-x-4 relative">
          <span className="text-sm inline-flex bg-secondary-100 items-center py-3 px-4 rounded-xl text-grey-600 gap-x-2 me-auto">
            <WalletIcon />
            موجودی کیف پول
            <span className="inline-flex items-center gap-x-2 ms-auto sm:ms-10">
              <strong className="text-grey-800">0</strong>
              تومان
            </span>
          </span>
          <Popover
            popoverBtn={
              <PopoverButton className="btn btn-warning btn-square text-grey-800">
                <Filter2 />
              </PopoverButton>
            }
            className="w-full top-full rounded-lg shadow-ev3 inset-x-0"
          >
            <div className="flex flex-wrap p-4 gap-x-4">
              <div className="flex flex-wrap items-start gap-x-2 gap-y-4 pe-4 border-e border-e-grey-200">
                <DatePicker
                  range
                  containerClassName="w-full min-w-[350px]"
                  id="date"
                  placeholder="تاریخ مورد نظر را انتخاب کنید."
                />
              </div>
              <div className="flex items-center gap-x-4">
                <Checkbox
                  label="موفق"
                  containerClassName="w-fit"
                  checked={searchParams.get("status") === "success"}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      searchParams.set("status", "success");
                      setSearchParams(searchParams);
                    } else {
                      searchParams.delete("status");
                      setSearchParams(searchParams);
                    }
                  }}
                />
                <Checkbox
                  label="درحال بررسی"
                  containerClassName="w-fit"
                  checked={searchParams.get("status") === "pending"}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      searchParams.set("status", "pending");
                      setSearchParams(searchParams);
                    } else {
                      searchParams.delete("status");
                      setSearchParams(searchParams);
                    }
                  }}
                />
                <Checkbox
                  label="ناموفق"
                  containerClassName="w-fit"
                  checked={searchParams.get("status") === "failed"}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      searchParams.set("status", "failed");
                      setSearchParams(searchParams);
                    } else {
                      searchParams.delete("status");
                      setSearchParams(searchParams);
                    }
                  }}
                />
              </div>
              <button
                className="btn text-primary btn-link decoration-transparent ms-auto"
                onClick={() => setSearchParams("")}
              >
                پاکسازی فیلتر
              </button>
            </div>
          </Popover>
          <button
            className="btn btn-primary"
            onClick={() => setIsCreateWalletTransactionDialogOpen(true)}
          >
            <Plus />
            افزایش موجودی
          </button>
        </div>
        <div className="my-6">
          <div className="flex items-center bg-grey-50 rounded-t-custom justify-between px-4">
            <h3 className="text-base w-full">سوابق کیف پول</h3>
            <Input
              className="input input-bordered h-10 ms-auto input-ghost max-w-full w-96"
              containerClassName="my-4"
              placeholder="جست‌وجو"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              iconEnd={
                <button className="btn btn-secondary btn-square btn-sm absolute end-2 inset-y-auto">
                  <Search />
                </button>
              }
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table table-auto text-start">
              <thead className="bg-grey-50">
                <tr>
                  <th align="right">
                    <span className="text-2xl font-light">#</span>
                  </th>
                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      شرح تراکنش
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>
                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      شماره تراکنش
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>

                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      نوع
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>
                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      مبلغ
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>
                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      زمان تراکنش
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>
                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      وضعیت
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>شارژ کیف پول برای خرید تیر</td>
                  <td>1460</td>
                  <td>
                    <span className="text-success-400">واریز</span>
                  </td>
                  <td>1۴۵,000 تومان</td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td>
                    <span className="text-success-400">موفق</span>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>شارژ کیف پول برای خرید تیر</td>
                  <td>1460</td>
                  <td>
                    <span className="text-success-400">واریز</span>
                  </td>
                  <td>1۴۵,000 تومان</td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td>
                    <span className="text-success-400">موفق</span>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>شارژ کیف پول برای خرید تیر</td>
                  <td>1460</td>
                  <td>
                    <span className="text-success-400">واریز</span>
                  </td>
                  <td>1۴۵,000 تومان</td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td>
                    <span className="text-success-400">موفق</span>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>شارژ کیف پول برای خرید تیر</td>
                  <td>1460</td>
                  <td>
                    <span className="text-success-400">واریز</span>
                  </td>
                  <td>1۴۵,000 تومان</td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td>
                    <span className="text-success-400">موفق</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          count={walletTransactions?.data.count}
          next={walletTransactions?.data.next}
          page={+searchParams.get("page")! || 1}
          perPage={+searchParams.get("page_size")! || 9}
          prev={walletTransactions?.data.prev}
          setPage={(val) => {
            searchParams.set("page", String(val));
            setSearchParams(searchParams);
          }}
          setPerPage={(val) => {
            searchParams.set("page_size", String(val));
            setSearchParams(searchParams);
          }}
          isEven
        />
      </div>
      <CreateWalletTransactionDialog
        isOpen={isCreateWalletTransactionDialogOpen}
        closeModal={() => setIsCreateWalletTransactionDialogOpen(false)}
      />
    </Fragment>
  );
}

export default Wallet;
