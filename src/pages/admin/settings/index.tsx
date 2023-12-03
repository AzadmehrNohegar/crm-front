import { Input } from "@/components/input";
import { Fragment, useState } from "react";
import { Plus, Search } from "react-iconly";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { SettingsCreateAdminDialog } from "./partials/settingsCreateAdminDialog";
import { SettingsTable } from "./partials/settingsTable";
import { useQuery } from "react-query";
import { getAccountAdminList } from "@/api/account";
import { useLocation, useSearchParams } from "react-router-dom";
import { MobileSettingsTable } from "./partials/mobileSettingsTable";

function Settings() {
  const matches = useMediaQuery("(max-width: 1280px)");

  const [searchParams] = useSearchParams();

  const [isCreateAdminDialogOpen, setIsCreateAdminDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 200);

  const { search: locationSearch } = useLocation();

  const { data: admins, isLoading } = useQuery(
    ["admin-list-pagination", debouncedSearch, locationSearch],
    () =>
      getAccountAdminList({
        params: {
          page_size: 30,
          search: debouncedSearch,
          ...(searchParams.get("ordering")
            ? { ordering: searchParams.get("ordering") || "" }
            : {}),
        },
      })
  );

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
            className="ms-auto btn btn-secondary btn-block xl:w-fit"
            onClick={() => setIsCreateAdminDialogOpen(true)}
          >
            <Plus />
            افزودن ادمین جدید
          </button>
        </div>
        {matches ? (
          <div className="my-6">
            <div className="rounded-custom border border-grey-200">
              <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
                <h3 className="text-sm xl:text-base w-full">لیست ادمین‌ها</h3>
              </div>
              <MobileSettingsTable
                admins={admins?.data.results}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <div className="my-6">
            <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full py-5">
                لیست ادمین‌ها
              </h3>
            </div>
            <SettingsTable
              admins={admins?.data.results}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
      <SettingsCreateAdminDialog
        isOpen={isCreateAdminDialogOpen}
        closeModal={() => setIsCreateAdminDialogOpen(false)}
      />
    </Fragment>
  );
}

export default Settings;
