import { getProductIntroProduct } from "@/api/product";
import { product } from "@/model";
import { ProductCard } from "@/shared/productCard";
import { ArrowLeft } from "react-iconly";
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

  if (isLoading) return <>...loading</>;

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl">معرفی محصولات</h2>
        <Link
          to="products"
          className="btn btn-ghost text-danger btn-link decoration-transparent"
        >
          مشاهده همه
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex items-center justify-evenly gap-x-4">
        {introProduct?.data.results.map((item: product) => (
          <ProductCard key={item.id} api_origin="intro-product" {...item} />
        ))}
      </div>
    </div>
  );
}

export { DashboardIntroProducts };
