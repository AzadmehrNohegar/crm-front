import { getProductIntroProduct } from "@/api/product";
import { product } from "@/model";
import { ProductCard } from "@/shared/productCard";
import { ArrowLeft } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function DashboardIntroProducts() {
  const { data: introProduct, isLoading } = useQuery("intro-product", () =>
    getProductIntroProduct({
      params: {
        page_size: 5,
      },
    })
  );

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-xl">معرفی محصولات</h2>
        <Link
          to="products"
          className="btn btn-ghost text-danger btn-link decoration-transparent"
        >
          مشاهده همه
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex items-center justify-evenly gap-x-4 flex-nowrap sm:flex-wrap overflow-x-auto ps-40 pe-2 py-4 sm:p-0">
        {isLoading ? (
          <Skeleton
            count={5}
            className="basis-modified5 h-[274px] w-1/5"
            containerClassName="items-center justify-start gap-x-4 w-full hidden sm:flex"
          />
        ) : null}
        {introProduct?.data.results.map((item: product) => (
          <ProductCard key={item.id} api_origin="intro-product" {...item} />
        ))}
      </div>
    </div>
  );
}

export { DashboardIntroProducts };
