import { deleteProductCategoryById } from "@/api/product";
import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps, category } from "@/model";
import { Delete } from "react-iconly";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

function CategoriesDeleteDialog({
  closeModal,
  isOpen,
  category,
}: IExtendedDialogProps & { category: category }) {
  const queryClient = useQueryClient();

  const deleteCategory = useMutation(deleteProductCategoryById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["product-categories"]);
      toast("دسته بندی حذف شد.", {
        type: "info",
      });
      closeModal();
    },
  });

  const handleDeleteCategory = () =>
    deleteCategory.mutate({
      id: category.id.toString(),
    });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">حذف دسته‌بندی</h2>
      </Dialog.Title>
      <Dialog.Panel className="p-5 flex flex-col gap-y-6 min-h-[200px]">
        <span className="flex items-center gap-x-2">
          <span>آیا از حذف دسته‌بندی</span>
          <strong>'{category.name}'</strong>
          <span>مطمئن هستید؟</span>
        </span>
        <div className="flex justify-end gap-x-4 mt-auto">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-link decoration-transparent btn-ghost min-w-[160px]"
          >
            انصراف
          </button>
          <button
            className="btn btn-error min-w-[160px]"
            onClick={handleDeleteCategory}
          >
            <Delete />
            حذف دسته‌بندی
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { CategoriesDeleteDialog };
