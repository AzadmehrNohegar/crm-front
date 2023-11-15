import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps } from "@/model";

interface INotificationCreateConfirmDialogProps extends IExtendedDialogProps {
  title: string;
  onConfirm: () => void;
  isLoading: boolean;
}

function NotificationCreateConfirmDialog({
  closeModal,
  isOpen,
  title,
  onConfirm,
  isLoading,
}: INotificationCreateConfirmDialogProps) {
  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title as="div" className="p-3.5 xl:p-5 text-start shadow-header">
        <h2 className="text-base xl:text-xl">ارسال پیام سیستم</h2>
      </Dialog.Title>
      <Dialog.Panel className="p-5 flex flex-col gap-y-6 min-h-[200px]">
        <span className="flex items-center gap-x-2">
          <span>آیا از ارسال پیام با موضوع</span>
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
            ارسال پیام سیستم
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { NotificationCreateConfirmDialog };
