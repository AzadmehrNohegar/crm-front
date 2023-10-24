import { ArrowLeft } from "react-iconly";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { getProductSuggestedProduct } from "@/api/product";
import { useQuery } from "react-query";
import { product } from "@/model";
import { ProductCard } from "@/shared/productCard";

function DashboardSuggestedProducts() {
  const { data: suggestedProduct, isLoading } = useQuery(
    "suggested-product",
    () =>
      getProductSuggestedProduct({
        params: {
          page_size: 5,
        },
      })
  );

  console.log(suggestedProduct);

  if (isLoading) return <>...loading</>;

  return (
    <div className="my-5 flex items-center py-8 px-5 bg-danger rounded-[20px] gap-x-4">
      <div className="flex flex-col items-center justify-evenly h-full min-w-[150px]">
        <h1 className="text-2xl text-white text-center">پیشنهاد ویژه ما</h1>
        <img src="/images/confetti.png" alt="confetti" />
      </div>
      <Swiper spaceBetween={-60} slidesPerView={4}>
        {suggestedProduct?.data.results.map((item: product) => (
          <SwiperSlide>
            <ProductCard
              key={item.id}
              api_origin={"suggested-product"}
              {...item}
            />
          </SwiperSlide>
        ))}

        {suggestedProduct?.data.results.map((item: product) => (
          <SwiperSlide>
            <ProductCard
              key={item.id}
              api_origin={"suggested-product"}
              {...item}
            />
          </SwiperSlide>
        ))}
        {suggestedProduct?.data.results.map((item: product) => (
          <SwiperSlide>
            <ProductCard
              key={item.id}
              api_origin={"suggested-product"}
              {...item}
            />
          </SwiperSlide>
        ))}
        {suggestedProduct?.data.results.map((item: product) => (
          <SwiperSlide>
            <ProductCard
              key={item.id}
              api_origin={"suggested-product"}
              {...item}
            />
          </SwiperSlide>
        ))}
        {suggestedProduct?.data.results.map((item: product) => (
          <SwiperSlide>
            <ProductCard
              key={item.id}
              api_origin={"suggested-product"}
              {...item}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <Link
            to="products"
            className="flex flex-col justify-center items-center gap-y-5 bg-danger-50 min-h-[274px] max-w-[250px] rounded-[20px] border-2 border-dashed border-white"
          >
            <div className="p-4 bg-danger text-white rounded-full">
              <ArrowLeft />
            </div>
            <span className="text-danger text-sm font-bold">
              مشاهده همه محصولات
            </span>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export { DashboardSuggestedProducts };
