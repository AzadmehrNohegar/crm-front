import { getAccountAdminAccount } from "@/api/account";
import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps, account } from "@/model";
import { useQuery } from "react-query";
import { SupportCreateAccountTable } from "./partials/supportCreateAddAccountTable";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { Input } from "@/components/input";
import { Filter2, Search } from "react-iconly";
import { Popover, PopoverButton } from "@/components/popover";
import { Checkbox } from "@/components/checkbox";
import { Pagination } from "@/shared/pagination";

interface ISupportCreateAddAccountDialogProps extends IExtendedDialogProps {
  setUser: (value: account) => void;
}

function SupportCreateAddAccountDialog({
  closeModal,
  isOpen,
  setUser,
}: ISupportCreateAddAccountDialogProps) {
  const [selectedAccount, setSelectedAccount] = useState<account | null>(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { search: locationSearch } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: accountPagination } = useQuery(
    ["account-pagination", debouncedSearch, locationSearch],
    () =>
      getAccountAdminAccount({
        params: {
          search: debouncedSearch,
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 10,
          ...(searchParams.get("ordering")
            ? { ordering: searchParams.get("ordering") || "" }
            : {}),
          ...(searchParams.get("account__contract_type")
            ? {
                account__contract_type:
                  searchParams.get("account__contract_type") || "",
              }
            : {}),
        },
      }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <Dialog
      isOpen={isOpen}
      closeModal={() => {
        setSearchParams("");
        closeModal();
      }}
      placement="center"
      size="large"
    >
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">افزودن کاربر</h2>
      </Dialog.Title>

      <Dialog.Panel className="p-5 flex flex-col gap-y-6">
        <div className="flex items-center w-full gap-x-4 relative justify-between">
          <Input
            name="search"
            placeholder="جست و جو..."
            containerClassName="w-fit relative hidden xl:block me-auto"
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
          <Popover
            popoverBtn={
              <PopoverButton className="btn btn-warning btn-square text-grey-800">
                <Filter2 />
              </PopoverButton>
            }
            className="w-full top-full rounded-lg shadow-ev3 inset-x-0"
          >
            <div className="flex flex-wrap py-4 gap-4">
              <div className="flex items-center gap-x-4 flex-wrap xl:flex-nowrap gap-y-2">
                <span className="font-semibold basis-full xl:basis-auto">
                  نوع کاربر:
                </span>
                <Checkbox
                  label="حقیقی"
                  className="checkbox-accent"
                  containerClassName="w-fit"
                  checked={
                    searchParams.get("account__contract_type") === "REAL"
                  }
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      searchParams.set("account__contract_type", "REAL");
                      setSearchParams(searchParams);
                    } else {
                      searchParams.delete("account__contract_type");
                      setSearchParams(searchParams);
                    }
                  }}
                />
                <Checkbox
                  label="حقوقی"
                  className="checkbox-accent"
                  containerClassName="w-fit"
                  checked={
                    searchParams.get("account__contract_type") === "JURIDICAL"
                  }
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      searchParams.set("account__contract_type", "JURIDICAL");
                      setSearchParams(searchParams);
                    } else {
                      searchParams.delete("account__contract_type");
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
        </div>
        <div className="mt-6 pb-36 xl:pb-24 text-start relative">
          <div className="flex items-center bg-grey-50 rounded-t-custom justify-between">
            <h3 className="text-sm xl:text-base w-full p-5">لیست کاربران</h3>
          </div>
          <SupportCreateAccountTable
            selectedAccount={selectedAccount}
            setSelectedAccount={(account) => setSelectedAccount(account)}
            accounts={accountPagination?.data.results}
            isLoading={false}
          />
          <Pagination
            count={accountPagination?.data.count}
            next={accountPagination?.data.next}
            page={+searchParams.get("page")! || 1}
            perPage={+searchParams.get("page_size")! || 10}
            prev={accountPagination?.data.prev}
            setPage={(val) => {
              searchParams.set("page", String(val));
              setSearchParams(searchParams);
            }}
            setPerPage={(val) => {
              searchParams.set("page_size", String(val));
              searchParams.set("page", "1");
              setSearchParams(searchParams);
            }}
            isFixed={false}
            containerClassName="inset-x-0"
          />
        </div>

        <div className="flex justify-end gap-x-4 mt-auto">
          <button
            onClick={closeModal}
            className="btn btn-outline btn-secondary min-w-[160px]"
          >
            انصراف
          </button>
          <button
            type="button"
            className="btn btn-secondary min-w-[160px] disabled:bg-grey-200"
            disabled={!selectedAccount}
            onClick={() => {
              setUser(selectedAccount!);
              closeModal();
            }}
          >
            افزودن کاربر
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { SupportCreateAddAccountDialog };
