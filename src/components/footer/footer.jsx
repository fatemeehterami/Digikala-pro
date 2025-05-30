export default function Footer() {
    return (
    <footer className="bg-white font-[iransans]">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      {/* footer logo */}
        <div className="flex justify-between items-center">
            <div className="mb-6 md:mb-0">
                <a href="#" className="flex items-center">
                    <img src="imgs/digi-logo.png" className="h-7 me-3" alt="digi Logo" />
                </a>
            </div>
            <button className="border-gray-200 border-1 text-neutral-500 cursor-pointer px-4 py-2 flex justify-center items-center gap-3 flex-row-reverse rounded-xl relative ">
                <img src="icons/up-arrow.svg" className="h-3.5" alt="uparrow" />
                <span className="text-sm">بازگشت به بالا</span>
            </button>
        </div>
      {/* phones */}
        <div className="mb-8 mt-4 md:mt-3 md:mb-0 flex items-center flex-wrap lg:flex-nowrap text-body-2 text-neutral-700">
            <p className="shrink-0 text-xs">تلفن پشتیبانی ۰۰۰۰۰۰۰۰ - ۰۲۱</p>
            <div className="px-5 text-neutral-400 hidden md:block">|</div>
            <p className="shrink-0 text-xs">۰۲۱-۰۰۰۰۰۰۰۰</p>
            <div className="px-5 text-neutral-400 hidden md:block">|</div>
            <p className="w-full mt-1 md:mt-0 text-xs">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
        </div>
      {/* equipments */}
        <div className="flex my-8 items-center justify-between select-none hidden lg:flex ">
            <div className="flex justify-between items-center w-full">
                <a href="#" className="flex flex-col justify-center items-center gap-1 py-3 grow">
                    <div className="w-14 h-14">
                        <img className="w-full inline-block object-cover" src="icons/express-delivery.svg"
                         width="56" height="56" alt="اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس" title="" />
                    </div>
                    <p className="text-xs text-neutral-700">اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس</p>
                </a>
                <a href="#" className="flex flex-col justify-center items-center gap-1 py-3 grow">
                    <div className="w-14 h-14">
                        <img className="w-full inline-block object-cover" src="icons/cash-on-delivery.svg"
                         width="56" height="56" alt="امکان پرداخت در محل" title="" />
                    </div>
                    <p className="text-xs text-neutral-700">امکان پرداخت در محل</p>
                </a>
                <a href="#" className="flex flex-col justify-center items-center gap-1 py-3 grow">
                    <div className="w-14 h-14">
                        <img className="w-full inline-block object-cover" src="icons/support.svg"
                         width="56" height="56" alt="۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ" title="" />
                    </div>
                    <p className="text-xs text-neutral-700">۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ</p>
                </a>
                <a href="#" className="flex flex-col justify-center items-center gap-1 py-3 grow">
                    <div className="w-14 h-14">
                        <img className="w-full inline-block object-cover" src="icons/days-return.svg"
                         width="56" height="56" alt="هفت روز ضمانت بازگشت کالا" title="" />
                    </div>
                    <p className="text-xs text-neutral-700">هفت روز ضمانت بازگشت کالا</p>
                </a>
                <a href="#" className="flex flex-col justify-center items-center gap-1 py-3 grow">
                    <div className="w-14 h-14">
                        <img className="w-full inline-block object-cover" src="icons/original-products.svg"
                         width="56" height="56" alt="ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ" title="" />
                    </div>
                    <p className="text-xs text-neutral-700">ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ</p>
                </a>
            </div>
        </div>
      {/* whith us box */}
        <div className="flex justify-between items-center w-full">
          {/* with digikala */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 grow w-[70%] ">
            <div>
              <h2 className="mb-6 text-base font-semibold text-gray-900 uppercase ">با دیجی‌کالا</h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">اتاق خبر دیجی‌کالا</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">فروش در دیجی‌کالا</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">فرصت‌های شغلی</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">گزارش تخلف در دیجی‌کالا</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">تماس با دیجی‌کالا</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">درباره دیجی‌کالا</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-base font-semibold text-gray-900 uppercase ">خدمات مشتریان</h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">پاسخ به پرسش‌های متداول</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">رویه‌های بازگرداندن کالا</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">شرایط استفاده</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">حریم خصوصی</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">گزارش باگ</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-base font-semibold text-gray-900 uppercase ">راهنمای خرید از دیجی‌کالا</h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">نحوه ثبت سفارش</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">رویه ارسال سفارش</a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:text-gray-700 text-sm decoration-0">شیوه‌های پرداخت</a>
                </li>
              </ul>
            </div>
          </div>
          {/* whith us */}
          <div className="grow w-[30%]">
            <h2 className="mb-4 text-base font-semibold text-gray-900 ">همراه ما باشید!</h2>
            {/* icons */}
            <div className="flex items-center justify-start gap-7">
              <a href="#" className="decoration-0">
                <img src="icons/instagram.svg" className="h-8 w-8 " alt="instagram"/>
              </a>
              <a href="#" className="decoration-0">
                <img src="icons/twitter.svg" className="h-8 w-8 " alt="twitter"/>
              </a>
              <a href="#" className="decoration-0">
                <img src="icons/linkedin.svg" className="h-8 w-8 " alt="linkedin"/>
              </a>
              <a href="#" className="decoration-0">
                <img src="icons/aparat.svg" className="h-7 w-7 " alt="aparat"/>
              </a>
            </div>
            <p className="my-6 text-sm font-semibold text-gray-900" >با ثبت ایمیل، از جدیدترین تخفیف‌ها باخبر شوید</p>
            {/* email box */}
            <div className="relative w-full">
            <form className="flex items-center max-w-sm mx-auto">
              <input type="text" id="" className="bg-neutral-100 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full pr-6 p-3.5 placeholder-neutral-400" placeholder="ایمیل شما" required />
              <button type="submit" className="p-3.5 ms-2 text-sm font-medium text-white bg-neutral-300 rounded-lg border  hover:bg-blue-800 focus:ring-4 focus:outline-none">
                ثبت
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>

         </div>
        </div>


      <hr className="my-3 border-gray-200 sm:mx-auto  lg:my-4" />
      <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-xs text-gray-500 sm:text-center ">
            برای استفاده از مطالب دیجی‌کالا، داشتن «هدف غیرتجاری» و ذکر «منبع» کافیست. تمام حقوق اين وب‌سايت نیز برای شرکت نوآوران فن آوازه (فروشگاه آنلاین دیجی‌کالا) است.
          </span>
      </div>
    </div>
</footer>
)
}



