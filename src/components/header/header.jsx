import { useEffect, useState,useContext } from 'react';
import './header.css'
import { fetchMenuItem } from '../../services/header';
import { AuthContext } from "../../AuthContext";
import { useNavigate,Link } from 'react-router-dom';
import { logout as apiLogout } from '../../services/login'; 
import SpecificModal from '../modal/specificModal';


export default function Header() {
  const [menu , setMenu] = useState([])
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { mobile , logout } = useContext(AuthContext);
  const [modalType, setModalType] = useState(null);

  const icons= ["mobile", "electronic", "electronic","homeKitchen", "homeElectronic",
    "beauty", "vehicles", "tools", "fashion", "jewelry", "health",
   "bookStationary", "sportOutdoor", "giftCard", "fresh", "kidsToy", "nativeBusiness", "pinother"];

   const handleClick = () => {
    if (!mobile) { 
      navigate('/user/login');
    }
  };
  const handleProfile = () => {
      navigate('/profile');
  };
  const handleShoppingCard = () => {
    if (!mobile) { 
      navigate('/user/login');
    }else{
      navigate('/shopping-card');
    }
  };
  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("error on logout:", err.message);
    }
    logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const getMenuItem = async () => {
        try {
          const data = await fetchMenuItem();
          if (data?.result?.length) {
            data.result.map((item, index) => {
              item.icon = icons[index]
            })
            setMenu(data.result);
          } else {
            console.warn("No result found in fetched data.");
          }
        } catch (err) {
            console.error(err)
        }
    }
    getMenuItem()
}, [])

useEffect(() => {
  if (menu?.length > 0) {
    setActiveItem(menu[0]);
  }
}, [menu]);

const convertToPersianDigits = (str) => {
  if (!str) return '';
  return str.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

    return (
        <header className="lg:w-full pb-3 flex flex-col relative z-2 bg-white border-b border-gray-200 font-[iransans]">
    <div className=" flex w-full container-4xl-w mx-auto relative justify-between px-4 grow ">
        <div className="lg:max-w-screen-xl flex flex-wrap items-center justify-between mx-auto lg:p-3.5 py-2 w-full gap-3">
            <div className="flex flex-1 items-center grow gap-4">
                {/* logo */}
                <a href="/" className="lg:flex items-center space-x-3 rtl:space-x-reverse hidden">
                    <img src="/imgs/digi-logo.png" className="h-7" alt="digi logo" />
                </a>
                {/*  search box */}
                <form className="lg:max-w-md w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    const slug = searchQuery.trim().replace(/\s+/g, '-');
                    navigate(`/search/${encodeURIComponent(slug)}`);
                    setSearchQuery('');
                  }
                }}>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-20">
                        <svg className="w-6 h-6 text-black cursor-pointer">
                            <use href="#search-icon"/>
                        </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-xl bg-gray-100 focus:ring-blue-500 focus:border-blue-500 "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="جستجو" required />
                    </div>
                </form>

            </div>
            <div className="flex items-center justify-end">
            {/* bell */}
            <div className="lg:ml-7 lg:bg-transparent bg-gray-100 p-2 rounded-full">
              <svg className="w-7 h-7 text-black">
                <use href="#bell-icon" />
              </svg>
            </div>

            {/* login */}
            <div
              className={`relative hidden lg:flex justify-center items-center gap-3 flex-row-reverse rounded-xl cursor-pointer group ${!mobile ? 'border border-gray-200 p-2' : 'px-4'}`}
              id="login-div"
              onClick={handleClick}
            >
              {mobile ? (
                <>
                  <svg className="w-7 h-7 text-black">
                    <use href="#user-icon" />
                  </svg>
                  <svg className="w-3 h-4 text-black rotate-180">
                    <use href="#up-arrowKey" />
                  </svg>

                  {/* dropdown */}
                  <div className="absolute top-full left-3  w-48  bg-white border border-gray-200   rounded-lg shadow-lg hidden flex-col items-center group-hover:flex z-50">
                    <a className="cursor-pointer flex justify-between items-center hover:bg-gray-100 text-lg p-4 transition-colors  w-full border-b border-b-gray-200" onClick={handleProfile}>
                    {convertToPersianDigits(mobile)}
                      <svg className="w-3 h-4 text-black -rotate-90">
                        <use href="#up-arrowKey" />
                      </svg>
                      </a>
                    <a className="cursor-pointer hover:bg-gray-100 text-lg p-4 transition-colors  w-full border-b border-b-gray-200 flex justify-end items-center gap-2 flex-row-reverse" onClick={handleShoppingCard}>
                      سبد خرید
                      <svg className="w-6 h-6 text-black">
                        <use href="#shoppingCard-icon" />
                      </svg>
                      </a>
                    <a 
                    onClick={() => setModalType('logout')}
                    className="cursor-pointer
                     hover:bg-gray-100 text-lg p-4 transition-colors  w-full flex justify-end items-center gap-2 flex-row-reverse" >
                      خروج از حساب
                      <svg className="w-6 h-6 text-black rotate-180">
                        <use href="#login-icon" />
                      </svg>
                      </a>
                  </div>
                </>
              ) : (
                <div className="flex flex-row-reverse justify-center items-center gap-2">
                  ورود | ثبت‌نام
                  <svg className="w-7 h-7 text-black">
                    <use href="#login-icon" />
                  </svg>
                </div>
              )}
            </div>

            {/* shopping card */}
            <div className="mr-10 lg:flex hidden cursor-pointer" onClick={handleShoppingCard}>
              <svg className="w-7 h-7 text-black">
                <use href="#shoppingCard-icon" />
              </svg>
            </div>
          </div>

        </div>
    </div>
    {/* main menu */}
    <nav className="flex items-center flex-wrap justify-between bg-neutral-000 px-4 grow flex-col">
        <div className="flex max-w-screen-xl w-full container-4xl-w mx-auto relative justify-between lg:px-4 grow">
            <div className="lg:flex hidden justify-center items-center gap-3 text-sm ">
                {/* category */}
                <div className="cursor-pointer flex gap-1 items-center justify-center group relative">
                    <svg className="w-7 h-7 text-black">
                        <use href="#hamburger-icon"/>
                    </svg>

                <div className="relative">
                  <span className="text-base cursor-pointer">
                   دسته بندی کالا
                  </span>
                  <div className="absolute top-6 -right-8 bg-neutral-50 h-[500px] px-2 hidden group-hover:flex w-full max-w-screen-xl min-w-[1000px] shadow-lg z-50">
                              <div className="flex w-full h-full">
                                {/* right side */}
                                <div dir="ltr" className="flex-col py-5 overflow-auto border-l border-l-neutral-200 w-72">
                                  {menu.map((item, index) => (
                                    <a
                                      key={index}
                                      onMouseEnter={() => setActiveItem(item)}
                                      className={`w-full flex items-center py-3 px-1 cursor-default hover:bg-neutral-100 group ${activeItem?.id === item.id ? "bg-neutral-100 " : ""}`}

                                    >
                                      <span className={`w-full h-full flex items-center flex-row-reverse gap-2 text-black hover:text-red-600 ${activeItem?.id === item.id ? "text-red-500 " : ""}`}>
                                        <div>
                                          <svg className="w-[18px] h-[18px]">
                                            <use href={`#${item.icon}`}></use>
                                          </svg>
                                        </div>
                                        <p className="text-sm text-right">{item.title}</p>
                                      </span>
                                    </a>
                                  ))}
                                </div>

                                {/* left side */}
                                <div className="flex-col w-full overflow-auto px-4 py-5">
                                {activeItem && (
                                          <>
                                            {/* Main category title */}
                                            {/* <div className="flex flex-col gap-2 mb-2">
                                              <Link
                                                to={`/category/${activeItem.id}`}
                                                className="text-sm font-bold text-gray-900 hover:text-red-600 cursor-pointer flex items-center gap-2"
                                              >
                                                همه محصولات {activeItem.title}
                                              </Link>
                                            </div> */}
                                            <div className="grid grid-cols-3 gap-6 w-full items-start justify-start">
                                            {/* Child categories */}
                                            {activeItem.children?.map((child, index) => (
                                              <div
                                                key={index}
                                                className={`flex flex-col shrink ${
                                                  child.children?.length ? "gap-2" : "gap-0"
                                                }`}
                                              >
                                                {/* Child title */}
                                                <a
                                                  onClick={() => {
                                                     navigate(`/search/${encodeURIComponent(child.title)}`);
                                                  }}
                                                  className="text-sm font-medium flex justify-start items-center gap-1 text-gray-800 hover:text-red-600 cursor-pointer"
                                                >
                                                  <div className="text-red-500 hidden md:block">|</div>
                                                  {child.title}
                                                  <svg className="w-3 h-6">
                                                    <use href="#left-arrowKey"></use>
                                                  </svg>
                                                </a>

                                                {/* Sub-child links */}
                                                {child.children?.length > 0 && (
                                                  <div className="pl-2 flex flex-col gap-1">
                                                        {child.children.map((subChild, subIndex) => {
                                                          return (
                                                            <a
                                                              key={subIndex}
                                                              onClick={() => {
                                                                navigate(`/search/${encodeURIComponent(subChild.title)}`);
                                                              }}
                                                              className="text-sm text-gray-600 hover:text-red-500 cursor-pointer"
                                                            >
                                                              {subChild.title}
                                                            </a>
                                                          );
                                                        })}

                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                          </>
                                        )}

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
            <div className="px-3 py-1 lg:bg-[#fff4ea] rounded-full cursor-pointer ">
                <a href="#" className="decoration-0 flex items-center justify-between gap-2">
                    <svg className="lg:w-7 w-4 lg:h-7 h-4 text-black lg:text-[#f57f17]">
                        <use href="#location-icon"/>
                    </svg>
                    <p className="text-xs font-normal text-black flex justify-center items-center gap-2 lg:hidden">
                      انتخاب استان و شهر
                    <svg className="w-2 h-2 text-black">
                      <use href="#left-arrowKey"></use>
                    </svg>
                      </p>
                    <p className="text-xs lg:font-bold text-black hidden lg:block lg:text-[#f57f17]">شهر خود را انتخاب کنید</p>
                </a>
            </div>

            {modalType === 'logout' && (
                    <SpecificModal onClose={() => setModalType(null)} action={handleLogout} icon="exitdoor-icon" text="از حساب کاربری خارج می‌شوید؟" btnText="خروج از حساب کاربری" />
                  )}
        </div>
    </nav>

</header>
    )
}





