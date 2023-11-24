import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { Buy, Delete, Edit, InfoSquare, Wallet } from "react-iconly";
import { Link } from "react-router-dom";
import { CustomersDeleteDialog } from "./partials/customerDeleteAccountDialog";
import { CustomersDetailsInfoTab } from "./partials/customersDetailsInfoTab";
import { CustomersDetailsWalletTab } from "./partials/customersDetailsWalletTab";
import { CustomersDetailsOrdersTab } from "./partials/customersDetailsOrdersTab";

function CustomersDetails() {
  const [isCustomersDeleteDialogOpen, setIsCustomersDeleteDialogOpen] =
    useState(false);

  return (
    <Fragment>
      <Tab.Group>
        <Tab.List className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-2 bg-grey-50 p-3 w-fit rounded-[10px]">
            <Tab
              className={({ selected }) =>
                clsx(
                  "btn",
                  selected && "btn-secondary",
                  !selected && "btn-ghost text-grey-600"
                )
              }
            >
              <InfoSquare />
              اطلاعات کاربر
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(
                  "btn",
                  selected && "btn-secondary",
                  !selected && "btn-ghost text-grey-600"
                )
              }
            >
              <Wallet />
              کیف پول
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(
                  "btn",
                  selected && "btn-secondary",
                  !selected && "btn-ghost text-grey-600"
                )
              }
            >
              <Buy />
              سفارشات
            </Tab>
          </div>
          <button
            className="btn btn-error btn-square ms-auto text-white"
            onClick={() => setIsCustomersDeleteDialogOpen(true)}
          >
            <Delete />
          </button>
          <Link to="./edit" className="btn btn-secondary btn-square">
            <Edit />
          </Link>
        </Tab.List>
        <Tab.Panels className="py-5">
          <Tab.Panel>
            <CustomersDetailsInfoTab />
          </Tab.Panel>
          <Tab.Panel>
            <CustomersDetailsWalletTab />
          </Tab.Panel>
          <Tab.Panel>
            <CustomersDetailsOrdersTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <CustomersDeleteDialog
        isOpen={isCustomersDeleteDialogOpen}
        closeModal={() => setIsCustomersDeleteDialogOpen(false)}
      />
    </Fragment>
  );
}

export default CustomersDetails;
