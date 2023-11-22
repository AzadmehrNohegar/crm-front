import { getProductWarehouse } from "@/api/product";
import { Plus } from "@/assets/icons/Plus";
import { Input } from "@/components/input";
import { RadioSelect } from "@/components/radioSelect";
import { IProductsManagementCreateForm, warehouse } from "@/model";
import { CollapseWrapper } from "@/shared/collapseWrapper";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Delete } from "react-iconly";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";

interface IPackingWarehouseProps {
  control: Control<IProductsManagementCreateForm>;
}

function PackingWarehouse({ control }: IPackingWarehouseProps) {
  const {
    fields: inventoryFields,
    append: inventoryAppend,
    remove: inventoryRemove,
  } = useFieldArray({
    control,
    name: "inventory",
  });

  const { data: warehouse } = useQuery("product-warehouse", () =>
    getProductWarehouse()
  );

  return (
    <CollapseWrapper title="موجودی انبار" className="flex flex-col">
      <div className="overflow-x-auto pb-24">
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
            {inventoryFields.map((_item, index: number) => (
              <tr key={index}>
                <td className="rounded-lg border border-grey-200 text-center p-0">
                  {index + 1}
                </td>
                <td className="rounded-lg border border-grey-200 p-0">
                  <Controller
                    control={control}
                    name={`inventory.${index}.warehouse`}
                    render={({ field: { value, onChange } }) => (
                      <RadioSelect
                        bordered={false}
                        containerClassName="w-full"
                        variant="secondary"
                        options={warehouse?.data.results.map(
                          (item: warehouse) => ({
                            id: item.id,
                            label: item.name,
                          })
                        )}
                        selected={value}
                        setSelected={(val) => onChange(val)}
                      />
                    )}
                  />
                </td>
                <td className="rounded-lg border border-grey-200 w-full p-0">
                  <div className="flex items-center gap-x-2">
                    <Controller
                      control={control}
                      name={`inventory.${index}.stock`}
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
                      onClick={() => inventoryRemove(index)}
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
          inventoryAppend({
            stock: "",
            warehouse: null,
          })
        }
      >
        <Plus />
        افزودن مورد دیگر
      </button>
    </CollapseWrapper>
  );
}

export { PackingWarehouse };
