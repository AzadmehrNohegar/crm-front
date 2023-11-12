import { ArrowLeft, ArrowRight } from "react-iconly";
import { useSwiper } from "swiper/react";

function SwiperControls({ count }: { count: number }) {
  const swiper = useSwiper();

  return (
    <div className="flex items-center gap-x-2">
      <button
        className="btn btn-ghost btn-link decoration-transparent text-grey-800"
        onClick={() => swiper.slidePrev()}
        disabled={count < 6}
      >
        <ArrowRight />
      </button>
      <button
        className="btn btn-ghost btn-link decoration-transparent text-grey-800"
        onClick={() => swiper.slideNext()}
        disabled={count < 6}
      >
        <ArrowLeft />
      </button>
    </div>
  );
}

export { SwiperControls };
