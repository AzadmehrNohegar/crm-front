import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps } from "@/model";

interface INotificationEditConfirmDialogProps extends IExtendedDialogProps {
  title: string;
  onConfirm: () => void;
  isLoading: boolean;
}

function NotificationEditConfirmDialog({
  closeModal,
  isOpen,
  title,
  onConfirm,
  isLoading,
}: INotificationEditConfirmDialogProps) {
  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">تدوین پیام سیستم</h2>
      </Dialog.Title>
      <Dialog.Panel className="p-5 flex flex-col gap-y-6 min-h-[200px]">
        <span className="flex items-center gap-x-2">
          <span>آیا از تدوین پیام با موضوع</span>
          <strong>'{title}'</strong>
          <span>مطمئن هستید؟</span>
        </span>
        <div className="flex justify-end gap-x-4 mt-auto">
          <button
            onClick={closeModal}
            className="btn btn-link decoration-transparent btn-ghost min-w-[160px]"
          >
            انصراف
          </button>
          <button
            type="button"
            className="btn btn-secondary min-w-[160px]"
            onClick={onConfirm}
            disabled={isLoading}
          >
            تدوین پیام سیستم
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { NotificationEditConfirmDialog };
