import { Input } from "@/components/input";
import {
  MEASURE_TYPES,
  account,
  listOption,
  product,
  product_price,
} from "@/model";
import { Fragment, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { OrdersCreateAddAccountDialog } from "./partials/ordersCreateAddAccountDialog";
import { Close } from "@/assets/icons/Close";
import { AddUser, Bookmark, Delete } from "react-iconly";
import { Checkbox } from "@/components/checkbox";
import { CollapseWrapper } from "@/shared/collapseWrapper";
import { RadioSelect } from "@/components/radioSelect";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDebounce } from "usehooks-ts";
import { getProductProduct } from "@/api/product";
import { Plus } from "@/assets/icons/Plus";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { postOrderAdminCreateOrder } from "@/api/order";
import { toast } from "react-toastify";

interface IOrdersCreateForm {
  customer: account | null;
  need_tax: boolean;
  order_item: {
    product: listOption | null;
    product_price: listOption | null;
    quantity: string;
  }[];
}

function OrdersCreate() {
  const [isOrdersCreateAddAccountDialog, setIsOrdersCreateAddAccountDialog] =
    useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const { data: products } = useQuery(
    ["products-pagination", debouncedSearch],
    () =>
      getProductProduct({
        params: {
          search: debouncedSearch,
        },
      })
  );

  const createOrder = useMutation(postOrderAdminCreateOrder, {
    onSuccess: (res) => {
      const { order_id } = res?.data as { order_id: number };
      toast("سفارش ایجاد شد.", {
        type: "success",
      });
      queryClient.invalidateQueries();
      navigate(`../${order_id}`);
    },
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<IOrdersCreateForm>({
    defaultValues: {
      customer: null,
      need_tax: false,
      order_item: [],
    },
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "order_item",
  });

  const setUser = (value: account) => {
    setValue("customer", value);
  };

  const onSubmit = (values: IOrdersCreateForm) =>
    createOrder.mutate({
      body: {
        customer_id: values.customer?.id,
        need_tax: values.need_tax,
        order_item: values.order_item.map((item) => ({
          product: item.product?.id,
          product_price: item.product_price?.id,
          quantity: +item.quantity,
        })),
      },
    });

  return (
    <Fragment>
      <form
        className="flex flex-col gap-y-4 h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-x-2 items-end">
          <Controller
            control={control}
            name="customer"
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
                      onClick={() => setValue("customer", null)}
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
            onClick={() => setIsOrdersCreateAddAccountDialog(true)}
          >
            <AddUser />
          </button>
        </div>
        <CollapseWrapper
          title="افزودن محصول"
          className="flex flex-col overflow-y-visible"
        >
          <div className="overflow-x-auto pb-60">
            <table className="table table-auto text-start w-full border-separate border-spacing-2">
              <thead>
                <tr className="text-sm text-grey-800 font-semibold">
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg"
                    align="center"
                  >
                    #
                  </th>
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                    align="right"
                  >
                    محصول
                  </th>
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                    align="right"
                  >
                    وزن بسته محصول
                  </th>
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                    align="right"
                  >
                    تعداد
                  </th>
                </tr>
              </thead>
              <tbody>
                {fields.map((_item, index: number) => (
                  <tr key={index}>
                    <td className="rounded-lg border border-grey-200 p-0 text-center">
                      {index + 1}
                    </td>
                    <td className="rounded-lg border border-grey-200 w-1/3 min-w-[150px] p-0">
                      <Controller
                        control={control}
                        name={`order_item.${index}.product`}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { value, onChange } }) => (
                          <RadioSelect
                            searchComponent={
                              <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="جست‌وجوی محصول..."
                                containerClassName="py-2 px-5 sticky top-0 bg-white z-10"
                              />
                            }
                            bordered={false}
                            containerClassName="w-full rounded-lg"
                            variant="secondary"
                            options={products?.data.results.map(
                              (item: product) => ({
                                id: item.id,
                                label: item.name,
                                obj: item,
                              })
                            )}
                            selected={value}
                            setSelected={(val) => {
                              onChange(val);
                              setValue(
                                `order_item.${index}.product_price`,
                                null
                              );
                            }}
                          />
                        )}
                      />
                    </td>
                    <td className="rounded-lg border border-grey-200 min-w-[150px] p-0">
                      <Controller
                        control={control}
                        name={`order_item.${index}.product_price`}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { value, onChange } }) => (
                          <RadioSelect
                            bordered={false}
                            containerClassName="w-full rounded-lg"
                            variant="secondary"
                            options={(
                              watch(`order_item.${index}.product`)
                                ?.obj as product
                            )?.product_price.map((item: product_price) => ({
                              id: item.id,
                              label: `${item.weight} ${
                                MEASURE_TYPES[item.measure_type]
                              }`,
                            }))}
                            selected={value}
                            setSelected={(val) => onChange(val)}
                          />
                        )}
                      />
                    </td>
                    <td className="rounded-lg border border-grey-200 min-w-[200px] p-0">
                      <div className="flex items-center gap-x-4">
                        <Controller
                          control={control}
                          name={`order_item.${index}.quantity`}
                          rules={{
                            required: "این فیلد اجباری است.",
                          }}
                          render={({ field: { value, onChange } }) => (
                            <NumericFormat
                              customInput={Input}
                              type="text"
                              placeholder="مقدار"
                              iconEnd={
                                <span className="absolute end-0 inset-y-auto bg-grey-200 flex items-center px-2 rounded-e-lg h-full text-grey-600">
                                  <span>عدد</span>
                                </span>
                              }
                              className="input input-ghost w-full"
                              value={value}
                              onValueChange={({ value }) => onChange(value)}
                              thousandSeparator
                            />
                          )}
                        />
                        <button
                          type="button"
                          className="btn btn-error btn-square"
                          onClick={() => remove(index)}
                        >
                          <Delete />
                        </button>
                      </div>
                    </td>
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
                product: null,
                product_price: null,
                quantity: "",
              })
            }
          >
            <Plus />
            افزودن مورد دیگر
          </button>
        </CollapseWrapper>
        <div className="bg-white xl:bg-grey-50 shadow-ev3 xl:shadow-none p-5 rounded-custom flex flex-col gap-y-5 mb-6 xl:mb-0">
          <h5 className="text-base font-semibold flex items-center gap-x-2">
            <span className="bg-grey-50 xl:bg-secondary p-1.5 rounded-lg text-grey-600 xl:text-white">
              <Bookmark size="small" />
            </span>
            فاکتور رسمی
          </h5>
          <p>
            با درخواست فاکتور رسمی ۹ درصد مالیات ارزش بر افزوده به هزینه‌های
            پرداختی کاربر اضافه می‌شود.
          </p>
          <Checkbox
            label="درخواست فاکتور رسمی دارم"
            containerClassName="w-fit"
            className="checkbox-sm checkbox-error"
            {...register("need_tax")}
          />
        </div>
        <div className="mt-auto flex justify-end items-center gap-x-4 pb-4">
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
            ایجاد سفارش جدید
          </button>
        </div>
      </form>
      <OrdersCreateAddAccountDialog
        isOpen={isOrdersCreateAddAccountDialog}
        closeModal={() => setIsOrdersCreateAddAccountDialog(false)}
        setUser={setUser}
      />
    </Fragment>
  );
}

export default OrdersCreate;
