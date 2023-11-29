import { postInventoryAdminCreateInventory } from "@/api/inventory";
import { getOrderOrderListById } from "@/api/order";
import { getProductWarehouse } from "@/api/product";
import { Input } from "@/components/input";
import { MEASURE_TYPES, order_item, product, warehouse } from "@/model";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { NumericFormat } from "react-number-format";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface IOrderSupplyForm {
  inventory_items: {
    order_item: number;
    count: string;
    warehouse: number;
  }[];
}

function OrdersSupply() {
  const { order_id } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: orderDetails, isLoading } = useQuery(`order-${order_id}`, () =>
    getOrderOrderListById({
      id: order_id,
    })
  );

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IOrderSupplyForm>({
    defaultValues: {
      inventory_items: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "inventory_items",
  });

  const { data: warehouse } = useQuery(
    "product-warehouse",
    () => getProductWarehouse(),
    {
      enabled: !!orderDetails,
      onSuccess: (res) => {
        setValue("inventory_items", []);
        orderDetails?.data.order_item.forEach((orderItem: order_item) =>
          res?.data.results.forEach((item: warehouse) =>
            append({
              count: "",
              order_item: orderItem.id,
              warehouse: item.id,
            })
          )
        );
      },
    }
  );

  const createInventory = useMutation(postInventoryAdminCreateInventory, {
    onSuccess: () => {
      toast("تامین کالا با موفقیت انجام شد.", {
        type: "success",
      });
      queryClient.invalidateQueries();
      navigate(`../${order_id}`);
    },
  });

  const onSubmit = (values: IOrderSupplyForm) =>
    createInventory.mutate({
      body: {
        order: +order_id!,
        inventory_items: values.inventory_items
          .filter((el) => +el.count > 0)
          .map((entry) => ({
            count: +entry.count,
            order_item: entry.order_item,
            warehouse: entry.warehouse,
          })),
      },
    });

  if (isLoading) return <Skeleton height={768} />;

  return (
    <form
      className="flex flex-col gap-y-4 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>سبد خرید کاربر</h1>
      <div className="overflow-x-auto">
        <table className="table table-auto text-start">
          <thead>
            <tr>
              <th align="right" className="w-1/3">
                مشخصات محصول
              </th>
              {warehouse?.data.results.map((item: warehouse) => (
                <th align="right" key={item.id}>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderDetails?.data.order_item.map((item: order_item) => (
              <tr key={item.id}>
                <td className="w-1/3">
                  <div className="flex gap-x-4">
                    <img
                      src={(item.product as product).image}
                      width={60}
                      height={60}
                      alt="product thumbnail"
                    />
                    <div className="w-full flex flex-col justify-between">
                      <span className="text-sm font-bold">
                        {(item.product as product).name}
                      </span>
                      <span className="flex w-1/2 items-center justify-between">
                        <span className="badge badge-accent text-xs">
                          {(item.product as product).category.name}
                        </span>
                        <strong className="text-sm">
                          {item.product_price.weight || ""}{" "}
                          <span className="text-xs text-grey-500 font-light">
                            {MEASURE_TYPES[item.product_price.measure_type]}
                          </span>
                        </strong>
                      </span>
                    </div>
                    <strong className="inline-block min-w-max mt-auto">
                      {item.quantity} <span className="font-light">عدد</span>
                    </strong>
                  </div>
                </td>
                {fields
                  .filter((entry) => entry.order_item === item.id)
                  .map((_el) => (
                    <td align="right" key={_el.id}>
                      <Controller
                        control={control}
                        name={`inventory_items.${fields.findIndex(
                          (el) => _el.id === el.id
                        )}.count`}
                        render={({ field: { value, onChange } }) => (
                          <NumericFormat
                            customInput={Input}
                            type="text"
                            placeholder="تعداد"
                            className="input input-bordered w-full"
                            iconEnd={
                              <span className="absolute end-0 inset-y-auto bg-grey-200 flex items-center px-2 rounded-e-lg h-full text-grey-600">
                                <span>کیلوگرم</span>
                              </span>
                            }
                            value={value}
                            onValueChange={({ value }) => onChange(value)}
                            thousandSeparator
                          />
                        )}
                      />
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          disabled={!isDirty}
        >
          تامین کالا
        </button>
      </div>
    </form>
  );
}

export default OrdersSupply;
