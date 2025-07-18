import { useState,forwardRef } from "react";
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const MoreDetails = forwardRef(({ description, comments, questions, activeTab, onTabChange }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  function convertToPersianDigits(str) {
    return str.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  }
  return (
    <div className="text-sm font-medium text-center text-gray-500 mb-5" ref={ref}>
      <ul className="flex flex-wrap -mb-px justify-start border-b border-gray-200">
        {["description", "comments", "questions"].map((tab) => (
          <li key={tab} className="me-2">
          <button
            onClick={() => onTabChange(tab)}
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
      {description ?
      (<>
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
       </>):
       <p>توضیحاتی وجود ندارد.</p>}
          </div>
        )}
      {activeTab === "comments" && (
          <div>
            <h3 className="font-extrabold mb-6 text-black border-b-4 w-1/5 border-[#ef4056] py-3">
            دیدگاه‌ها
            </h3>
            {comments ? 
            <>
            {comments?.latest_comments?.map((comment , index)=>{
              return(
                <div key={index} className="flex flex-col gap-2 border-b border-b-gray-200 py-3">
                  <div className="flex justify-start items-center gap-3">
                  {comment.user_name && 
                  <p className="text-xs text-gray-400">{comment.user_name}</p>
                  }
                  {comment.is_buyer && 
                  <p className="py-1 px-2 bg-green-100 text-green-700 rounded-2xl text-xs">خریدار</p>
                  }
                  {comment.created_at && (
                    <p>{moment(comment.created_at).format("jD jMMMM jYYYY")}</p>
                  )}
                  </div>
                  {typeof comment.rate === "number" &&
                    <div className="flex justify-start items-center">
                      {Array.from({ length: comment.rate }).map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-500">
                          <use href="#starFill"></use>
                        </svg>
                      ))}
                    </div>
                  }
                  <p className="text-gray-900">
                    {comment.body}
                    </p>
                </div>
              )
            })}
             {comments?.top_media_comments?.map((comment , index)=>{
              return(
                <div key={index} className="flex flex-col gap-2 border-b border-b-gray-200 py-3">
                  <div className="flex justify-start items-center gap-3">
                  {comment.user_name && 
                  <p className="text-xs text-gray-400">{comment.user_name}</p>
                  }
                  {comment.is_buyer && 
                  <p className="py-1 px-2 bg-green-100 text-green-700 rounded-2xl text-xs">خریدار</p>
                  }
                  {comment.created_at && (
                    <p>{moment(comment.created_at).format("jD jMMMM jYYYY")}</p>
                  )}
                  </div>
                  {typeof comment.rate === "number" &&
                    <div className="flex justify-start items-center">
                      {Array.from({ length: comment.rate }).map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-500">
                          <use href="#starFill"></use>
                        </svg>
                      ))}
                    </div>
                  }
                  <p className="text-gray-900">
                    {comment.body}
                  </p>
                {comment.reactions &&
                  <div className="flex justify-end items-center gap-3 ">
                    <p className="flex justify-center items-center gap-2 ">
                    <svg className="w-5 h-5 ">
                      <use href="#like-icon" />
                    </svg>
                    {typeof comment.reactions.likes == "number" ?
                      comment.reactions.likes.toLocaleString("fa-IR")
                        :
                      (0).toLocaleString("fa-IR")
                    }
                    </p>
                    <p className="flex justify-center items-center gap-2 "> 
                    <svg className="w-5 h-5  rotate-180">
                      <use href="#like-icon" />
                    </svg>
                    {typeof comment.reactions.dislikes == "number" ?
                      comment.reactions.dislikes.toLocaleString("fa-IR")
                        :
                      (0).toLocaleString("fa-IR")
                    }
                    </p>
                  </div> 
                }
                </div>
              )
          })}</>
          : 
          <p>دیدگاهی ثبت نشده است.</p> }
          </div>
        )}
      {activeTab === "questions" && (
          <div>
            <h3 className="font-extrabold mb-6 text-black border-b-4 w-1/5 border-[#ef4056] py-3">
              پرسش‌ها  
            </h3>
          {questions ?
          <>
          {questions?.latest_questions?.map((question , index)=>{
            return(
              <div key={index} className="flex flex-col gap-2 border-b border-b-gray-200 py-3">
                <div className="flex justify-start items-center gap-3">
                {question.sender && 
                <p className="text-xs text-gray-400">{question.sender}</p>
                }
                {question.created_at && (
                  <p>{convertToPersianDigits(question.created_at)}</p>
                )}
                </div>
                <p className="text-gray-900">
                  {question.text}
                </p>
                {question?.last_answer &&
                  <div className="px-3">
                    <div className="flex gap-1 justify-start items-center text-cyan-500 mb-2">
                      <p className="">پاسخ</p>
                      <svg className="w-3 h-2 -rotate-90">
                        <use href="#up-arrowKey" />
                      </svg>  
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="px-3">{question?.last_answer?.text}</p>
                      <p className="px-3 text-[12px]">{question?.last_answer?.sender}</p>
                    </div>
                  </div>
                }
              </div>
            )
          })}</>
        : 
        <p>پرسشی ثبت نشده است .</p> }
        </div>
        )}
      </div>
    </div>
  );
});

export default MoreDetails;