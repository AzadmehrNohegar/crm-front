import { getProductCategory, getProductBrand } from "@/api/product";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { brand, category } from "@/model";
import { useState } from "react";
import { Search } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";

function ProductListFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [brandSearch, setBrandSearch] = useState("");

  const brandSearchDebouced = useDebounce(brandSearch, 200);

  const { data: categories } = useQuery("product-categories", () =>
    getProductCategory({
      params: {
        page_size: 10,
      },
    })
  );

  const { data: brands, isLoading } = useQuery(
    ["product-brands", brandSearchDebouced],
    () =>
      getProductBrand({
        params: {
          page_size: 10,
          search: brandSearchDebouced,
        },
      })
  );

  return (
    <div className="w-1/4 flex flex-col gap-y-4 border rounded-custom py-5 px-4 h-fit overflow-y-auto sticky top-0">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-bold">فیلترها</h4>
        <button className="btn btn-ghost text-danger px-0 btn-link decoration-transparent">
          پاکسازی فیلتر
        </button>
      </div>
      <div className="flex flex-col">
        <h5 className="text-sm font-bold text-primary mb-2 bg-clip-content relative after:absolute after:w-3/4 after:h-px after:inset-y-1/2 after:left-0 after:bg-primary">
          دسته‌بندی‌ها
        </h5>
        <Checkbox
          label="انتخاب همه"
          containerClassName="w-fit"
          checked={!searchParams.get("category__id")}
          onChange={() => {
            searchParams.delete("category__id");
            setSearchParams(searchParams);
          }}
        />
        {categories?.data.results.map((item: category) => (
          <Checkbox
            key={item.id}
            label={item.name}
            containerClassName="w-fit"
            checked={searchParams.get("category__id") === String(item.id)}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                searchParams.set("category__id", `${item.id}`);
                setSearchParams(searchParams);
              } else {
                searchParams.delete("category__id");
                setSearchParams(searchParams);
              }
            }}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <h5 className="text-sm font-bold text-primary mb-2 bg-clip-content relative after:absolute after:w-3/4 after:h-px after:inset-y-1/2 after:left-0 after:bg-primary">
          برند ها
        </h5>
        <Input
          className="input input-bordered w-full"
          containerClassName="my-4"
          placeholder="جست‌وجو"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          iconEnd={
            <button className="btn btn-secondary btn-square btn-sm absolute end-2 inset-y-auto">
              <Search />
            </button>
          }
        />
        <Checkbox
          label="انتخاب همه"
          containerClassName="w-fit"
          checked={!searchParams.get("brand__id")}
          onChange={() => {
            searchParams.delete("brand__id");
            setSearchParams(searchParams);
          }}
        />
        {isLoading ? (
          <Skeleton count={2} height={40} />
        ) : (
          brands?.data.results.map((item: brand) => (
            <Checkbox
              key={item.id}
              label={item.name}
              containerClassName="w-fit"
              checked={searchParams.get("brand__id") === String(item.id)}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("brand__id", `${item.id}`);
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("brand__id");
                  setSearchParams(searchParams);
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export { ProductListFilters };
