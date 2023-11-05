import { ArrowLeft } from "react-iconly";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { getProductSuggestedProduct } from "@/api/product";
import { useQuery } from "react-query";
import { product } from "@/model";
import { ProductCard } from "@/shared/productCard";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

function DashboardSuggestedProducts() {
  const [isMounted, setIsMounted] = useState(false);

  const { data: suggestedProduct, isLoading } = useQuery(
    "suggested-product",
    () =>
      getProductSuggestedProduct({
        params: {
          page_size: 5,
        },
      }),
    {
      onSuccess: () => setTimeout(() => setIsMounted(true), 1000),
    }
  );

  if (isLoading) return <Skeleton height={358} containerClassName="my-5" />;

  return (
    <div className="my-5 flex flex-col sm:flex-row items-center py-8 px-5 bg-danger rounded-custom gap-4 overflow-x-hidden">
      <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-evenly h-full min-w-[150px] w-full sm:w-auto">
        <h1 className="text-base sm:text-2xl text-white text-center">
          پیشنهاد ویژه ما
        </h1>
        <img
          src="/images/confetti.png"
          className="w-7 h-7 sm:w-auto sm:h-auto"
          alt="confetti"
        />
      </div>
      <Swiper
        init={isMounted}
        slidesPerView={1.3}
        width={340}
        watchOverflow
        breakpoints={{
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
            centeredSlides: false,
            width: null,
          },
        }}
      >
        {suggestedProduct?.data.results.map((item: product) => (
          <SwiperSlide key={item.id}>
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
            className="flex flex-col justify-center items-center gap-y-5 bg-danger-50 min-h-[274px] max-w-[250px] rounded-custom border-2 border-dashed border-white"
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
