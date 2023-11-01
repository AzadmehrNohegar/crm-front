import { ArrowLeft, ArrowRight } from "react-iconly";
import { useSwiper } from "swiper/react";

function SwiperControls() {
  const swiper = useSwiper();

  return (
    <div className="flex items-center gap-x-2">
      <button
        className="btn btn-ghost btn-link decoration-transparent text-grey-800"
        onClick={() => swiper.slidePrev()}
      >
        <ArrowRight />
      </button>
      <button
        className="btn btn-ghost btn-link decoration-transparent text-grey-800"
        onClick={() => swiper.slideNext()}
      >
        <ArrowLeft />
      </button>
    </div>
  );
}

export { SwiperControls };
