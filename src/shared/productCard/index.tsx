import { Close, Minus, Plus } from "@/assets/icons";
import { useMemo, useState } from "react";
import { Delete } from "react-iconly";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { MEASURE_TYPES, listOption, product } from "@/model";
import { useMutation, useQueryClient } from "react-query";
import { postCartCartItem } from "@/api/cart";
import { Transition } from "@headlessui/react";
import { RadioSelect } from "@/components/radioSelect";

interface IProductCardProps extends product {
  api_origin: string;
  containerClassName?: string;
}

function ProductCard({
  category,
  image,
  name,
  id,
  product_price,
  containerClassName,
}: IProductCardProps) {
  const queryClient = useQueryClient();

  const [isSelectStateOpen, setIsSelectStateOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<listOption | null>(null);

  const createCartItem = useMutation(postCartCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const [optimisticQuantity, setOptimisticQuantity] = useState(
    product_price?.reduce((prev, curr) => prev + curr.quantity, 0) || 0
  );

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
        setOptimisticQuantity((prevState) => prevState + 1);
        setIsSelectStateOpen(false);
      });

  return (
    <div
      className={clsx(
        "relative w-fit min-w-[250px] min-h-[281px]",
        containerClassName
      )}
    >
      <Link
        to={`/products/${id}`}
        className="shadow-ev2 w-full h-full rounded-custom py-5 px-4 flex flex-col gap-y-5 bg-white"
      >
        <div className="flex items-center gap-x-4 justify-between">
          <img
            src={image}
            width={154}
            height={154}
            className="rounded-custom"
            alt="product thumbnail"
          />
          {optimisticQuantity === 0 ? (
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
                      setOptimisticQuantity((prevState) => prevState + 1);
                    }
                  }}
                  disabled={createCartItem.isLoading}
                >
                  <Plus />
                </button>
              ) : (
                <span className="inline-block w-12 h-12"></span>
              )}
            </div>
          ) : (
            <div className="flex border border-grey-200 rounded-[10px] gap-y-3 flex-col items-center justify-between h-full">
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
          )}
        </div>
        <span className="text-sm text-grey-600">
          {name}{" "}
          {serverSelectedPrice
            ? `- ${serverSelectedPrice.weight} ${
                MEASURE_TYPES[serverSelectedPrice.measure_type]
              }`
            : `- ${product_price?.[0].weight} ${
                MEASURE_TYPES[product_price?.[0].measure_type]
              }`}
        </span>
        <div className="w-full flex items-center justify-between">
          <strong className="text-sm">
            <span
              className={clsx(
                (serverSelectedPrice?.discount_price ||
                  product_price?.[0].discount_price) &&
                  "text-danger line-through"
              )}
            >
              {serverSelectedPrice
                ? serverSelectedPrice.price.toLocaleString()
                : product_price?.[0].price.toLocaleString()}{" "}
            </span>{" "}
            {serverSelectedPrice
              ? serverSelectedPrice.discount_price?.toLocaleString()
              : product_price?.[0].discount_price?.toLocaleString() || ""}{" "}
            <span className="text-xs font-light text-grey-500">تومان</span>
          </strong>
          <span className="badge badge-accent text-xs">{category?.name}</span>
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

export { ProductCard };
