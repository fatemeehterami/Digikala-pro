import { useEffect, useState } from 'react';
import './header.css'
import { fetchMenuItem } from '../../services/header';

export default function Header() {
  const [menu , setMenu] = useState([])

  useEffect(() => {
    const getMenuItem = async () => {
        try {
            const data = await fetchMenuItem ()
            setMenu(data.result || []);
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }
    getMenuItem()
}, [])



    return (
        <header className="w-full pb-3 flex flex-col relative z-2 bg-white border-b border-gray-200 font-[iransans]">
    <div className=" flex w-full container-4xl-w mx-auto relative justify-between md:px-4 grow ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3.5 w-full gap-3">
            <div className="flex flex-1 items-center grow gap-4">
                {/* logo */}
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="imgs/digi-logo.png" className="h-7" alt="digi logo" />
                </a>
                {/*  search box */}
                <form className="max-w-md w-full">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-6 h-6 text-black">
                            <use href="#search-icon"/>
                        </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-xl bg-gray-100 focus:ring-blue-500 focus:border-blue-500 " placeholder="جستجو" required />
                    </div>
                </form>

            </div>
            <div className="flex items-center justify-end">
                   {/* bell */}
                    <div className="ml-7">
                        <svg className="w-7 h-7 text-black">
                            <use href="#bell-icon"/>
                        </svg>
                    </div>
                    {/* login */}
                    <button id="login-div" className="border-gray-200 border-1 cursor-pointer p-2 flex justify-center items-center gap-3 flex-row-reverse rounded-xl relative ">
                        <span>ورود | ثبت‌نام</span>
                        <svg className="w-7 h-7 text-black">
                            <use href="#login-icon"/>
                        </svg>
                    </button>
                    {/* shopping card */}
                    <div className="mr-10">
                        <svg className="w-7 h-7 text-black">
                            <use href="#shoppingCard-icon"/>
                        </svg>
                    </div>
            </div>
        </div>
    </div>
    {/* main menu */}
    <nav className="flex items-center flex-wrap justify-between bg-neutral-000 md:px-4 grow flex-col">
        <div className="flex max-w-screen-xl w-full container-4xl-w mx-auto relative justify-between md:px-4 grow">
            <div className="flex justify-center items-center gap-3 text-sm ">
                {/* category */}
                <div className="cursor-pointer flex gap-1 items-center justify-center ">
                    <svg className="w-7 h-7 text-black">
                        <use href="#hamburger-icon"/>
                    </svg>

                <div className="relative">
                  <span className="text-base cursor-pointer">
                   دسته بندی کالا
                  </span>
                  <div className="absolute bg-neutral-50 w-auto h-[500px] hidden px-8">
                    <div className="flex w-full h-full">
                     {/* right side */}
                      <div dir="ltr" className="flex-col overflow-auto border-l border-l-neutral-200 w-56">
                        <a 
                         className="w-full flex items-center py-3 px-2 hover:bg-neutral-100 group">
                          <span className="w-full h-full flex items-center flex-row-reverse gap-2 group-hover:text-red-600">
                            <div>
                              {/* <svg style="width: 18px; height: 18px;">
                                <use ></use>
                              </svg> */}
                            </div>
                            <p className="text-sm text-right">
                              {/* {{item.title}} */}
                            </p>
                          </span>
                        </a>
                      </div>
                     {/* left side */}
                      <div className="flex-col w-full overflow-auto px-5 pt-5">
                        <div className="flex h-full w-full">
                          <div className="flex gap-3 justify-center items-center">
                            <span>همه محصولات</span>
                            <div className="grid grid-cols-2 gap-2 w-96">
                              <a 
                              className="text-sm decoration-0 text-gray-700 hover:text-red-500 cursor-pointer flex">
                                {/* {{ child.title }} */}
                              </a>
                            </div>
                            <div className="flex flex-col gap-2">
                              <a 
                                 className="text-sm text-gray-700 hover:text-red-600 cursor-pointer">
                                {/* {{ subChild.title }} */}
                              </a>
                            </div>
                            {/* <svg style="width: 18px; height: 18px;">
                                <use href="#leftArrow"></use>
                            </svg> */}
                          </div>
                          <div className="flex flex-col justify-center items-start">
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>







                <div className=" text-neutral-600 hidden md:block">|</div>
                {/* menu items */}
                <div className="flex justify-center items-center gap-3 text-[#62666d]">
                    <a href="#" className="decoration-0 pl-2">شگفت‌انگیزها</a>
                    <a href="#" className="decoration-0 px-2">سوپرمارکت</a>
                    <a href="#" className="decoration-0 px-2">طلای دیحیتال</a>
                    <a href="#" className="decoration-0 px-2">پرفروش‌ترین‌ها</a>
                </div>
                {/* question */}
                <div>
                    <a href="#" className="decoration-0 px-2 text-[#62666d]">سوالی دارید؟</a>
                </div>
            </div>
            {/* city */}
            <div className="px-3 py-1 bg-[#fff4ea] rounded-full cursor-pointer ">
                <a href="#" className="decoration-0 flex items-center justify-between gap-2">
                    <svg className="w-7 h-7 text-[#f57f17]">
                        <use href="#location-icon"/>
                    </svg>
                    <p className="text-xs font-bold text-[#f57f17]">شهر خود را انتخاب کنید</p>
                </a>
            </div>
        </div>
    </nav>





    
</header>
    )
}





