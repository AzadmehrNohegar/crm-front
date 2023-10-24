import { getProductProduct } from "@/api/product";
import { product } from "@/model";
import { ProductCard } from "@/shared/productCard";
import { ChevronDown, Filter } from "react-iconly";
import { useQuery } from "react-query";
import { ProductListFilters } from "./partials/filters";
import { Pagination } from "@/shared/pagination";
import { useLocation, useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  const { data: productsPagination, isLoading } = useQuery(
    ["products-pagination", search],
    () =>
      getProductProduct({
        params: {
          page: searchParams.get("page") || 1,
          page_size: searchParams.get("page_size") || 9,
          brand__id: searchParams.get("brand__id"),
          category__id: searchParams.get("category__id"),
          ordering: searchParams.get("ordering"),
        },
      })
  );

  return (
    <div className="flex items-stretch relative gap-x-4 pb-20">
      <ProductListFilters />
      <div className="w-3/4 flex justify-start flex-wrap gap-4 h-fit">
        <div className="basis-full flex justify-end w-full">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-link decoration-transparent text-gray-800"
            >
              <Filter />
              مرتب سازی
              <ChevronDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
            >
              <li>
                <button
                  onClick={() => {
                    searchParams.set("ordering", "-id");
                    setSearchParams(searchParams);
                  }}
                >
                  جدیدترین
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    searchParams.set("ordering", "-product_price");
                    setSearchParams(searchParams);
                  }}
                >
                  گران‌ترین
                </button>
                <button
                  onClick={() => {
                    searchParams.set("ordering", "+product_price");
                    setSearchParams(searchParams);
                  }}
                >
                  ارزان‌ترین
                </button>
              </li>
            </ul>
          </div>
        </div>
        {isLoading ? (
          <Skeleton
            count={6}
            height={281}
            inline
            containerClassName="flex items-center w-full justify-between flex-wrap gap-4"
            className="basis-modified3"
          />
        ) : null}
        {productsPagination?.data.results.map((item: product) => (
          <ProductCard
            containerClassName="basis-modified3"
            key={item.id}
            api_origin="products-pagination"
            {...item}
          />
        ))}
      </div>
      <Pagination
        count={productsPagination?.data.count}
        next={productsPagination?.data.next}
        page={+searchParams.get("page")! || 1}
        perPage={+searchParams.get("page_size")! || 9}
        prev={productsPagination?.data.prev}
        setPage={(val) => {
          searchParams.set("page", String(val));
          setSearchParams(searchParams);
        }}
        setPerPage={(val) => {
          searchParams.set("page_size", String(val));
          setSearchParams(searchParams);
        }}
        isEven
      />
    </div>
  );
}

export default ProductsList;
