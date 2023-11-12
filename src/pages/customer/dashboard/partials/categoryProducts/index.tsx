import { getProductCategory } from "@/api/product";
import { category } from "@/model";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function DashboardCategoryProducts() {
  const { data: categories, isLoading } = useQuery("product-categories", () =>
    getProductCategory({
      params: {
        page_size: 10,
      },
    })
  );

  return (
    <div className="my-5">
      <h2 className="text-base xl:text-xl">دسته بندی محصولات</h2>
      <div className="flex items-center justify-start gap-x-3 xl:gap-x-4 mt-6 flex-wrap xl:flex-nowrap">
        {isLoading ? (
          <Skeleton
            count={6}
            className="basis-modified3 xl:basis-modified6 h-[168px] w-1/6"
            containerClassName="flex items-center justify-start gap-x-1 gap-y-2 xl:gap-x-4 w-full flex-wrap xl:flex-nowrap"
          />
        ) : null}
        {categories?.data.results.map((item: category) => (
          <Link
            to={`/products?category__id=${item.id}`}
            key={item.id}
            className="flex flex-col items-center justify-center gap-y-4 shadow-ev2 hover:shadow-ev3 basis-modified3 xl:basis-modified6 py-4 xl:py-8 rounded-custom transition-all"
          >
            <div className="w-16 bg-grey-50 h-16 flex items-center justify-center rounded-xl p-2">
              <img src={item.image} alt="category 6" />
            </div>
            <span className="text-xs xl:text-base">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { DashboardCategoryProducts };
