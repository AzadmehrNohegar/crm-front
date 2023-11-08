import {
  // getTicketTicketsById,
  getTicketTicketsReplyById,
  postTicketTicketsReplyById,
} from "@/api/ticket";
import { Attach } from "@/assets/icons/Attach";
import { Support as SupportIcon } from "@/assets/icons/Support";
import { Input } from "@/components/input";
import { ticket_reply } from "@/model";
import { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Calling,
  Download,
  Location,
  Message,
  Send,
  Show,
  TimeCircle,
} from "react-iconly";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DetailsTicketsDialog } from "./partials/detailsTicketsDialog";
import { getAccountMyProfile } from "@/api/account";

interface ISupportDetailsForm {
  message: string;
  file: FileList | null;
}

function SupportDetails() {
  const { ticket_id } = useParams();

  const [isDetailsTicketsDialogOpen, setIsDetailsTicketsDialogOpen] =
    useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { data: ticketsReply } = useQuery(
    `ticket-reply-${ticket_id}`,
    () =>
      getTicketTicketsReplyById({
        id: ticket_id,
        params: {
          page_size: 100,
        },
      }),
    {
      onSuccess: () =>
        scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
    }
  );
  const { data: userProfile } = useQuery("user-profile", () =>
    getAccountMyProfile()
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ISupportDetailsForm>({
    defaultValues: {
      file: null,
      message: "",
    },
  });

  const createTicketReply = useMutation(postTicketTicketsReplyById, {
    onSuccess: () => {
      toast("پیام با موفقیت ارسال شد.", {
        type: "success",
      });
      queryClient.invalidateQueries();
      reset();
    },
  });

  const onSubmit = (values: ISupportDetailsForm) => {
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("ticket", String(ticket_id));
    formData.append("author", userProfile?.data.id);
    if (values.file) formData.append("file", values.file[0]);

    createTicketReply.mutate({
      body: formData,
      id: ticket_id,
    });
  };

  return (
    <Fragment>
      <div className="h-innerContainer flex items-stretch gap-x-4">
        <div className="w-7/12 h-full flex flex-col border border-grey-200 rounded-custom">
          <div className="py-3 px-5 flex items-center bg-grey-50 rounded-t-custom gap-x-2">
            <span className="bg-secondary-50 rounded-lg">
              <SupportIcon />
            </span>
            <span>ادمین</span>
            <button
              className="btn btn-ghost btn-square text-grey-800 ms-auto"
              onClick={() => setIsDetailsTicketsDialogOpen(true)}
            >
              <Show />
            </button>
          </div>
          <div className="h-full flex flex-col gap-y-4 overflow-auto p-5">
            {ticketsReply?.data.results.map((item: ticket_reply) => {
              if (item.is_admin_response)
                return (
                  <div
                    className="w-full p-3.5 bg-grey-50 rounded-custom rounded-tr-none flex flex-col gap-y-2"
                    key={item.id}
                  >
                    <span>{item.message}</span>
                    {item.file ? (
                      <a
                        href={item.file}
                        download
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-full border-t border-t-grey-200 pt-2 flex justify-between items-center"
                      >
                        <span className="inline-flex flex-col gap-y-2">
                          <span className="text-sm text-grey-600 font-light">
                            فایل ضمیمه شده
                          </span>
                          <span className="text-grey-500 font-light inline-flex items-center gap-x-1 text-xs">
                            <TimeCircle size="small" />
                            {new Intl.DateTimeFormat("fa-IR", {
                              timeStyle: "short",
                            }).format(new Date(item.created_at))}
                          </span>
                        </span>
                        <Download />
                      </a>
                    ) : (
                      <span className="ms-auto text-grey-500 font-light inline-flex items-center gap-x-1 text-xs">
                        <TimeCircle size="small" />
                        {new Intl.DateTimeFormat("fa-IR", {
                          timeStyle: "short",
                        }).format(new Date(item.created_at))}
                      </span>
                    )}
                  </div>
                );
              return (
                <div
                  className="w-full p-3.5 bg-success-50 rounded-custom rounded-tl-none flex flex-col gap-y-2"
                  key={item.id}
                >
                  <span>{item.message}</span>
                  {item.file ? (
                    <a
                      href={item.file}
                      download
                      target="_blank"
                      rel="noreferrer noopener"
                      className="w-full border-t border-t-grey-200 pt-2 flex justify-between items-center"
                    >
                      <span className="inline-flex flex-col gap-y-2">
                        <span className="text-sm text-grey-600 font-light">
                          فایل ضمیمه شده
                        </span>
                        <span className="text-grey-500 font-light inline-flex items-center gap-x-1 text-xs">
                          <TimeCircle size="small" />
                          {new Intl.DateTimeFormat("fa-IR", {
                            timeStyle: "short",
                          }).format(new Date(item.created_at))}
                        </span>
                      </span>
                      <Download />
                    </a>
                  ) : (
                    <span className="ms-auto text-grey-500 font-light inline-flex items-center gap-x-1 text-xs">
                      <TimeCircle size="small" />
                      {new Intl.DateTimeFormat("fa-IR", {
                        timeStyle: "short",
                      }).format(new Date(item.created_at))}
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-end gap-x-2 py-3 px-5"
          >
            <input
              id="file"
              className="hidden"
              type="file"
              {...register("file")}
            />
            <Input
              type="text"
              placeholder="پیام خود را وارد کنید"
              className="input input-bordered w-full"
              error={errors.message}
              iconEnd={
                <label
                  htmlFor="file"
                  className="absolute end-0 inset-y-auto text-grey-800 btn btn-ghost btn-square"
                >
                  <Attach />
                </label>
              }
              {...register("message", {
                required: "این فیلد اجباری است.",
              })}
            />
            <button
              className="btn btn-secondary btn-square"
              disabled={!isDirty || !isValid}
            >
              <Send />
            </button>
          </form>
        </div>
        <div className="w-5/12 flex flex-col justify-start gap-y-4">
          <img
            src="/images/support-bg.png"
            className="w-full"
            alt="support bg"
          />
          <div className="flex flex-col gap-y-4 p-5 w-full bg-grey-50 rounded-custom">
            <h2 className="text-base sm:text-xl">با ما در ارتباط باشید</h2>
            <p className="text-grey-600 font-light">
              برای ارتباط با ما کافی است فرم را تکمیل کنید تا در اسرع وقت
              کارشناسان با شما تماس بگیرند و یا از طریق راه‌های ارتباطی
              می‌توانید با بازرگانی موثق در ارتباط باشید.
            </p>
            <ul className="flex flex-col gap-y-4 w-full">
              <li className="flex items-center justify-between">
                <span className="text-sm font-light text-grey-600 flex items-center gap-x-2">
                  <span className="p-1.5 bg-grey-100 rounded-lg">
                    <Message size="small" />
                  </span>
                  ایمیل
                </span>
                <span>movasagh@gmail.com</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm font-light text-grey-600 flex items-center gap-x-2">
                  <span className="p-1.5 bg-grey-100 rounded-lg">
                    <Calling size="small" />
                  </span>
                  شماره تماس
                </span>
                <span>۰۹۱۲۶۳۷۲۹۳۴</span>
              </li>
              <li className="flex flex-col items-start gap-y-2">
                <span className="text-sm font-light text-grey-600 flex items-center gap-x-2">
                  <span className="p-1.5 bg-grey-100 rounded-lg">
                    <Location size="small" />
                  </span>
                  آدرس
                </span>
                <address className="not-italic">
                  تهران، بازار بزرگ، بازار نوروز خان، سرای عزیزیان، پلاک ۶۷
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <DetailsTicketsDialog
        isOpen={isDetailsTicketsDialogOpen}
        closeModal={() => setIsDetailsTicketsDialogOpen(false)}
      />
    </Fragment>
  );
}

export default SupportDetails;
