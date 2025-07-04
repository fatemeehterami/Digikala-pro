export default function Seller({ selectedColor , data ,discountPrice }) {
    return(
        <div>
            <div className="flex items-center justify-between mb-3">
            <p className="font-semibold">فروشنده</p>
            <p className="text-sm text-cyan-500">2 فروشنده دیگر</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-2 ">
                <div className="flex  items-center justify-start gap-4">
                    <svg className="w-6 h-6 text-black">
                        <use href="#seller"></use>
                    </svg>
                    <p>{data[0]?.seller?.title_fa}</p>
                </div>
                <div className="flex items-center justify-center gap-1 w-full ">
                    <div className="px-2 text-gray-300 block">|</div>
                    عملکرد<p style={{ color: data[0]?.seller?.grade?.color }}>{data[0]?.seller?.grade?.label}</p>
                </div>
            </div>
                <hr className="text-gray-300 my-2"></hr>
                <div className="flex justify-start items-center gap-3">
                  <div className="bg-[#d32f2f] text-white font-bold text-sm py-0.5 px-2 rounded-full">
                    {discountPrice?.toLocaleString("fa-IR")}٪
                  </div>
                  <p className="text-sm text-gray-500 line-through">
                    {data.price?.rrp_price.toLocaleString("fa-IR")}
                  </p>
                  <p className="flex justify-center items-center flex-row-reverse gap-2 text-base">
                    <svg className="w-4 h-4 text-black">
                      <use href="#toman"></use>
                    </svg>
                    {data.price?.selling_price.toLocaleString("fa-IR")}
                  </p>
                </div>
                <button className="w-full bg-[#d32f2f] text-white font-bold text-sm py-2 px-4 rounded-lg mt-3">
                    افزودن به سبد خرید  </button>
        </div>
    )
}