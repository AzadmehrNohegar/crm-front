import { Plus } from "@/assets/icons/Plus";
import { Input } from "@/components/input";
import { IProductsManagementCreateForm } from "@/model";
import { CollapseWrapper } from "@/shared/collapseWrapper";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Delete } from "react-iconly";
import { NumericFormat } from "react-number-format";

interface IWholeSaleProductPriceProps {
  control: Control<IProductsManagementCreateForm>;
}

function WholeSaleProductPrice({ control }: IWholeSaleProductPriceProps) {
  const {
    fields: productPriceFields,
    append: productPriceAppend,
    remove: productPriceRemove,
  } = useFieldArray({
    control,
    name: "product_price",
  });

  return (
    <CollapseWrapper title="جزئیات قیمت محصول" className="flex flex-col">
      <div className="overflow-x-auto pb-24">
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
                وزن بسته محصول
              </th>
              <th
                className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                align="right"
              >
                قیمت محصول
              </th>
              <th
                className="text-grey-800 bg-secondary-50 rounded-lg w-1/3"
                align="right"
              >
                قیمت با تخفیف محصول
              </th>
            </tr>
          </thead>
          <tbody>
            {productPriceFields.map((_item, index: number) => (
              <tr key={index}>
                <td className="rounded-lg border border-grey-200 p-0 text-center">
                  {index + 1}
                </td>
                <td className="rounded-lg border border-grey-200 p-0 w-1/3">
                  <Controller
                    control={control}
                    name={`product_price.${index}.weight`}
                    rules={{
                      required: "این فیلد اجباری است.",
                    }}
                    render={({ field: { value, onChange } }) => (
                      <NumericFormat
                        customInput={Input}
                        type="text"
                        placeholder="وزن بسته محصول"
                        className="input input-ghost w-full"
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
                <td className="rounded-lg border border-grey-200 p-0 w-1/3">
                  <Controller
                    control={control}
                    name={`product_price.${index}.price`}
                    rules={{
                      required: "این فیلد اجباری است.",
                    }}
                    render={({ field: { value, onChange } }) => (
                      <NumericFormat
                        customInput={Input}
                        type="text"
                        placeholder="قیمت محصول"
                        className="input input-ghost w-full"
                        iconEnd={
                          <span className="absolute end-0 inset-y-auto bg-grey-200 flex items-center px-2 rounded-e-lg h-full text-grey-600">
                            <span>تومان</span>
                          </span>
                        }
                        value={value}
                        onValueChange={({ value }) => onChange(value)}
                        thousandSeparator
                      />
                    )}
                  />
                </td>
                <td className="rounded-lg border border-grey-200 p-0 w-1/3">
                  <div className="flex items-center gap-x-2">
                    <Controller
                      control={control}
                      name={`product_price.${index}.discount_price`}
                      render={({ field: { value, onChange } }) => (
                        <NumericFormat
                          customInput={Input}
                          type="text"
                          placeholder="قیمت با تخفیف محصول"
                          className="input input-ghost w-full"
                          iconEnd={
                            <span className="absolute end-0 inset-y-auto bg-grey-200 flex items-center px-2 rounded-e-lg h-full text-grey-600">
                              <span>تومان</span>
                            </span>
                          }
                          value={value}
                          onValueChange={({ value }) => onChange(value)}
                          thousandSeparator
                        />
                      )}
                    />
                    <button
                      type="button"
                      className="btn btn-error btn-square"
                      onClick={() => productPriceRemove(index)}
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
          productPriceAppend({
            weight: "",
            discount_price: "",
            price: "",
          })
        }
      >
        <Plus />
        افزودن مورد دیگر
      </button>
    </CollapseWrapper>
  );
}

export { WholeSaleProductPrice };
