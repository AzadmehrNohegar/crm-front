import { Attach } from "@/assets/icons/Attach";
import { Close } from "@/assets/icons/Close";
import { Input } from "@/components/input";
import { RadioSelect } from "@/components/radioSelect";
import { NOTIFICATION_TYPE_DB, listOption, user_type } from "@/model";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NotificationCreateConfirmDialog } from "./partials/notificationCreateConfirmDialog";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getNotificationNotificationById,
  postNotificationNotification,
  putNotificationNotificationById,
} from "@/api/notification";
import { toast } from "react-toastify";
import { NotificationEditConfirmDialog } from "./partials/notificationEditConfirmDialog";

interface INotificationCreateForm {
  title: string;
  message: string;
  file: FileList | string | null;
  type: listOption | null;
  user_type: user_type;
}

const NOTIFICATION_TYPES: listOption[] = [
  {
    id: "USER",
    label: "فعالیت کاربر",
  },
  {
    id: "ORDER",
    label: "فرایند سفارش",
  },
  {
    id: "PRODUCT",
    label: "اطلاعات محصول",
  },
  {
    id: "NOTICE",
    label: "اعلانات کاربر",
  },
];

function NotificationCreate() {
  const queryClient = useQueryClient();
  const { notification } = useParams();

  const navigate = useNavigate();

  const { data: notificationData } = useQuery(
    `notification-${notification}`,
    () =>
      getNotificationNotificationById({
        id: notification,
      }),
    {
      enabled: !!notification,
    }
  );

  const [
    isNotificationCreateConfirmDialogOpen,
    setIsNotificationCreateConfirmDialogOpen,
  ] = useState(false);

  const [
    isNotificationEditConfirmDialogOpen,
    setIsNotificationEditConfirmDialogOpen,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { dirtyFields, isValid, isDirty, errors },
    setValue,
    control,
    watch,
    getValues,
  } = useForm<INotificationCreateForm>({
    defaultValues: {
      file: null,
      message: "",
      title: "",
      type: null,
      user_type: "ALL",
    },
    values: {
      file: notificationData?.data.file,
      message: notificationData?.data.message,
      title: notificationData?.data.title,
      type: {
        id: notificationData?.data.type,
        label: NOTIFICATION_TYPE_DB[notificationData?.data.type],
      },
      user_type: notificationData?.data.user_type,
    },
  });

  const createNotification = useMutation(postNotificationNotification, {
    onSuccess: (res) => {
      const { id } = res?.data as { id: number };
      setIsNotificationCreateConfirmDialogOpen(false);
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

  const editNotification = useMutation(putNotificationNotificationById, {
    onSuccess: () => {
      setIsNotificationEditConfirmDialogOpen(false);
      queryClient.invalidateQueries([
        "notifications",
        "notifications-pagination",
        `notification-${notification}`,
      ]);
      toast("پیام با موفقیت تدوین شد.", {
        type: "info",
      });
      navigate(`../${notification}`);
    },
  });

  const onSubmit = () => {
    const values = getValues();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("message", values.message);
    formData.append("type", values.type?.id as string);
    formData.append("user_type", values.user_type as string);
    if (values.file && values.file[0]) formData.append("file", values.file[0]);

    createNotification.mutate({
      body: formData,
    });
  };

  const onSubmitEdit = () => {
    const values = getValues();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("message", values.message);
    formData.append("type", values.type?.id as string);
    formData.append("user_type", values.user_type as string);
    if (values.file && typeof values.file !== "string")
      formData.append("file", values.file[0]);

    editNotification.mutate({
      body: formData,
      id: notification,
    });
  };

  console.log(errors);

  return (
    <Fragment>
      <form
        className="flex flex-col gap-y-5 h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="نام دسته‌بندی را وارد کنید"
          label="نام دسته‌بندی"
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
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-light text-grey-500">نوع پیام</span>
          <Controller
            control={control}
            name="type"
            rules={{
              required: "این فیلد اجباری است.",
            }}
            render={({ field: { onChange, value } }) => (
              <RadioSelect
                variant="secondary"
                containerClassName="w-full"
                options={NOTIFICATION_TYPES}
                selected={{
                  id: value?.id || "",
                  label: value?.label || "یک گزینه را انتخاب کنید",
                }}
                setSelected={(option) => onChange(option)}
              />
            )}
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
                value={
                  value instanceof FileList
                    ? value?.[0]?.name || ""
                    : value || ""
                }
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
        <div className="flex items-start flex-col w-full">
          <label htmlFor="message" className="label label-text">
            <span className="text-grey-500 text-xs">دسته بندی کاربران</span>
          </label>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <input
                id="all"
                type="radio"
                value="ALL"
                className="radio radio-secondary h-5 w-5"
                {...register("user_type")}
              />
              <label htmlFor="all">همه</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                id="real"
                type="radio"
                value="REAL"
                className="radio radio-secondary h-5 w-5"
                {...register("user_type")}
              />
              <label htmlFor="real">حقیقی</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                id="juridical"
                type="radio"
                className="radio radio-secondary h-5 w-5"
                value="JURIDICAL"
                {...register("user_type")}
              />
              <label htmlFor="juridical">حقوقی</label>
            </div>
          </div>
        </div>
        <div className="mt-auto flex justify-end items-center gap-x-4">
          <Link to=".." className="btn btn-outline btn-secondary w-40">
            انصراف
          </Link>
          {notification ? (
            <button
              type="button"
              className="btn btn-secondary w-40 disabled:bg-grey-200"
              onClick={() => setIsNotificationEditConfirmDialogOpen(true)}
              disabled={!isValid}
            >
              تدوین پیام سیستم
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary w-40 disabled:bg-grey-200"
              onClick={() => setIsNotificationCreateConfirmDialogOpen(true)}
              disabled={!isValid || !isDirty}
            >
              ارسال پیام سیستم
            </button>
          )}
        </div>
        <NotificationCreateConfirmDialog
          isOpen={isNotificationCreateConfirmDialogOpen}
          closeModal={() => setIsNotificationCreateConfirmDialogOpen(false)}
          title={watch("title")}
          onConfirm={onSubmit}
          isLoading={createNotification.isLoading}
        />
        <NotificationEditConfirmDialog
          isOpen={isNotificationEditConfirmDialogOpen}
          closeModal={() => setIsNotificationEditConfirmDialogOpen(false)}
          title={watch("title")}
          onConfirm={onSubmitEdit}
          isLoading={editNotification.isLoading}
        />
      </form>
    </Fragment>
  );
}

export default NotificationCreate;
