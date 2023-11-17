import { getTicketTicketsById } from "@/api/ticket";
import { Close } from "@/assets/icons/Close";
import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps, TICKET_STATUS_TYPE } from "@/model";
import clsx from "clsx";
import { Fragment } from "react";
import { Download } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function DetailsTicketsDialog({ closeModal, isOpen }: IExtendedDialogProps) {
  const { ticket_id } = useParams();

  const { data: ticket, isLoading } = useQuery(`ticket-${ticket_id}`, () =>
    getTicketTicketsById({
      id: ticket_id,
    })
  );

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title
        as="div"
        className="p-5 text-start shadow-header flex items-center justify-between"
      >
        <h2 className="text-base xl:text-xl">جزئیات تیکت پشتیبانی</h2>
        <button
          className="btn btn-ghost btn-sm xl:btn-md btn-link btn-square text-grey-800 decoration-transparent"
          onClick={closeModal}
        >
          <Close className="sclae-100 xl:scale-125" />
        </button>
      </Dialog.Title>
      <Dialog.Panel as="ul" className="p-5 flex flex-col divide-y">
        {isLoading ? (
          <Fragment>
            <Skeleton height={57} />
            <Skeleton height={81} />
            <Skeleton height={57} />
            <Skeleton height={57} />
            <Skeleton height={57} />
          </Fragment>
        ) : (
          <Fragment>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">موضوع</span>
              <strong>{ticket?.data.title || "-"}</strong>
            </li>
            <li className="flex flex-col items-start justify-between py-4 text-sm gap-y-2">
              <span className="text-grey-600 font-light">پیام شما</span>
              <strong>{ticket?.data.message || "-"}</strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">فایل</span>
              <a
                href={ticket?.data.file}
                download
                target="_blank"
                rel="noreferrer noopener"
                className="flex justify-between items-center gap-x-2"
              >
                <span className="text-sm text-grey-600 font-light">
                  فایل ضمیمه شده
                </span>

                <Download />
              </a>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">زمان ثبت درخواست</span>
              <strong>
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(ticket?.data.created_at || ""))}
              </strong>
            </li>
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">وضعیت</span>
              <strong
                className={clsx(
                  "badge text-xs",
                  ticket?.data.status === "new" && "badge-success text-white",
                  ticket?.data.status === "processing" &&
                    "badge-secondary text-secondary",
                  ticket?.data.status === "closed" &&
                    "badge-accent text-grey-400"
                )}
              >
                {TICKET_STATUS_TYPE[ticket?.data.status]}
              </strong>
            </li>
          </Fragment>
        )}
      </Dialog.Panel>
    </Dialog>
  );
}

export { DetailsTicketsDialog };
