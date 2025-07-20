export default function Seller({ selectedColor, data, insuranceCheck, price, onAddToCart, isLoggedIn }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold text-cyan-500">فروشنده</p>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 ">
        <div className="flex  items-center justify-start gap-4">
          <svg className="w-6 h-6 text-black">
            <use href="#seller"></use>
          </svg>
          <p>{data[0]?.seller?.title_fa}</p>
        </div>
        <div className="flex items-center justify-start lg:justify-center gap-1 w-full  ">
          <div className="px-2 text-gray-300 block">|</div>
          عملکرد<p style={{ color: data[0]?.seller?.grade?.color }}>{data[0]?.seller?.grade?.label}</p>
        </div>
      </div>
      {insuranceCheck && (
        <div className="py-2 px-3 bg-blue-100 my-3 flex justify-between items-center rounded-lg">
          <p className="text-xs text-black">بیمه تجهیزات دیجیتال - بیمه سامان</p>
          <p className="text-xs flex justify-center items-center">
            {(selectedColor?.insurance?.total_premium / 10).toLocaleString("fa-IR")}
            <svg className="w-4 h-4 text-black">
              <use href="#toman"></use>
            </svg>
          </p>
        </div>
      )}
      <hr className="text-gray-300 my-2 "></hr>
      <div className="lg:flex flex-col justify-center items-end gap-3 px-2 hidden">
        {selectedColor?.price?.is_promotion && (
          <div className="flex justify-center items-center gap-2">
            <p className="text-[12px] text-gray-400 line-through">
              {(price?.rrp_price / 10).toLocaleString("fa-IR")}
            </p>
            <p className="bg-[#d32f2f] text-white font-bold text-[12px] py-0.5 px-2 rounded-full">
              {price?.discount_percent?.toLocaleString("fa-IR")}٪
            </p>
          </div>
        )}
        <p className="flex justify-center items-center flex-row-reverse gap-2 text-base">
          <svg className="w-4 h-4 text-black">
            <use href="#toman"></use>
          </svg>
          {(selectedColor?.price?.selling_price / 10).toLocaleString("fa-IR")}
        </p>
      </div>

      {isLoggedIn ? (
        <>
          <button
            onClick={onAddToCart}
            className="w-full bg-[#ef4056] text-white lg:block hidden font-bold text-sm py-2 px-4 rounded-lg mt-3 cursor-pointer"
          >
            افزودن به سبد خرید
          </button>

          <div className="fixed max-w-screen-xl border-t z-20 left-0 right-0 px-5 border-t-gray-200 bottom-[70px] gap-16 w-full py-5 bg-white flex justify-between items-center lg:hidden ">
            <button
              onClick={onAddToCart}
              className="w-full bg-[#ef4056] text-white font-bold text-sm py-2 px-4 rounded-lg cursor-pointer"
            >
              افزودن به سبد خرید
            </button>
            <div className="flex-col justify-center items-end gap-3 px-2 ">
              {selectedColor?.price?.is_promotion && (
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[12px] text-gray-400 line-through">
                    {(price?.rrp_price / 10).toLocaleString("fa-IR")}
                  </p>
                  <p className="bg-[#d32f2f] text-white font-bold text-[12px] py-0.5 px-2 rounded-full">
                    {price?.discount_percent?.toLocaleString("fa-IR")}٪
                  </p>
                </div>
              )}
              <p className="flex justify-center items-center flex-row-reverse gap-2 text-base">
                <svg className="w-4 h-4 text-black">
                  <use href="#toman"></use>
                </svg>
                {(selectedColor?.price?.selling_price / 10).toLocaleString("fa-IR")}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full bg-gray-300 text-gray-600 font-bold text-sm py-2 px-4 rounded-lg mt-3 text-center select-none cursor-not-allowed lg:block hidden">
            لطفا ابتدا وارد حساب کاربری شوید
          </div>

          <div className="fixed max-w-screen-xl border-t z-20 left-0 right-0 px-5 border-t-gray-200 bottom-[70px] gap-16 w-full py-5 bg-white flex justify-center items-center lg:hidden ">
            <div className="w-full bg-gray-300 text-gray-600 font-bold text-sm py-2 px-4 rounded-lg text-center select-none cursor-not-allowed">
              لطفا ابتدا وارد حساب کاربری شوید
            </div>
          </div>
        </>
      )}

      {selectedColor?.warranty && (
        <div className="py-3 w-full flex justify-between items-center gap-3">
          <svg className="w-5 h-5 text-black">
            <use href="#guarantee-icon"></use>
          </svg>
          <p className="text-xs w-5/6">{selectedColor.warranty.title_fa}</p>
        </div>
      )}
      {selectedColor?.shipment_methods.providers && (
        <div className="flex flex-col justify-start items-center mb-2 border-t border-t-gray-300">
          <div className="flex justify-between items-center gap-3 py-3 w-full">
            <svg className="w-5 h-5 text-cyan-500">
              <use href="#priceData-icon"></use>
            </svg>
            <p className="text-xs w-5/6">روش‌ها و هزینه‌های ارسال</p>
          </div>
          <div>
            <ul className="list-disc">
              {selectedColor.shipment_methods.providers.map((item, index) => {
                return (
                  <li key={index} className="text-xs">
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
