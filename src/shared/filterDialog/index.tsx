import React from "react";
import { IExtendedDialogProps } from "@/model";
import { Dialog } from "@/components/dialog";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import clsx from "clsx";

interface IFilterDialogProps extends IExtendedDialogProps {
  children: React.ReactNode;
}

function FilterDialog({ children, closeModal, isOpen }: IFilterDialogProps) {
  const [, setSearchParams] = useSearchParams();

  const { role } = useAuthStore();

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
        <h2 className="text-base xl:text-xl">افزودن فیلتر</h2>
      </Dialog.Title>

      <Dialog.Panel className="p-5 flex flex-col gap-y-6 text-start">
        {children}

        <div className="flex justify-end gap-x-4 mt-auto">
          <button
            onClick={() => {
              setSearchParams("");
              closeModal();
            }}
            className={clsx(
              "btn btn-outline min-w-[160px]",
              role === "ADMIN" && "btn-secondary",
              role === "CUSTOMER" && "btn-primary"
            )}
          >
            انصراف
          </button>
          <button
            type="button"
            className={clsx(
              "btn min-w-[160px] disabled:bg-grey-200",
              role === "ADMIN" && "btn-secondary",
              role === "CUSTOMER" && "btn-primary"
            )}
            onClick={closeModal}
          >
            اعمال فیلتر
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { FilterDialog };
