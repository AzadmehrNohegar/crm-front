import { deleteProductProductById, getProductProductById } from "@/api/product";
import {
  MEASURE_TYPES,
  PRODUCT_TYPE,
  product_price,
  wholesale_warehouse,
} from "@/model";
import { CollapseWrapper } from "@/shared/collapseWrapper";
import { Fragment } from "react";
import { Delete, Edit } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductsManagementDetails() {
  const { product_id } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: productDetails, isLoading } = useQuery(
    `product-${product_id}`,
    () => getProductProductById({ id: product_id })
  );

  const deleteProduct = useMutation(deleteProductProductById, {
    onSuccess: () => {
      navigate("..");
      toast(`محصول ${productDetails?.data.name} حذف شد.`, {
        type: "info",
      });
      queryClient.invalidateQueries([
        "product-pagination",
        "products-pagination",
      ]);
    },
  });

  const handleDeleteProduct = () =>
    deleteProduct.mutate({
      id: product_id,
    });

  if (isLoading)
    return (
      <Fragment>
        <Skeleton height={80} />
        <Skeleton height={389} />
        <Skeleton height={292} />
      </Fragment>
    );

  return (
    <Fragment>
      <div className="flex items-center xl:items-start gap-x-2">
        <div className="flex items-center xl:items-start gap-x-2">
          <img
            src={productDetails?.data.image}
            width={80}
            height={80}
            className="object-contain"
            alt="product image"
          />
          <h1 className="flex flex-col gap-y-2">
            <span>{productDetails?.data.name}</span>
            <span className="badge badge-accent">
              {productDetails?.data.category.name}
            </span>
          </h1>
        </div>
        <button
          className="btn btn-error btn-square ms-auto"
          onClick={handleDeleteProduct}
        >
          <Delete />
        </button>
        <Link to="edit" className="btn btn-secondary btn-square">
          <Edit />
        </Link>
      </div>
      <CollapseWrapper title="جزئیات محصول">
        <ul className="flex flex-col divide-y">
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">نوع محصول</span>
            <strong>{PRODUCT_TYPE[productDetails?.data.type]}</strong>
          </li>
          <li className="flex items-start flex-col gap-y-2.5 py-4 text-sm">
            <span className="text-grey-600 font-light">توضیحات</span>
            <p>{productDetails?.data.description}</p>
          </li>
          <li className="flex items-center justify-between py-4 text-sm">
            <span className="text-grey-600 font-light">موجودی کل محصول</span>
            <span className="text-xs text-grey-500">
              <strong className="text-base font-bold text-grey-800">
                {Number(productDetails?.data.total_inventory).toLocaleString()}
              </strong>{" "}
              عدد
            </span>
          </li>
          {productDetails?.data.type === "PACKING" ? (
            <Fragment>
              <li className="flex items-center justify-between py-4 text-sm">
                <span className="text-grey-600 font-light">قیمت محصول</span>
                <span className="text-xs text-grey-500">
                  <strong className="text-base font-bold text-grey-800">
                    {Number(
                      productDetails?.data.product_price[0].price
                    ).toLocaleString()}
                  </strong>{" "}
                  تومان
                </span>
              </li>
              <li className="flex items-center justify-between py-4 text-sm">
                <span className="text-grey-600 font-light">قیمت با تخفیف</span>
                <span className="text-xs text-grey-500">
                  <strong className="text-base font-bold text-grey-800">
                    {productDetails?.data.product_price[0].discount_price === 0
                      ? "-"
                      : Number(
                          productDetails?.data.product_price[0].discount_price
                        ).toLocaleString()}
                  </strong>{" "}
                  تومان
                </span>
              </li>
              <li className="flex items-center justify-between py-4 text-sm">
                <span className="text-grey-600 font-light">وزن محصول</span>
                <span className="badge badge-accent">
                  {productDetails?.data.product_price[0].weight}{" "}
                  {
                    MEASURE_TYPES[
                      productDetails?.data.product_price[0].measure_type
                    ]
                  }
                </span>
              </li>
            </Fragment>
          ) : (
            <li className="flex items-center justify-between py-4 text-sm">
              <span className="text-grey-600 font-light">وزن محصول</span>
              <span className="inline-flex items-center gap-x-2">
                {productDetails?.data.product_price.map(
                  (item: product_price) => (
                    <span className="badge badge-accent">
                      {item.weight} {MEASURE_TYPES[item.measure_type]}
                    </span>
                  )
                )}
              </span>
            </li>
          )}
        </ul>
      </CollapseWrapper>
      {productDetails?.data.type === "PACKING" ? (
        <CollapseWrapper title="موجودی انبار" className="flex flex-col">
          <div className="overflow-x-auto">
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
                    className="text-grey-800 bg-secondary-50 rounded-lg w-1/2"
                    align="right"
                  >
                    انبار
                  </th>
                  <th
                    className="text-grey-800 bg-secondary-50 rounded-lg w-1/2"
                    align="right"
                  >
                    موجودی کل در انبار
                  </th>
                </tr>
              </thead>
              <tbody>
                {productDetails?.data.product_price[0].product_packing.map(
                  (item: wholesale_warehouse, index: number) => (
                    <tr key={index}>
                      <td className="rounded-lg border border-grey-200 bg-grey-100 text-center">
                        {index + 1}
                      </td>
                      <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/2">
                        {item.warehouse.name}
                      </td>
                      <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/2">
                        <span className="inline-flex items-center w-full justify-between">
                          <span>{item.stock}</span>
                          <span>کیلوگرم</span>
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </CollapseWrapper>
      ) : null}
      {productDetails?.data.type === "WHOLESALE" ? (
        <Fragment>
          <CollapseWrapper title="جزئیات قیمت محصول" className="flex flex-col">
            <div className="overflow-x-auto">
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
                  {productDetails.data.product_price.map(
                    (item: product_price, index: number) => (
                      <tr key={index}>
                        <td className="rounded-lg border border-grey-200 bg-grey-100 text-center">
                          {index + 1}
                        </td>
                        <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/3">
                          <span className="inline-flex items-center w-full justify-between">
                            <span>{item.weight.toLocaleString()}</span>
                            <span>{MEASURE_TYPES[item.measure_type]}</span>
                          </span>
                        </td>
                        <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/3">
                          <span className="inline-flex items-center w-full justify-between">
                            <span>{item.price.toLocaleString()}</span>
                            <span>تومان</span>
                          </span>
                        </td>
                        <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/3">
                          <span className="inline-flex items-center w-full justify-between">
                            <span>{item.discount_price.toLocaleString()}</span>
                            <span>تومان</span>
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </CollapseWrapper>
          <CollapseWrapper title="موجودی انبار" className="flex flex-col">
            <div className="overflow-x-auto">
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
                      className="text-grey-800 bg-secondary-50 rounded-lg w-1/2"
                      align="right"
                    >
                      انبار
                    </th>
                    <th
                      className="text-grey-800 bg-secondary-50 rounded-lg w-1/2"
                      align="right"
                    >
                      موجودی کل در انبار
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productDetails?.data.product_wholesale.map(
                    (item: wholesale_warehouse, index: number) => (
                      <tr key={index}>
                        <td className="rounded-lg border border-grey-200 bg-grey-100 text-center">
                          {index + 1}
                        </td>
                        <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/2">
                          {item.warehouse.name}
                        </td>
                        <td className="rounded-lg border border-grey-200 bg-grey-100 w-1/2">
                          <span className="inline-flex items-center w-full justify-between">
                            <span>{item.stock}</span>
                            <span>کیلوگرم</span>
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </CollapseWrapper>
        </Fragment>
      ) : null}
    </Fragment>
  );
}

export default ProductsManagementDetails;
