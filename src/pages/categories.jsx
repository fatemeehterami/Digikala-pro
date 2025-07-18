import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMenuItem } from "../services/header";

export default function Categories() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const icons = [
    "mobile", "electronic", "electronic", "homeKitchen", "homeElectronic",
    "beauty", "vehicles", "tools", "fashion", "jewelry", "health",
    "bookStationary", "sportOutdoor", "giftCard", "fresh", "kidsToy", "nativeBusiness", "pinother"
  ];

  useEffect(() => {
    const getMenuItem = async () => {
      try {
        const data = await fetchMenuItem();
        if (data?.result?.length) {
          data.result.forEach((item, index) => {
            item.icon = icons[index];
          });
          setMenu(data.result);
        } else {
          console.warn("No result found in fetched data.");
        }
      } catch (err) {
        console.error(err);
      }
    };
    getMenuItem();
  }, []);

  const toggleDropdown = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const handleMainClick = (item) => {
    setActiveItem(prev => (prev?.id === item.id ? null : item));
    setOpenIndex(null);
  };

  useEffect(() => {
    if (menu.length > 0) {
      setActiveItem(menu[0]);
    }
  }, [menu]);

  return (
    <div className="h-[800px] px-2 w-full max-w-screen-xl shadow-lg z-50 block lg:hidden">
      <div className="flex w-full h-full">
        {/* Right Side */}
        <div dir="ltr" className="flex-col overflow-auto border-l divide-y divide-gray-200 border-l-neutral-100 w-32 bg-neutral-50">
          {menu.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMainClick(item)}
              className={`w-full h-24 flex items-center py-3 px-1 cursor-pointer justify-center group ${activeItem?.id === item.id ? "bg-white" : ""}`}
            >
              <span className={`w-full h-full flex-col flex justify-center items-center gap-2 text-black ${activeItem?.id === item.id ? "text-red-500" : ""}`}>
                <div>
                  <svg className="w-[18px] h-[18px]">
                    <use href={`#${item.icon}`}></use>
                  </svg>
                </div>
                <p className="text-xs text-center">{item.title}</p>
              </span>
            </div>
          ))}
        </div>

        {/* Left Side */}
        <div className="flex-col w-full overflow-auto px-4 py-1">
          {activeItem && (
            <>
              <div className="flex flex-col gap-2">
                <Link
                  to={`/category/${activeItem.id}`}
                  className="text-xs py-3 text-cyan-500 cursor-pointer flex items-center gap-2"
                >
                  همه محصولات {activeItem.title}
                </Link>
              </div>

              <div className="flex flex-col w-full items-start justify-start divide-y divide-gray-200">
                {activeItem?.children?.map((child, index) => (
                  <div
                    key={index}
                    className={`flex flex-col shrink w-full py-3 ${child.children?.length ? "gap-5" : "gap-0"}`}
                  >
                    {/* Child title */}
                    <div
                      onClick={() => {
                        if (child.children?.length) {
                          toggleDropdown(index);
                        } else {
                          navigate(`/search/${encodeURIComponent(child.title)}`);
                        }
                      }}
                      className="text-sm font-medium w-full flex justify-between items-center gap-2 text-gray-800 cursor-pointer"
                    >
                      {child.title}
                      {child.children?.length > 0 && (
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${openIndex === index ? "rotate-0" : "rotate-180"}`}
                        >
                          <use href="#up-arrowKey"></use>
                        </svg>
                      )}
                    </div>

                    {/* Sub-child items */}
                    {openIndex === index && (
                      <div className="grid grid-cols-3 gap-3 justify-center items-center text-caption text-neutral-900 text-center">
                        {child.children.map((subChild, subIndex) => (
                          <div key={subIndex} className="flex justify-start items-center flex-col h-28" onClick={() => navigate(`/search/${encodeURIComponent(subChild.title)}`)}>
                            <div className="relative flex items-center justify-center mb-2 rounded-full overflow-hidden w-16 h-16">
                              <img
                                src={subChild.image}
                                alt={subChild.title}
                                className="w-full h-full object-contain bg-neutral-100 p-2 rounded-full cursor-pointer"
                              />
                            </div>
                            <div className="text-xs text-gray-600 cursor-pointer">
                              {subChild.title}
                            </div>
                          </div>
                        ))}
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
  );
}
