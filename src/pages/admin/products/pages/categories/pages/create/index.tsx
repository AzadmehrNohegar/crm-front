import {
  getProductCategory,
  getProductCategoryById,
  postProductCategory,
  putProductCategoryById,
} from "@/api/product";
import { Close } from "@/assets/icons/Close";
import { Plus } from "@/assets/icons/Plus";
import { Input } from "@/components/input";
import { RadioSelect } from "@/components/radioSelect";
import { IS_ACTIVE, category, listOption } from "@/model";
import { CollapseWrapper } from "@/shared/collapseWrapper";
import { Controller, useForm } from "react-hook-form";
import { Delete, Edit } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface IProductsCategoriesCreateForm {
  name: string;
  is_active: string;
  image: FileList | string | null;
  parent_category: listOption | null;
}

const IS_ACTIVE_OPTIONS: listOption[] = [
  {
    id: "true",
    label: "فعال",
  },
  {
    id: "false",
    label: "غیرفعال",
  },
];

function ProductsCategoriesCreate() {
  const queryClient = useQueryClient();

  const { category } = useParams();

  const { data: categories, isLoading } = useQuery(
    "product-categories-all",
    () =>
      getProductCategory({
        params: {
          page_size: 20,
        },
      })
  );

  const { data: categoryData } = useQuery(
    `product-category-${category}`,
    () => getProductCategoryById({ id: category }),
    {
      enabled: !!category,
    }
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { dirtyFields, isValid, isDirty, errors },
    setValue,
    control,
  } = useForm<IProductsCategoriesCreateForm>({
    defaultValues: {
      image: null,
      is_active: "false",
      name: "",
      parent_category: null,
    },
    values: {
      image: categoryData?.data.image,
      is_active: `${categoryData?.data.is_active}`,
      name: categoryData?.data.name,
      parent_category: {
        id: categoryData?.data.parent_category?.id || "",
        label: categoryData?.data.parent_category?.name || "بدون سرگروه",
      },
    },
  });

  const createCategory = useMutation(postProductCategory, {
    onSuccess: () => {
      toast("دسته‌بندی با موفقیت ایجاد شد.", {
        type: "success",
      });
      queryClient.invalidateQueries([
        "product-categories",
        "product-categories-all",
      ]);
    },
  });

  const editCategory = useMutation(putProductCategoryById, {
    onSuccess: () => {
      toast("دسته‌بندی با موفقیت تغییر یافت.", {
        type: "info",
      });
      queryClient.invalidateQueries([
        "product-categories",
        "product-categories-all",
      ]);
    },
  });

  const onSubmit = (values: IProductsCategoriesCreateForm) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("is_active", values.is_active);

    if (!values.image) {
      toast("لطفا برای محصول عکس انتخاب کنید.", {
        type: "error",
      });
      return;
    }

    if (values.image instanceof FileList && values.image![0])
      formData.append("image", values.image![0]);
    if (typeof values.image === "string") formData.append("image", "");

    if (values.parent_category)
      formData.append("parent_category", values.parent_category?.id.toString());
    if (category) {
      editCategory.mutate({
        id: category,
        body: formData,
      });
    } else {
      createCategory.mutate({
        body: formData,
      });
    }
  };

  const parseImageType = () => {
    const image = watch("image");
    if (image instanceof FileList && image[0])
      return URL.createObjectURL(image[0]);
    if (typeof image === "string") return image;

    return "/images/image-empty.png";
  };

  if (isLoading) return <Skeleton height={574} />;

  return (
    <form className="h-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <CollapseWrapper
        title="جزئیات دسته‌بندی"
        className="flex flex-col gap-y-5"
      >
        <div className="flex items-start flex-col">
          <label htmlFor="image" className="label label-text">
            <span className="text-grey-500 text-xs">تصویر دسته‌بندی</span>
          </label>
          <div className="flex items-stretch p-2 w-fit border border-grey-200 rounded-xl px-4 py-5 gap-x-4">
            <div className="w-20 h-20 bg-grey-50 rounded-lg flex items-center justify-center">
              <img
                width={56}
                height={56}
                className="object-contain"
                src={parseImageType()}
              />
            </div>
            <input
              id="image"
              className="hidden"
              type="file"
              {...register("image")}
            />
            {(watch("image")?.valueOf() instanceof FileList &&
              watch("image")![0]) ||
            typeof watch("image") === "string" ? (
              <div className="h-auto flex flex-col justify-between">
                <button
                  className="btn btn-error btn-sm btn-square"
                  onClick={() => setValue("image", null)}
                >
                  <Delete size="small" />
                </button>
                <label
                  className="btn btn-secondary btn-sm btn-square"
                  htmlFor="image"
                >
                  <Edit size="small" />
                </label>
              </div>
            ) : (
              <label
                className="btn btn-success btn-sm btn-square mt-auto"
                htmlFor="image"
              >
                <Plus className="scale-75" />
              </label>
            )}
          </div>
        </div>

        <Input
          type="text"
          placeholder="نام دسته‌بندی را وارد کنید"
          label="نام دسته‌بندی"
          className="input input-bordered w-full"
          error={errors.name}
          iconEnd={
            dirtyFields.name ? (
              <button
                type="button"
                className="absolute end-4 inset-y-auto text-grey-600"
                onClick={() => setValue("name", "")}
              >
                <Close />
              </button>
            ) : null
          }
          {...register("name", {
            required: "این فیلد اجباری است.",
          })}
        />
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-light text-grey-500">وضعیت</span>
          <Controller
            control={control}
            name="is_active"
            render={({ field: { onChange, value } }) => (
              <RadioSelect
                variant="secondary"
                containerClassName="w-full"
                options={IS_ACTIVE_OPTIONS}
                selected={{
                  id: value,
                  label: IS_ACTIVE[value],
                }}
                setSelected={(option) => onChange(option!.id)}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-light text-grey-500">سرگروه</span>
          <Controller
            control={control}
            name="parent_category"
            render={({ field: { onChange, value } }) => (
              <RadioSelect
                variant="secondary"
                containerClassName="w-full"
                options={[
                  {
                    id: "",
                    label: "بدون سرگروه",
                  },
                ].concat(
                  categories?.data.results.map((item: category) => ({
                    id: item?.id,
                    label: item?.name,
                  }))
                )}
                selected={{
                  id: value?.id || "",
                  label: value?.label || "بدون سرگروه",
                }}
                setSelected={(option) => onChange(option)}
              />
            )}
          />
        </div>
      </CollapseWrapper>
      <div className="mt-auto flex justify-end items-center gap-x-4">
        <Link
          to=".."
          type="button"
          className="btn btn-outline btn-secondary w-40"
        >
          انصراف
        </Link>
        <button
          className="btn btn-secondary w-40 disabled:bg-grey-200"
          disabled={!isValid || !isDirty}
        >
          افزودن دسته‌بندی
        </button>
      </div>
    </form>
  );
}

export default ProductsCategoriesCreate;
