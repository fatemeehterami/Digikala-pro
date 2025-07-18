import { useRef, useState } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";

export default function Image({ images }) {
  const splideRef = useRef(null);
  const [mainImage, setMainImage] = useState(images?.main || "");
  const [thumbnails, setThumbnails] = useState(images?.image_list || []);

  const handleThumbnailClick = (selectedImg) => {
    if (mainImage && !thumbnails.includes(mainImage)) {
      setThumbnails((prev) => [mainImage, ...prev]);
    }
    setMainImage(selectedImg);
  };

  if (!images) return <div>No images found.</div>;

  return (
    <div id="detailSlider" className="flex justify-center items-center flex-col lg:my-5 mx-3 w-full ">
      <div className="lg:w-auto w-[250px] lg:h-auto h-[250px] mb-4">
        <img
          src={mainImage}
          alt="Main Product"
          className="w-full h-full object-cover"
        />
      </div>
      {thumbnails.length >= 4 ? (
        <Splide
          ref={splideRef}
          hasTrack={false}
          className="lg:w-[330px] w-full"
          options={{
            type: "slide",
            perPage: 4,
            direction: "rtl",
            gap: "1rem",
            pagination: false,
            arrows: true,
            drag: true,
            speed: 600,
            breakpoints: {
              640: { perPage: 2 },
              1024: { perPage: 3 },
            },
          }}
          aria-label="اسلایدر تصاویر محصول"
        >
          <SplideTrack>
            {thumbnails.map((item, index) => (
              <SplideSlide
                key={index}
                className="cursor-pointer p-1"
                onClick={() => handleThumbnailClick(item)}
              >
                <img
                  src={item}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      ) : (
        <div className="grid grid-cols-4 gap-2 w-64">
          {thumbnails.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer p-1"
              onClick={() => handleThumbnailClick(item)}
            >
              <img
                src={item}
                alt={`Product image ${index + 1}`}
                className="w-full h-20 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
