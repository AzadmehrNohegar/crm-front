import { getAccountMyProfile } from "@/api/account";
import { postTicketTickets } from "@/api/ticket";
import { Close } from "@/assets/icons/Close";
import { Attach } from "@/assets/icons/Attach";
import { Input } from "@/components/input";
import { AxiosResponse } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Calling, Location, Message } from "react-iconly";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ISupportCreateForm {
  title: string;
  message: string;
  file: FileList | null;
}

function SupportCreate() {
  const navigate = useNavigate();

  const { data: userProfile } = useQuery("user-profile", () =>
    getAccountMyProfile()
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
    setValue,
    control,
  } = useForm<ISupportCreateForm>({
    defaultValues: {
      file: null,
      message: "",
      title: "",
    },
    mode: "onChange",
  });

  const createTicket = useMutation(postTicketTickets, {
    onSuccess: (res: AxiosResponse) => {
      toast("تیکت با موفقیت ایجاد شد.", {
        type: "success",
      });
      navigate(`../${res?.data.id}`);
    },
  });

  const onSubmit = (values: ISupportCreateForm) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("message", values.message);
    formData.append("user", userProfile?.data.id);
    if (values.file) formData.append("file", values.file[0]);

    createTicket.mutate({
      body: formData,
    });
  };

  return (
    <div className="h-innerContainer flex items-stretch gap-x-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-7/12 flex flex-col gap-y-4"
      >
        <Input
          type="text"
          placeholder="موضوع تیکت پشتیبانی را وارد کنید."
          label="موضوع"
          className="input input-bordered w-full"
          error={errors.title}
          iconEnd={
            dirtyFields.title ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("title", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("title", {
            required: "این فیلد اجباری است.",
          })}
        />
        <div className="flex items-start flex-col w-full">
          <label htmlFor="message" className="label label-text">
            <span className="text-grey-500 text-xs">پیام شما</span>
          </label>
          <textarea
            id="message"
            rows={12}
            cols={12}
            placeholder="متن پیام را وارد کنید."
            className=" textarea textarea-bordered w-full resize-none h-36"
            {...register("message", {
              required: "این فیلد اجباری است.",
            })}
          />
        </div>
        <div className="flex items-end gap-x-3">
          <input
            id="file"
            className="hidden"
            type="file"
            {...register("file")}
          />
          <Controller
            control={control}
            name="file"
            render={({ field: { value } }) => (
              <Input
                type="text"
                value={value?.[0]?.name || ""}
                placeholder="فایل مورد نظر را وارد کنید."
                label="افزودن فایل"
                className="input input-bordered w-full"
                disabled
              />
            )}
          />

          <label className="btn btn-secondary btn-square" htmlFor="file">
            <Attach />
          </label>
        </div>
        <div className="flex items-center justify-end gap-x-3">
          <Link to=".." className="btn btn-outline btn-primary w-40">
            انصراف
          </Link>
          <button
            className="btn btn-primary w-40"
            disabled={!isDirty || !isValid || createTicket.isLoading}
          >
            ایجاد تیکت پشتیبانی
          </button>
        </div>
      </form>
      <div className="w-5/12 flex flex-col justify-start gap-y-4">
        <img src="/images/support-bg.png" className="w-full" alt="support bg" />
        <div className="flex flex-col gap-y-4 p-5 w-full bg-grey-50 rounded-custom">
          <h2 className="text-base sm:text-xl">با ما در ارتباط باشید</h2>
          <p className="text-grey-600 font-light">
            برای ارتباط با ما کافی است فرم را تکمیل کنید تا در اسرع وقت
            کارشناسان با شما تماس بگیرند و یا از طریق راه‌های ارتباطی می‌توانید
            با بازرگانی موثق در ارتباط باشید.
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
  );
}

export default SupportCreate;
