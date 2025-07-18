import { useRef } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import BrandItem from "./brandItem";
import './brand.css'

const brands = [
    { id: 1, src: "brand/1.jpg", alt: "عکس برند",url:"" ,name:"سامسونگ"},
    { id: 2, src: "brand/2.png", alt: "عکس برند", url:"",name:"شیائومی"},
    // { id: 3, src: "brand/3.jpg", alt: "عکس برند",url:"",name:"ساعی"},
    { id: 4, src: "brand/4.png", alt: "عکس برند", url:"",name:"ویتالیر"},
    { id: 5, src: "brand/5.jpg", alt: "عکس برند",url:"",name:"مهیا" },
    { id: 6, src: "brand/7.jpg", alt: "عکس برند",url:"" ,name:"فولیکا"},
    { id: 7, src: "brand/8.png", alt: "عکس برند",url:"" ,name:"مای"},
    { id: 8, src: "brand/9.png", alt: "عکس برند",url:"" ,name:"کاله"},
    { id: 9, src: "brand/10.jpg", alt: "عکس برند",url:"" ,name:"اکتیو"},
    { id: 10, src: "brand/11.png", alt: "عکس برند",url:"" ,name:"لافارر"},
    { id: 11, src: "brand/12.jpg", alt: "عکس برند",url:"" ,name:"یوروویتال"},
    { id: 12, src: "brand/13.png", alt: "عکس برند",url:"" ,name:"هوآوی"},
    { id: 13, src: "brand/14.png", alt: "عکس برند",url:"" ,name:"چینی زرین"},
    { id: 14, src: "brand/15.jpg", alt: "عکس برند",url:"" ,name:"ایکس ویژن"},
    { id: 15, src: "brand/16.png", alt: "عکس برند",url:"" ,name:"پرسیل"},
    { id: 16, src: "brand/17.png", alt: "عکس برند",url:"" ,name:"پریل"},
    { id: 17, src: "brand/18.jpg", alt: "عکس برند",url:"" ,name:"چرم مشهد"},
    { id: 18, src: "brand/19.jpg", alt: "عکس برند",url:"" ,name:"پنتر"},
  ];

  export default function BrandBox() {
    const bennerRef = useRef(null);
  
    return (
      <div id="brandSlider" className="border flex flex-col items-center justify-center border-gray-200 lg:max-w-screen-xl mx-auto rounded-lg my-8 lg:px-0 px-3">
        <p className="text-xl font-bold text-gray-800 mt-4 flex items-center justify-center gap-2">
        <svg className="w-5 h-5 ">
              <use href='#topBrands'></use>
          </svg>
        محبوب‌ترین برندها
        </p>
        <Splide
          className="relative "
          ref={bennerRef}
          hasTrack={false}
          options={{
            type: "loop",
            direction: "rtl",
            perPage: 7, 
            gap: "5px",
            pagination: false,
            arrows: true,
            autoplay: false,
            drag: true,
            speed: 600,
            breakpoints: {
              1024: {
                perPage: 5,
              },
              768: {
                perPage: 4,
              },
              480: {
                perPage: 3,
              },
            },
          }}
          aria-label="اسلایدر برند"
        >
          <SplideTrack className="w-full">
            {brands.map((item, index) => (
              <SplideSlide key={index} className="z-0 relative">
                <BrandItem
                  src={item.src}
                  alt={item.alt}
                  url={item.url}
                  name={item.name}
                />
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
    );
  }
  