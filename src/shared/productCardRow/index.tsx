import { Fragment, useMemo, useState } from "react";
import { Delete } from "react-iconly";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { MEASURE_TYPES, listOption, product } from "@/model";
import { useMutation, useQueryClient } from "react-query";
import { postCartCartItem } from "@/api/cart";
import { Transition } from "@headlessui/react";
import { RadioSelect } from "@/components/radioSelect";
import { Plus } from "@/assets/icons/Plus";
import { Minus } from "@/assets/icons/Minus";
import { Close } from "@/assets/icons/Close";

interface IProductCardRowProps extends product {
  api_origin: string;
  containerClassName?: string;
}

function ProductCardRow({
  category,
  image,
  name,
  id,
  product_price,
  containerClassName,
}: IProductCardRowProps) {
  const queryClient = useQueryClient();

  const [isSelectStateOpen, setIsSelectStateOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<listOption | null>(null);

  const createCartItem = useMutation(postCartCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const cumulativeQuantity = useMemo(() => {
    return product_price?.reduce((prev, curr) => prev + curr.quantity, 0) || 0;
  }, [product_price]);

  const serverSelectedPrice = useMemo(() => {
    return product_price?.filter((item) => item.quantity > 0)[0];
  }, [product_price]);

  const handleIncrementCartItem = () =>
    createCartItem.mutate({
      body: {
        product_price: serverSelectedPrice?.id || product_price?.[0]!.id,
        quantity: 1,
      },
    });

  const handleDecrementCartItem = () =>
    createCartItem.mutate({
      body: {
        product_price: serverSelectedPrice?.id || product_price?.[0]!.id,
        quantity: -1,
      },
    });

  const handleIncrementSelectedPrice = () =>
    createCartItem
      .mutateAsync({
        body: {
          product_price: selectedPrice?.id,
          quantity: 1,
        },
      })
      .then(() => {
        setIsSelectStateOpen(false);
      });

  return (
    <div className={clsx("relative w-full min-w-[250px] ", containerClassName)}>
      <Link
        to={`/products/${id}`}
        className="shadow-ev2 w-full h-full rounded-custom py-5 px-4 flex flex-col gap-y-5 bg-white"
      >
        <div className="flex items-center gap-x-4">
          <img
            src={image}
            width={58}
            height={58}
            className="rounded-custom"
            alt="product thumbnail"
          />
          <div className="flex flex-col items-start w-full gap-y-2">
            <span className="text-sm text-grey-600 max-w-[220px] w-full truncate overflow-x-hidden">
              {name}{" "}
            </span>
            <span className="flex items-center justify-between w-full">
              <strong className="text-sm">
                {serverSelectedPrice ? (
                  <Fragment>
                    {serverSelectedPrice.weight}{" "}
                    <span className="text-xs font-light text-grey-500">
                      {MEASURE_TYPES[serverSelectedPrice.measure_type]}
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    {product_price?.[0].weight}{" "}
                    <span className="text-xs font-light text-grey-500">
                      {MEASURE_TYPES[product_price?.[0].measure_type]}
                    </span>
                  </Fragment>
                )}
              </strong>
              <span className="badge badge-accent text-xs">
                {category?.name}
              </span>
            </span>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          {cumulativeQuantity === 0 ? (
            <div className="border border-transparent mb-auto">
              {!isSelectStateOpen ? (
                <button
                  className="btn btn-primary btn-square"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (product_price.length > 1) {
                      setIsSelectStateOpen(true);
                    } else {
                      handleIncrementCartItem();
                    }
                  }}
                  disabled={
                    (serverSelectedPrice
                      ? serverSelectedPrice.inventory === cumulativeQuantity
                      : product_price?.[0].inventory === cumulativeQuantity) ||
                    createCartItem.isLoading
                  }
                >
                  <Plus />
                  {(
                    serverSelectedPrice
                      ? serverSelectedPrice.inventory === cumulativeQuantity
                      : product_price?.[0].inventory === cumulativeQuantity
                  ) ? (
                    <span>ناموجود</span>
                  ) : null}
                </button>
              ) : (
                <span className="inline-block w-12 h-12"></span>
              )}
            </div>
          ) : (
            <div className="flex border border-grey-200 rounded-[10px] gap-y-3 items-center justify-between h-full w-36">
              <button
                className="btn btn-ghost btn-square"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleIncrementCartItem();
                }}
                disabled={
                  createCartItem.isLoading ||
                  (serverSelectedPrice
                    ? serverSelectedPrice.inventory === cumulativeQuantity
                    : product_price?.[0].inventory === cumulativeQuantity)
                }
              >
                <Plus />
              </button>
              {createCartItem.isLoading ? (
                <span className="loading loading-spinner loading-md inline-block h-7 text-primary"></span>
              ) : (
                <span className="text-lg font-bold">{cumulativeQuantity}</span>
              )}

              <button
                className={clsx(
                  "btn btn-ghost btn-square",
                  cumulativeQuantity === 0 && "text-danger"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDecrementCartItem();
                }}
                disabled={createCartItem.isLoading}
              >
                {cumulativeQuantity === 1 ? <Delete /> : <Minus />}
              </button>
            </div>
          )}{" "}
          <strong className="text-sm inline-flex items-center gap-x-1">
            <span
              className={clsx(
                (serverSelectedPrice?.discount_price ||
                  product_price?.[0].discount_price) &&
                  "text-danger relative before:absolute before:w-full before:h-px before:bg-danger before:inset-y-1/2 before:-rotate-[15deg]"
              )}
            >
              {serverSelectedPrice
                ? serverSelectedPrice.price.toLocaleString()
                : product_price?.[0].price.toLocaleString()}{" "}
            </span>
            {serverSelectedPrice
              ? serverSelectedPrice.discount_price?.toLocaleString() || ""
              : product_price?.[0].discount_price?.toLocaleString() === "0"
              ? ""
              : product_price?.[0].discount_price?.toLocaleString()}{" "}
            <span className="text-xs font-light text-grey-500">تومان</span>
          </strong>
        </div>
      </Link>
      <Transition
        show={isSelectStateOpen}
        as="div"
        className="absolute w-full h-full flex flex-col bg-white bg-opacity-75 inset-0 rounded-custom p-4"
      >
        <div className="flex justify-end">
          <button
            className="btn btn-link text-grey-800 px-0 decoration-transparent"
            onClick={() => setIsSelectStateOpen(false)}
          >
            <Close />
            بستن
          </button>
        </div>
        <RadioSelect
          options={product_price?.map((item) => ({
            id: item.id,
            label: `${item.weight} ${MEASURE_TYPES[item.measure_type]}`,
          }))}
          selected={selectedPrice}
          setSelected={(option) => setSelectedPrice(option)}
        />
        <button
          className="btn btn-block btn-primary mt-auto"
          onClick={handleIncrementSelectedPrice}
          disabled={!selectedPrice}
        >
          <Plus />
          افزودن به سبد خرید
        </button>
      </Transition>
    </div>
  );
}

export { ProductCardRow };
