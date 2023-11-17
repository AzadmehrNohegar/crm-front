import { Close } from "@/assets/icons/Close";
import { Input } from "@/components/input";
import { account } from "@/model";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AddUser } from "react-iconly";
import { SupportCreateAddAccountDialog } from "./partials/supportCreateAddAccountDialog";
import { Attach } from "@/assets/icons/Attach";
import { useMutation, useQueryClient } from "react-query";
import { postNotificationNotification } from "@/api/notification";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ISupportCreateForm {
  user: account | null;
  title: string;
  message: string;
  file: FileList | null;
}

function SupportCreate() {
  const [
    isSupportCreateAddAccountDialogOpen,
    setIsSupportCreateAddAccountDialogOpen,
  ] = useState(false);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields, isValid },
  } = useForm<ISupportCreateForm>({
    defaultValues: {
      user: null,
      title: "",
      message: "",
      file: null,
    },
  });

  const setUser = (value: account) => {
    setValue("user", value);
  };

  const createNotification = useMutation(postNotificationNotification, {
    onSuccess: (res) => {
      const { id } = res?.data as { id: number };
      queryClient.invalidateQueries([
        "notifications",
        "notifications-pagination",
      ]);
      toast("پیام با موفقیت ارسال شد.", {
        type: "success",
      });
      navigate(`../${id}`);
    },
  });

  const onSubmit = (values: ISupportCreateForm) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("message", values.message);
    formData.append("user", String(values.user?.id));
    if (values.file && values.file[0]) formData.append("file", values.file[0]);

    createNotification.mutate({
      body: formData,
    });
  };

  return (
    <Fragment>
      <form
        className="flex flex-col gap-y-5 h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-x-2 items-end">
          <Controller
            control={control}
            name="user"
            rules={{
              required: true,
            }}
            render={({ field: { value } }) => (
              <Input
                type="text"
                className="input input-bordered w-full"
                label="افزودن کاربر"
                placeholder="کاربر را انتخاب کنید."
                readOnly
                value={
                  value
                    ? `${value?.first_name || ""} ${value?.last_name || ""}`
                    : ""
                }
                iconEnd={
                  value ? (
                    <button
                      type="button"
                      className="absolute end-4 inset-y-auto text-grey-600"
                      onClick={() => setValue("user", null)}
                    >
                      <Close />
                    </button>
                  ) : null
                }
              />
            )}
          />
          <button
            type="button"
            className="btn btn-secondary btn-square"
            onClick={() => setIsSupportCreateAddAccountDialogOpen(true)}
          >
            <AddUser />
          </button>
        </div>
        <Input
          type="text"
          placeholder="موضوع"
          label="موضوع تیکت پشتیبانی را وارد کنید."
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
            <span className="text-grey-500 text-xs">پیام</span>
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
                readOnly
                value={value instanceof FileList ? value?.[0]?.name : ""}
                placeholder="فایل مورد نظر را وارد کنید."
                label="افزودن فایل"
                className="input input-bordered w-full"
              />
            )}
          />
          <label className="btn btn-secondary btn-square" htmlFor="file">
            <Attach />
          </label>
        </div>
        <div className="mt-auto flex justify-end items-center gap-x-4">
          <Link to=".." className="btn btn-outline btn-secondary w-40">
            انصراف
          </Link>

          <button
            className="btn btn-secondary w-40 disabled:bg-grey-200"
            disabled={!isValid}
          >
            ایجاد تیکت پشتیبانی
          </button>
        </div>
      </form>
      <SupportCreateAddAccountDialog
        isOpen={isSupportCreateAddAccountDialogOpen}
        closeModal={() => setIsSupportCreateAddAccountDialogOpen(false)}
        setUser={setUser}
      />
    </Fragment>
  );
}

export default SupportCreate;
