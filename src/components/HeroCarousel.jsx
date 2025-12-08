import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ban1 from "../assets/banner1.jpeg";
// import ban2 from "../assets/banner2.jpg";
import ban3 from "../assets/banner3.jpg";
import ban4 from "../assets/banner4.jpg";

const slides = [
  {
    id: 1,
    img: ban4 ,
    title: "Upgrade Your Lifestyle",
    subtitle: "Trendy shoes, fashion & accessories",
  },
  {
    id: 2,
    img: ban1,
    title: "Exclusive Deals",
    subtitle: "Best prices guaranteed",
  },
  {
    id: 3,
    img: ban3,
    title: "New Arrivals",
    subtitle: "Fresh fashion every week",
  },
];

const HeroCarousel = () => {
  return (
    <div className="w-full h-[60vh] md:h-[75vh] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0  flex flex-col items-center justify-center text-black text-center px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
