import { postCartCartItem } from "@/api/cart";
import { MEASURE_TYPES, cart_item } from "@/model";
import { useState } from "react";
import { Delete } from "react-iconly";
import { Plus } from "@/assets/icons/Plus";
import { useMutation, useQueryClient } from "react-query";
import clsx from "clsx";
import { Minus } from "@/assets/icons/Minus";

function CheckoutItem({ category_name, product_price, quantity }: cart_item) {
  const [optimisticQuantity, setOptimisticQuantity] = useState(quantity);
  const queryClient = useQueryClient();

  const createCartItem = useMutation(postCartCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleIncrementCartItem = () =>
    createCartItem.mutate({
      body: {
        product_price: product_price.id,
        quantity: 1,
      },
    });

  const handleDecrementCartItem = () =>
    createCartItem.mutate({
      body: {
        product_price: product_price.id,
        quantity: -1,
      },
    });

  return (
    <div className="flex w-full gap-x-0 gap-y-4 sm:gap-x-4 first-of-type:pt-0 pt-4 flex-wrap sm:flex-nowrap">
      <img
        src={product_price.product.image}
        width={60}
        height={60}
        className="basis-2/12"
        alt="product thumbnail"
      />
      <div className="w-auto basis-10/12 sm:w-full flex flex-col justify-between">
        <span className="text-sm font-bold">{product_price.product.name}</span>
        <span className="flex items-center justify-between w-full sm:w-1/2 flex-row-reverse sm:flex-row">
          <span className="badge badge-accent text-xs">{category_name}</span>
          <strong className="text-sm">
            {product_price?.weight}{" "}
            <span className="text-xs text-grey-500 font-light">
              {MEASURE_TYPES[product_price?.measure_type]}
            </span>
          </strong>
        </span>
      </div>
      <div className="flex flex-row-reverse sm:flex-col items-center sm:items-end gap-y-2 justify-between basis-full">
        <strong className="text-sm">
          <span
            className={clsx(
              product_price?.discount_price && "text-danger line-through"
            )}
          >
            {product_price?.price.toLocaleString()}{" "}
          </span>{" "}
          {product_price?.discount_price !== 0
            ? product_price?.discount_price?.toLocaleString()
            : ""}{" "}
          <span className="text-xs font-light text-grey-500">تومان</span>
        </strong>
        <div className="flex border border-grey-200 rounded-[10px] w-36 gap-y-3 items-center justify-between h-full">
          <button
            className="btn btn-ghost btn-square"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleIncrementCartItem();
              setOptimisticQuantity((prevState) => prevState + 1);
            }}
            disabled={createCartItem.isLoading}
          >
            <Plus />
          </button>
          {createCartItem.isLoading ? (
            <span className="loading loading-spinner loading-md inline-block h-7 text-primary"></span>
          ) : (
            <span className="text-lg font-bold">{optimisticQuantity}</span>
          )}

          <button
            className={clsx(
              "btn btn-ghost btn-square",
              optimisticQuantity === 1 && "text-danger"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDecrementCartItem();
              setOptimisticQuantity((prevState) => prevState - 1);
            }}
            disabled={createCartItem.isLoading}
          >
            {optimisticQuantity === 1 ? <Delete /> : <Minus />}
          </button>
        </div>
      </div>
    </div>
  );
}

export { CheckoutItem };
