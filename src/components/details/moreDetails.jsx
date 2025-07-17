import { useState } from "react";

export default function MoreDetails({description , comments ,questions}) {
  const [activeTab, setActiveTab] = useState("description");
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="text-sm font-medium text-center text-gray-500 ">
      <ul className="flex flex-wrap -mb-px justify-start border-b border-gray-200">
        {["description", "comments", "questions"].map((tab) => (
          <li key={tab} className="me-2">
            <button
              onClick={() => setActiveTab(tab)}
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === tab
                  ? "text-[#ef4056] border-[#ef4056]"
                  : "border-transparent hover:text-red-300 hover:border-red-300"
              }`}
            >
              {tab === "description"
                ? "معرفی"
                : tab === "comments"
                ? "دیدگاه ها"
                : "پرسش ها"}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right px-6">
      {activeTab === "description" && (
          <div>
            <h3 className="font-extrabold mb-6 text-black border-b-4 w-1/5 border-[#ef4056] py-3">
              معرفی
            </h3>
            <p className={`${!isExpanded ? "line-clamp-3" : ""}`}>{description}</p>
            <button
              className="text-left text-cyan-500 text-sm py-5 flex justify-start gap-2 items-center"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "بستن" : "بیشتر"}
              <svg
                className='w-3 h-4 text-cyan-500 transition-transform duration-300'
              >
                <use href="#left-arrowKey"></use>
              </svg>
            </button>
          </div>
        )}
        {activeTab === "comments" && (
          <div>
            <h3 className="font-bold mb-2">دیدگاه‌ها</h3>
            <p>لیست نظرات کاربران در این قسمت نشون داده میشه.</p>
          </div>
        )}
        {activeTab === "questions" && (
          <div>
            <h3 className="font-bold mb-2">پرسش‌ها</h3>
            <p>سوالات رایج کاربران و پاسخ‌ها رو می‌تونی اینجا قرار بدی.</p>
          </div>
        )}
      </div>
    </div>
  );
}
