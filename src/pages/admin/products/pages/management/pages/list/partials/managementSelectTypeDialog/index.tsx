import { Dialog } from "@/components/dialog";
import { RadioSelect } from "@/components/radioSelect";
import { IExtendedDialogProps, listOption } from "@/model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRODUCT_TYPES: listOption[] = [
  {
    id: "WHOLESALE",
    label: "محصول عمده",
  },
  {
    id: "PACKING",
    label: "محصول بسته‌ای",
  },
];

function ManagementSelectTypeDialog({
  closeModal,
  isOpen,
}: IExtendedDialogProps) {
  const [productType, setProductType] = useState<listOption | null>(null);

  const navigate = useNavigate();

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">انتخاب نوع محصول</h2>
      </Dialog.Title>
      <Dialog.Panel className="p-5 flex flex-col gap-y-6 min-h-[200px]">
        <RadioSelect
          variant="secondary"
          containerClassName="w-full"
          options={PRODUCT_TYPES}
          selected={productType}
          setSelected={(option) => setProductType(option!)}
        />
        <div className="flex justify-end gap-x-4 mt-auto">
          <button
            onClick={closeModal}
            className="btn btn-link decoration-transparent btn-ghost min-w-[160px]"
          >
            انصراف
          </button>
          <button
            type="button"
            className="btn btn-secondary min-w-[160px] disabled:bg-grey-200"
            disabled={productType?.id === ""}
            onClick={() => navigate(`./create?type=${productType?.id}`)}
          >
            افزودن محصول جدید
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { ManagementSelectTypeDialog };
