import { getProductCategory, getProductBrand } from "@/api/product";
import { Close } from "@/assets/icons/Close";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { brand, category } from "@/model";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Search } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useDebounce, useUpdateEffect } from "usehooks-ts";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface IFiltersSlideoverProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

function FiltersSlideover({ isOpen, setIsOpen }: IFiltersSlideoverProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [brandSearch, setBrandSearch] = useState("");
  const [value, setValue] = useState(() => {
    if (
      searchParams.get("product_price__price__gt") &&
      searchParams.get("product_price__price__lt")
    )
      return [
        searchParams.get("product_price__price__gt") || 0,
        searchParams.get("product_price__price__lt") || 100000000,
      ];
    return [0, 100000000];
  });

  const brandSearchDebouced = useDebounce(brandSearch, 200);
  const valueDebounced = useDebounce(value, 200);

  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    "product-categories",
    () =>
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

  useUpdateEffect(() => {
    searchParams.set("product_price__price__gt", valueDebounced[0].toString());
    searchParams.set("product_price__price__lt", valueDebounced[1].toString());
    setSearchParams(searchParams);
  }, [valueDebounced]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className="fixed z-[100] inset-0 overflow-hidden">
        <Transition.Child
          as="div"
          className="bg-white h-screen p-5 flex flex-col"
          enter="transform transition ease-in-out duration-500 xl:duration-700"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500 xl:duration-700"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold flex items-center gap-x-2">
              <button
                className="btn btn-sm btn-square btn-ghost text-grey-800"
                onClick={() => setIsOpen(false)}
              >
                <Close className="scale-90" />
              </button>
              فیلترها
            </h4>
            <button
              className="btn btn-ghost text-danger px-0 btn-link decoration-transparent"
              onClick={() => setSearchParams("")}
            >
              پاکسازی فیلتر
            </button>
          </div>
          <div className="h-full overflow-y-auto py-5 flex flex-col gap-y-4">
            <div className="flex flex-col">
              <h5 className="text-sm font-bold text-primary mb-2 bg-clip-content relative after:absolute after:w-full after:h-px after:inset-y-1/2 after:left-0 after:bg-primary">
                <span className="bg-white inline-block relative z-[1] pe-2">
                  دسته‌بندی‌ها
                </span>
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
              {isCategoriesLoading ? (
                <Skeleton count={2} height={40} />
              ) : (
                categories?.data.results.map((item: category) => (
                  <Checkbox
                    key={item.id}
                    label={item.name}
                    containerClassName="w-fit"
                    checked={
                      searchParams.get("category__id") === String(item.id)
                    }
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
                ))
              )}
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold text-primary mb-2 bg-clip-content relative after:absolute after:w-full after:h-px after:inset-y-1/2 after:left-0 after:bg-primary">
                <span className="bg-white inline-block relative z-[1] pe-2">
                  محدوده قیمت
                </span>
              </h5>
              <RangeSlider
                min={0}
                max={100000000}
                step={10000}
                value={value}
                onInput={setValue}
                className="mt-4 mb-3"
              />
              <div className="flex items-center justify-between text-sm font-light text-grey-600">
                <span>ارزان‌ترین</span>
                <span>گرانترین</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-bold text-primary mb-2 bg-clip-content relative after:absolute after:w-full after:h-px after:inset-y-1/2 after:left-0 after:bg-primary">
                <span className="bg-white inline-block relative z-[1] pe-2">
                  برند ها
                </span>
              </h5>
              <Input
                className="input input-bordered w-full"
                containerClassName="my-4"
                placeholder="جست‌وجو"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                iconEnd={
                  <button className="btn btn-secondary btn-square btn-sm absolute end-1 inset-y-auto">
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
          <button
            className="btn btn-block btn-primary"
            onClick={() => setIsOpen(false)}
          >
            ذخیره تغییرات
          </button>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
}

export { FiltersSlideover };
