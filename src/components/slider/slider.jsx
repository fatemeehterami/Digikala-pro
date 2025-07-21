import { useEffect, useRef, useState } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import "./slider.css"
import SliderItem from "./sliderItem";
const sliders = [
    { id: 1, src: "sliders/1.webp", alt: "عکس بنر",name:"برگر پمینا" },
    { id: 2, src: "sliders/2.webp", alt: "عکس بنر", name:"ساعت کاسیو"},
    { id: 3, src: "sliders/3.webp", alt: "عکس بنر",name:"پرسیل"},
    { id: 4, src: "sliders/4.webp", alt: "عکس بنر", name:"پوشاک مردانه و زنانه"},
    { id: 5, src: "sliders/5.webp", alt: "عکس بنر",name:"لوازم برقی خانگی" },
    { id: 6, src: "sliders/6.webp", alt: "عکس بنر",name:" تن ماهی و زر ماکارون" },
    { id: 7, src: "sliders/7.webp", alt: "عکس بنر",name:"تجهیزات پزشکی و سلامت" },
    { id: 8, src: "sliders/8.webp", alt: "عکس بنر",name:"کالای دیجیتال" },
    { id: 9, src: "sliders/9.webp", alt: "عکس بنر",name:"محصولات بومی" },
    { id: 10, src: "sliders/10.webp", alt: "عکس بنر",name:"لوازم تحریر و صنایع دستی" },
    { id: 11, src: "sliders/11.webp", alt: "عکس بنر",name:"لوارم ورزش و سفر" },
  ];

export default function Slider() {
  const splideRef = useRef(null);
  const [isLgScreen, setIsLgScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsLgScreen(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);


  return (
    <div id="main-slider" className="main-slider w-full pt-3 lg:h-auto h-[200px]">
      <Splide
        className="relative"
        ref={splideRef}
        hasTrack={false}
        options={{
          lazyLoad: false,
          autoplay: true,
          interval: 3000,
          preloadPages: 2,
          direction: "rtl",
          type: "loop",
          cover: true,
          keyboard: false,
          arrows: isLgScreen ? true : false,
          pagination: true,
          }}
        aria-label="اسلایدر بنر"
      >
        <SplideTrack className="w-full">
          {sliders.map((item, index) => (
            <SplideSlide key={index} className="z-0 relative">
              <SliderItem src={item.src} alt={item.alt} name={item.name} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </div>
  );
}
