import { Input } from "@/components/input";
import { Pagination } from "@/shared/pagination";
import { Fragment, useState } from "react";
import { Plus, Search } from "react-iconly";
import { useMediaQuery } from "usehooks-ts";
import { SettingsCreateAdminDialog } from "./partials/settingsCreateAdminDialog";
import { SettingsTable } from "./partials/settingsTable";

function Settings() {
  const matches = useMediaQuery("(max-width: 1280px)");

  const [isCreateAdminDialogOpen, setIsCreateAdminDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Fragment>
      <div className="relative">
        <div className="flex flex-wrap xl:flex-nowrap items-center w-full gap-4 relative">
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
          <button
            className="ms-auto btn btn-secondary"
            onClick={() => setIsCreateAdminDialogOpen(true)}
          >
            <Plus />
            افزودن ادمین جدید
          </button>
        </div>
        {matches ? (
          <div className="mt-6 mb-36 xl:mb-28">
            <div className="rounded-custom border border-grey-200">
              <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
                <h3 className="text-sm xl:text-base w-full py-5">
                  لیست ادمین‌ها
                </h3>
              </div>
              {/* <MobileWalletTable
              wallet_transactions={walletTransactions?.data.results}
              isLoading={isLoading}
            /> */}
            </div>
          </div>
        ) : (
          <div className="mt-6 mb-36 xl:mb-28">
            <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full py-5">
                لیست ادمین‌ها
              </h3>
            </div>
            <SettingsTable admins={[]} isLoading={false} />
          </div>
        )}

        <Pagination
          count={10}
          next={null}
          page={1}
          perPage={10}
          prev={null}
          setPage={console.log}
          setPerPage={console.log}
        />
      </div>
      <SettingsCreateAdminDialog
        isOpen={isCreateAdminDialogOpen}
        closeModal={() => setIsCreateAdminDialogOpen(false)}
      />
    </Fragment>
  );
}

export default Settings;
