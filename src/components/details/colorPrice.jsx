import { useState, useEffect } from "react";
import Seller from "./seller";


export default function ColorsPrice({ variants, parameters, discountPrice }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [checked, setChecked] = useState(false);

  // رنگ‌های یکتا بر اساس hex_code
  const uniqueColors = variants?.filter(
    (v, index, self) =>
      index === self.findIndex((t) => t.color?.hex_code === v.color?.hex_code)
  );

  useEffect(() => {
    if (variants && variants.length > 0) {
      setSelectedColor(variants[0]);
    }
  }, [variants]);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const handleSelect = (item) => {
    setSelectedColor(item);
  };

  // فقط آیتم‌هایی که با رنگ انتخاب‌شده تطابق دارن
  const selectedColorVariants = variants.filter(
    (v) => v.color?.hex_code === selectedColor?.color?.hex_code
  );

  return (
    <div className="w-full my-5 grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div className="col-span-1">
        {selectedColor && (
          <p className="text-sm mb-3">
            رنگ : <span className="font-bold">{selectedColor.color?.title_fa}</span>
          </p>
        )}

        <div className="flex gap-2">
          {uniqueColors?.map((item, index) => {
            const isSelected = selectedColor?.color?.hex_code === item.color?.hex_code;
            return (
              <button
                key={index}
                onClick={() => handleSelect(item)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? "border-cyan-500" : "border-gray-300"}`}
                style={{ backgroundColor: item.color?.hex_code || "#ccc" }}
              >
                {isSelected && (
                  <span className="text-white text-xs font-bold">✔</span>
                )}
              </button>
            );
          })}
        </div>

        {selectedColor?.insurance && (
          <>
            <p className="mt-5 text-lg text-black">بیمه</p>
            <div className="border border-gray-300 rounded-lg p-3 mt-2 flex">
              <div className="border-l border-gray-300 p-2 flex justify-center items-center">
                <button
                  type="button"
                  className="bg-white cursor-pointer border border-gray-300 rounded p-2 relative"
                  onClick={toggleChecked}
                >
                  {checked && (
                    <svg
                      className="w-[18px] h-[18px] bg-blue-400 text-white absolute rounded top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex justify-start items-start gap-3 flex-col mr-3">
                <p className="text-sm text-black">بیمه تجهیزات دیجیتال - بیمه سامان</p>
                <div className="flex justify-start items-center gap-3">
                  <div className="bg-[#d32f2f] text-white font-bold text-sm py-0.5 px-2 rounded-full">
                    {selectedColor.insurance.discount_percent.toLocaleString("fa-IR")}٪
                  </div>
                  <p className="text-sm text-gray-500 line-through">
                    {selectedColor.insurance.before_discount.toLocaleString("fa-IR")}
                  </p>
                  <p className="flex justify-center items-center flex-row-reverse gap-2 text-base">
                    <svg className="w-4 h-4 text-black">
                      <use href="#toman"></use>
                    </svg>
                    {selectedColor.insurance.total_premium.toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 border p-3 border-gray-200 rounded-lg bg-gray-100 hidden lg:block">
        <Seller
          data={selectedColorVariants}
          selectedColor={selectedColor}
          discountPrice={discountPrice}
        />
      </div>
    </div>
  );
}
