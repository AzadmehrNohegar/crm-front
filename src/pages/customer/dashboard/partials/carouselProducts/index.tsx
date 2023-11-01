import { getAccountSetting } from "@/api/account";
import { carousel } from "@/model";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "usehooks-ts";

function DashboardCarouselProducts() {
  const [isMounted, setIsMounted] = useState(false);
  const matches = useMediaQuery("(max-width: 768px)");

  const { data: dashboardCarousel, isLoading } = useQuery(
    "dashboard-carousel",
    () =>
      getAccountSetting({
        params: {
          page_size: 4,
        },
      }),
    {
      onSuccess: () => setTimeout(() => setIsMounted(true), 1000),
    }
  );

  if (isLoading) return <Skeleton height={278} />;

  return (
    <Swiper init={isMounted} watchOverflow slidesPerView={1}>
      {dashboardCarousel?.data.results.map((item: carousel) => (
        <SwiperSlide key={item.id} className="px-px">
          <Link to={item.url}>
            <img
              src={matches ? item.mobile_banner : item.desktop_banner}
              className="w-full"
              alt="banner temp"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export { DashboardCarouselProducts };
