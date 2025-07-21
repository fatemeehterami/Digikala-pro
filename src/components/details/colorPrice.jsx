import { useState, useEffect } from "react";
import Seller from "./seller";
import SpecificModal from '../modal/specificModal';

export default function ColorsPrice({ variants , price ,image ,id, discount ,orderLimit}) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [checked, setChecked] = useState(false);
  const userIsLoggedIn = !!localStorage.getItem("token");
  const [modal, setModal] = useState(null);

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

  const selectedColorVariants = variants.filter(
    (v) => v.color?.hex_code === selectedColor?.color?.hex_code
  );
  const handleAddToCart = () => {
    if (!selectedColor || !selectedColor.id) {
      setModal({
        text: "لطفا یک رنگ را انتخاب کنید.",
        btnText:'باشه',
        onClose: () => setModal(null),
      });
      return;
    }
  
    const productToAdd = {
      id: id,
      img: image,
      color: selectedColor.color?.title_fa,
      limit: orderLimit,
      price: selectedColor.price?.selling_price,
      mainPrice: selectedColor.price?.rrp_price,
      discount: selectedColor.price?.is_promotion || null,
      insurance: checked ? selectedColor.insurance?.total_premium : null,
      warranty: selectedColor.warranty?.title_fa,
      quantity: 1,
    };
  
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = existingCart.findIndex(item => item.id === productToAdd.id);
  
      let updatedCart;
      if (existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += 1;
        updatedCart = existingCart;
      } else {
        updatedCart = [...existingCart, productToAdd];
      }
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setModal({
        text: "محصول به سبد خرید اضافه شد.",
        btnText:'باشه',
        onClose: () => setModal(null),
      });
    } catch (err) {
      console.error("خطا در ذخیره‌سازی سبد خرید:", err);
    }
  };
  
  
  
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
                    {(selectedColor.insurance.before_discount/10).toLocaleString("fa-IR")}
                  </p>
                  <p className="flex justify-center items-center flex-row-reverse gap-2 text-base">
                    <svg className="w-4 h-4 text-black">
                      <use href="#toman"></use>
                    </svg>
                    {(selectedColor?.insurance?.total_premium/10).toLocaleString("fa-IR")}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 lg:border p-3 lg:border-gray-200 rounded-lg lg:bg-gray-100 block">
        <Seller
          data={selectedColorVariants}
          selectedColor={selectedColor}
          insuranceCheck={checked}
          price={price}
          discount={discount}
          onAddToCart={handleAddToCart}
          isLoggedIn={userIsLoggedIn}
        />
      </div>
      {modal && (
          <SpecificModal
            text={modal.text}
            btnText={modal.btnText}
            onClose={modal.onClose}
          />
        )}
    </div>
  );
}
