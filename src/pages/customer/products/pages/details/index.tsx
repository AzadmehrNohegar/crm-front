import { getProductProductById } from "@/api/product";
import { RadioSelect } from "@/components/radioSelect";
import { MEASURE_TYPES, listOption, product_price } from "@/model";
import { Fragment, useMemo, useState } from "react";
import { Bag, ChevronLeft, Delete } from "react-iconly";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { postCartCartItem } from "@/api/cart";
import { Minus } from "@/assets/icons/Minus";
import { Plus } from "@/assets/icons/Plus";
import Skeleton from "react-loading-skeleton";

function ProductDetails() {
  const { product_id } = useParams();

  const { data: productDetails, isLoading } = useQuery(
    `product-${product_id}`,
    () => getProductProductById({ id: product_id })
  );

  const [selectedPrice, setSelectedPrice] = useState<listOption | null>(null);

  const queryClient = useQueryClient();

  const createCartItem = useMutation(postCartCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const serverSelectedPrice = useMemo(() => {
    return productDetails?.data.product_price?.filter(
      (item: product_price) => item.quantity > 0
    )[0];
  }, [productDetails]);

  const handleIncrementCartItem = () =>
    createCartItem.mutate({
      body: {
        product_price:
          serverSelectedPrice?.id ||
          productDetails?.data.product_price?.[0]!.id,
        quantity: 1,
      },
    });

  const handleDecrementCartItem = () =>
    createCartItem.mutate({
      body: {
        product_price:
          serverSelectedPrice?.id ||
          productDetails?.data.product_price?.[0]!.id,
        quantity: -1,
      },
    });

  const handleIncrementSelectedPrice = (price: listOption) =>
    createCartItem.mutateAsync({
      body: {
        product_price: price.id,
        quantity: 1,
      },
    });

  const cumulativeQuantity = useMemo(() => {
    return (
      productDetails?.data.product_price?.reduce(
        (prev: number, curr: product_price) => prev + curr.quantity,
        0
      ) || 0
    );
  }, [productDetails]);

  if (!product_id) return <Navigate to=".." />;

  if (isLoading)
    return (
      <Skeleton
        inline
        count={2}
        className="h-full"
        containerClassName="flex items-stretch gap-x-2 h-full pb-5"
      />
    );

  return (
    <Fragment>
      <ul className="flex items-center gap-x-2 bg-grey-50 w-fit px-4 py-1 rounded-lg">
        <li className="inline-flex items-center">
          <Link
            to=".."
            className="inline-flex btn btn-link decoration-transparent items-center px-0 text-grey-500 gap-x-2"
          >
            <Bag />
            محصولات
            <ChevronLeft />
          </Link>
        </li>
        <li className="inline-flex items-center">
          <span className="text-grey-800 font-semibold">
            {productDetails?.data.name}
          </span>
        </li>
      </ul>
      <div className="flex items-stretch gap-x-4">
        <div className="w-7/12 py-5 flex flex-col gap-y-6">
          <div className="flex items-center justify-between">
            <h1>{productDetails?.data.name}</h1>
            <span className="badge badge-accent text-xs">
              {productDetails?.data.category?.name}
            </span>
          </div>
          <p>{productDetails?.data.description}</p>
          <div className="flex flex-col gap-y-2">
            <span className="text-xs font-light text-grey-500">
              وزن مورد نظر
            </span>
            <RadioSelect
              containerClassName="w-full"
              options={productDetails?.data.product_price?.map(
                (item: product_price) => ({
                  id: item.id,
                  label: `${item.weight} ${MEASURE_TYPES[item.measure_type]}`,
                })
              )}
              selected={selectedPrice}
              setSelected={(option) => setSelectedPrice(option)}
            />
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-y-4">
              <span>قیمت محصول:</span>
              <strong className="text-xl inline-flex items-center gap-x-1">
                <span
                  className={clsx(
                    (serverSelectedPrice?.discount_price ||
                      productDetails?.data.product_price?.[0].discount_price) &&
                      "text-danger relative before:absolute before:w-full before:h-px before:bg-danger before:inset-y-1/2 before:-rotate-[15deg]"
                  )}
                >
                  {serverSelectedPrice
                    ? serverSelectedPrice.price.toLocaleString()
                    : productDetails?.data.product_price?.[0].price.toLocaleString()}{" "}
                </span>
                {"  "}
                {serverSelectedPrice
                  ? serverSelectedPrice.discount_price === 0
                    ? ""
                    : serverSelectedPrice.discount_price?.toLocaleString()
                  : productDetails?.data.product_price?.[0].discount_price === 0
                  ? ""
                  : productDetails?.data.product_price?.[0].discount_price?.toLocaleString() ||
                    ""}{" "}
                <span className="text-base font-light text-grey-500">
                  تومان
                </span>
              </strong>
            </div>
            <div>
              {cumulativeQuantity === 0 ? (
                <div className="border border-transparent w-full">
                  <button
                    className="btn btn-primary disabled:bg-grey-200 min-w-[164px]"
                    onClick={() => {
                      if (selectedPrice) {
                        handleIncrementSelectedPrice(selectedPrice);
                      } else {
                        handleIncrementCartItem();
                      }
                    }}
                    disabled={
                      productDetails?.data.product_price?.reduce(
                        (prev: number, curr: product_price) =>
                          prev + curr.inventory,
                        0
                      ) === 0 || createCartItem.isLoading
                    }
                  >
                    {productDetails?.data.product_price?.reduce(
                      (prev: number, curr: product_price) =>
                        prev + curr.inventory,
                      0
                    ) === 0
                      ? "ناموجود"
                      : "افزودن به سبد خرید"}
                  </button>
                </div>
              ) : (
                <div className="flex border border-grey-200 rounded-[10px] w-36 gap-y-3 items-center justify-between h-full">
                  <button
                    className="btn btn-ghost btn-square"
                    onClick={() => {
                      handleIncrementCartItem();
                    }}
                    disabled={
                      createCartItem.isLoading ||
                      (serverSelectedPrice
                        ? serverSelectedPrice.inventory === cumulativeQuantity
                        : productDetails?.data.product_price?.[0].inventory ===
                          cumulativeQuantity)
                    }
                  >
                    <Plus />
                  </button>
                  {createCartItem.isLoading ? (
                    <span className="loading loading-spinner loading-md inline-block h-7 text-primary"></span>
                  ) : (
                    <span className="text-lg font-bold">
                      {cumulativeQuantity}
                    </span>
                  )}

                  <button
                    className={clsx(
                      "btn btn-ghost btn-square",
                      cumulativeQuantity === 1 && "text-danger"
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
              )}
            </div>
          </div>
        </div>
        <div className="5/12">
          <img
            src={productDetails?.data.image}
            className="max-h-[95vh]"
            alt="product image"
          />
        </div>
      </div>
    </Fragment>
  );
}

export default ProductDetails;
