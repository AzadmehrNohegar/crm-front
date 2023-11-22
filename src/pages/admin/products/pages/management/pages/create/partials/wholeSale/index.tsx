import {
  postProductCreateWholeSale,
  putProductProductById,
} from "@/api/product";
import { IProductsManagementCreateForm, PRODUCT_TYPE } from "@/model";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { WholeSaleProductDetails } from "./partials/productDetails";
import { WholeSaleWarehouse } from "./partials/warehouse";
import { WholeSaleProductPrice } from "./partials/productPrice";

function ProductsManagementCreateWholeSale() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const { control, watch, register, handleSubmit, setValue, formState } =
    useForm<IProductsManagementCreateForm>({
      defaultValues: {
        is_suggested: false,
        brand: null,
        category: null,
        description: "",
        name: "",
        image: null,
        inventory: [],
        product_price: [],
      },
    });

  const updateProduct = useMutation(putProductProductById, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const createWholeSale = useMutation(postProductCreateWholeSale, {
    onSuccess: () => {
      toast("محصول با موفقیت ایجاد شد.", {
        type: "success",
      });

      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (values: IProductsManagementCreateForm) =>
    createWholeSale
      .mutateAsync({
        body: {
          name: values.name,
          description: values.description,
          type: "WHOLESALE",
          category: values.category!.id,
          brand: values.brand!.id,
          is_suggested: values.is_suggested,
          product_wholesale_warehouse: values.inventory.map((item) => ({
            warehouse: item.warehouse!.id,
            stock: item.stock,
          })),
          product_price: values.product_price.map((item) => ({
            weight: item.weight,

            measure_type: "KILOGRAM",
            price: item.price,
            discount_price: item.discount_price || 0,

            tax: searchParams.get("has_tax") ? 0.09 : 0,
          })),
        },
      })
      .then((res) => {
        const { id } = res?.data as { id: number };
        if (id && values.image instanceof FileList && values.image![0]) {
          const formData = new FormData();
          formData.append("image", values.image![0]);
          formData.append("name", values.name);
          formData.append("description", values.description);
          formData.append("category", `${values.category!.id}`);
          formData.append("brand", `${values.brand!.id}`);
          formData.append("is_suggested", `${values.is_suggested}`);

          updateProduct.mutate({
            id: id.toString(),
            body: formData,
          });
        }
      });

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="flex items-center justify-between">
        <span>نوع محصول</span>
        <span className="badge badge-accent">
          {PRODUCT_TYPE[searchParams.get("type") || ""]}
        </span>
      </h1>
      <WholeSaleProductDetails
        control={control}
        formState={formState}
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <WholeSaleWarehouse control={control} />
      <WholeSaleProductPrice control={control} />
      <div className="mt-auto flex justify-end items-center gap-x-4">
        <Link to=".." className="btn btn-outline btn-secondary w-40">
          انصراف
        </Link>

        <button
          className="btn btn-secondary w-40 disabled:bg-grey-200"
          disabled={!formState.isValid || !formState.isDirty}
        >
          افزودن محصول
        </button>
      </div>
    </form>
  );
}

export { ProductsManagementCreateWholeSale };
