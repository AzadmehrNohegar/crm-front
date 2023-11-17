import { getProductBrand, getProductCategory } from "@/api/product";
import { Close } from "@/assets/icons/Close";
import { Plus } from "@/assets/icons/Plus";
import { Input } from "@/components/input";
import { RadioSelect } from "@/components/radioSelect";
import { PRODUCT_TYPE, brand, category, listOption } from "@/model";
import { CollapseWrapper } from "@/shared/collapseWrapper";
// import { Fragment } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Delete, Edit } from "react-iconly";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

interface IProductsManagementCreateForm {
  name: string;
  description: string;
  image: FileList | string | null;
  category: listOption | null;
  brand: listOption | null;
  inventory:
    | [
        {
          warehouse: number;
          quantity: number;
        }
      ]
    | null;
}

function ProductsManagementCreate() {
  const [searchParams] = useSearchParams();

  const {
    control,
    watch,
    register,
    // handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<IProductsManagementCreateForm>({
    defaultValues: {
      brand: null,
      category: null,
      description: "",
      name: "",
      image: null,
      inventory: null,
    },
  });

  const {
    fields: inventoryFields,
    append,
    // remove,
  } = useFieldArray({
    control,
    name: "inventory",
  });

  const parseImageType = () => {
    const image = watch("image");
    if (image instanceof FileList && image[0])
      return URL.createObjectURL(image[0]);
    if (typeof image === "string") return image;

    return "/images/image-empty.png";
  };

  const { data: categories } = useQuery("product-categories", () =>
    getProductCategory({
      params: {
        page_size: 20,
      },
    })
  );

  const { data: brands } = useQuery("product-brands", () =>
    getProductBrand({
      params: {
        page_size: 20,
      },
    })
  );

  return (
    <form className="flex flex-col gap-y-4">
      <h1 className="flex items-center justify-between">
        <span>نوع محصول</span>
        <span className="badge badge-accent">
          {PRODUCT_TYPE[searchParams.get("type") || ""]}
        </span>
      </h1>
      <CollapseWrapper title="جزئیات محصول" className="flex flex-col gap-y-5">
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
          placeholder="نام محصول را وارد کنید."
          label="نام محصول"
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
        <div className="flex items-start flex-col w-full">
          <label htmlFor="message" className="label label-text">
            <span className="text-grey-500 text-xs">توضیحات</span>
          </label>
          <textarea
            id="message"
            rows={12}
            cols={12}
            placeholder="توضیحات را وارد کنید."
            className=" textarea textarea-bordered w-full resize-none h-36"
            {...register("description", {
              required: "این فیلد اجباری است.",
            })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-light text-grey-500">دسته‌بندی</span>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <RadioSelect
                variant="secondary"
                containerClassName="w-full"
                options={categories?.data.results.map((item: category) => ({
                  id: item.id,
                  label: item.name,
                }))}
                selected={value}
                setSelected={(option) => onChange(option!)}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-light text-grey-500">برند</span>
          <Controller
            control={control}
            name="brand"
            render={({ field: { onChange, value } }) => (
              <RadioSelect
                variant="secondary"
                containerClassName="w-full"
                options={brands?.data.results.map((item: brand) => ({
                  id: item.id,
                  label: item.name,
                }))}
                selected={value}
                setSelected={(option) => onChange(option!)}
              />
            )}
          />
        </div>
      </CollapseWrapper>
      <CollapseWrapper title="موجودی انبار" className="flex flex-col">
        <div className="overflow-x-auto">
          <table className="table table-auto text-start w-full border-separate border-spacing-2">
            <thead>
              <tr className="text-sm text-grey-800 font-semibold">
                <th
                  className="text-grey-800 bg-secondary-50 rounded-lg"
                  align="right"
                >
                  #
                </th>
                <th
                  className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                  align="right"
                >
                  انبار
                </th>
                <th
                  className="text-grey-800 bg-secondary-50 rounded-lg w-full"
                  align="right"
                >
                  موجودی کل در انبار
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryFields.map((item, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  {/* <td>
                    <Controller
                      render={({ field: { onChange, ...rest } }) => (
                        <RadioSelect
                          className="max-w-[100px]"
                          type="number"
                          onChange={(e) => onChange(+e.target.value || 0)}
                          {...rest}
                        />
                      )}
                      name={`inventory.${index}.warehouse`}
                      control={control}
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="btn btn-ghost text-success btn-link decoration-transparent ms-auto"
          onClick={() =>
            append({
              quantity: 0,
              warehouse: 1,
            })
          }
        >
          <Plus />
          افزودن مورد دیگر
        </button>
      </CollapseWrapper>
    </form>
  );
}

export default ProductsManagementCreate;
