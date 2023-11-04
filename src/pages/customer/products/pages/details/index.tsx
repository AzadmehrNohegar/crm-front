import { getProductProductById } from "@/api/product";
import { RadioSelect } from "@/components/radioSelect";
import { MEASURE_TYPES, listOption, product_price } from "@/model";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Bag, ChevronLeft, Delete } from "react-iconly";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { postCartCartItem } from "@/api/cart";
import { Minus } from "@/assets/icons/Minus";
import { Plus } from "@/assets/icons/Plus";

function ProductDetails() {
  const { productId } = useParams();

  const { data: productDetails } = useQuery(`product-${productId}`, () =>
    getProductProductById({ id: productId })
  );

  const [selectedPrice, setSelectedPrice] = useState<listOption | null>(null);

  const queryClient = useQueryClient();

  const createCartItem = useMutation(postCartCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const [optimisticQuantity, setOptimisticQuantity] = useState<number>(
    productDetails?.data.product_price?.reduce(
      (prev: number, curr: product_price) => prev + curr.quantity,
      0
    ) || 0
  );

  useEffect(() => {
    setOptimisticQuantity(
      productDetails?.data.product_price?.reduce(
        (prev: number, curr: product_price) => prev + curr.quantity,
        0
      )
    );
  }, [productDetails]);

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
    createCartItem
      .mutateAsync({
        body: {
          product_price: price.id,
          quantity: 1,
        },
      })
      .then(() => {
        setOptimisticQuantity((prevState) => prevState + 1);
      });

  if (!productId) return <Navigate to=".." />;

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
              <strong className="text-xl">
                <span
                  className={clsx(
                    (serverSelectedPrice?.discount_price ||
                      productDetails?.data.product_price?.[0].discount_price) &&
                      "text-danger line-through"
                  )}
                >
                  {serverSelectedPrice
                    ? serverSelectedPrice.price.toLocaleString()
                    : productDetails?.data.product_price?.[0].price.toLocaleString()}{" "}
                </span>{" "}
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
              {optimisticQuantity === 0 ? (
                <div className="border border-transparent w-full">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      if (selectedPrice) {
                        handleIncrementSelectedPrice(selectedPrice);
                      } else {
                        handleIncrementCartItem();
                        setOptimisticQuantity((prevState) => prevState + 1);
                      }
                    }}
                    disabled={
                      productDetails?.data.inventory === 0 ||
                      createCartItem.isLoading
                    }
                  >
                    {productDetails?.data.inventory === 0
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
                      setOptimisticQuantity((prevState) => prevState + 1);
                    }}
                    disabled={createCartItem.isLoading}
                  >
                    <Plus />
                  </button>
                  {createCartItem.isLoading ? (
                    <span className="loading loading-spinner loading-md inline-block h-7 text-primary"></span>
                  ) : (
                    <span className="text-lg font-bold">
                      {optimisticQuantity}
                    </span>
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
