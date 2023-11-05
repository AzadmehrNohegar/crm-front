import { getProductBrand } from "@/api/product";
import { brand } from "@/model";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SwiperControls } from "@/shared/swiperControls";
import Skeleton from "react-loading-skeleton";

function DashboardBrandProducts() {
  const [isMounted, setIsMounted] = useState(false);

  const { data: brands, isLoading } = useQuery(
    "product-brands",
    () =>
      getProductBrand({
        params: {
          page_size: 10,
        },
      }),
    {
      onSuccess: () => setTimeout(() => setIsMounted(true), 1000),
    }
  );

  if (isLoading) return <Skeleton height={245} />;

  return (
    <div className="flex my-10 items-start gap-y-4 flex-col">
      <Swiper
        init={isMounted}
        slidesPerView={1.5}
        width={340}
        breakpoints={{
          768: {
            slidesPerView: 6,
            spaceBetween: 20,
            width: null,
          },
        }}
        watchOverflow
        modules={[Navigation]}
        className="w-full"
      >
        <div className="flex items-center justify-between w-full absolute -top-4 z-20">
          <h2 className="text-xl">دسته بندی محصولات</h2>
          <SwiperControls />
        </div>
        {brands?.data.results.map((item: brand) => (
          <SwiperSlide className="pt-10 pb-2 px-2" key={item.id}>
            <Link
              to={`products?brand__id=${item.id}`}
              key={item.id}
              className="p-5 flex flex-col gap-y-2 shadow-ev2 basis-modified6 w-full aspect-square justify-evenly rounded-custom"
            >
              <img
                src={item.image}
                className="w-full h-16 object-contain"
                alt="brand image"
              />
              <span className="inline-block w-full rounded-lg bg-gray-100 text-center">
                {item.name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { DashboardBrandProducts };
