import React, { useState, forwardRef, useEffect } from "react";
import moment from "moment-jalaali";
import { fetchSpecifications } from "../../services/details";
import { useParams } from "react-router-dom";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const MoreDetails = forwardRef(
  ({ description, comments, questions, activeTab, onTabChange }, ref) => {
    const [expandedSpecs, setExpandedSpecs] = useState({});
    const [specifications, setSpecifications] = useState(null);
    const [isExpandedDescription, setIsExpandedDescription] = useState(false);
    const { id } = useParams();

    function convertToPersianDigits(str) {
      return str.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
    }

    const toggleExpanded = (index) => {
      setExpandedSpecs((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };

    useEffect(() => {
      const getDetails = async () => {
        try {
          const response = await fetchSpecifications(id);
          setSpecifications(response.result);
        } catch (err) {
          console.error(err);
        }
      };

      getDetails();
    }, [id]);

    return (
      <div
        className="text-sm font-medium text-center text-gray-500 mb-5 lg:pb-0 pb-32"
        ref={ref}
      >
        <ul className="flex flex-wrap -mb-px justify-start border-b border-gray-200">
          {["description", "details", "comments", "questions"].map((tab) => (
            <li key={tab} className="me-2">
              <button
                onClick={() => onTabChange(tab)}
                className={`inline-block px-2 py-4 border-b-2 rounded-t-lg ${
                  activeTab === tab
                    ? "text-[#ef4056] border-[#ef4056]"
                    : "border-transparent hover:text-red-300 hover:border-red-300"
                }`}
              >
                {tab === "description"
                  ? "معرفی"
                  : tab === "details"
                  ? "مشخصات فنی"
                  : tab === "comments"
                  ? "دیدگاه ها"
                  : "پرسش‌ها"}
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

          {description ? (
            <>
              <p
                className={`text-sm text-gray-700 transition-all duration-300 ${
                  isExpandedDescription ? "" : "line-clamp-3"
                }`}
              >
                {description}
              </p>

              <button
                onClick={() => setIsExpandedDescription((prev) => !prev)}
                className="text-cyan-500 text-sm py-3 flex items-center gap-1"
              >
                {isExpandedDescription ? "بستن" : "بیشتر"}
                <svg
                  className={`w-3 h-4 text-cyan-500 transition-transform duration-300 transform ${
                    isExpandedDescription ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <use href="#left-arrowKey"></use>
                </svg>
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-500">توضیحاتی وجود ندارد.</p>
          )}
        </div>
      )}
        {activeTab === "details" && (
            <div>
              <h3 className="font-extrabold mb-6 text-black border-b-4 w-1/5 border-[#ef4056] py-3">
                مشخصات‌فنی
              </h3>
              {specifications ? (
                <>
                  {specifications.map((specification, index) => {
                    const isExpanded = expandedSpecs[index] || false;
                    const shownAttributes = isExpanded
                      ? specification.attributes
                      : specification.attributes?.slice(0, 3);

                    return (
                      <div key={index} className="mb-6">
                        <h4 className="text-lg font-bold text-gray-700 border-b border-gray-300 mb-2 pb-1">
                          {specification.title}
                        </h4>
                        <div className="grid grid-cols-2 gap-x-1 gap-y-2 text-sm">
                          {shownAttributes.map((attribute, i) => (
                            <React.Fragment key={i}>
                              <div className="text-gray-500">
                                {attribute.title}
                              </div>
                              <div className="text-gray-800">
                                {attribute.value || attribute.values || "—"}
                              </div>
                            </React.Fragment>
                          ))}
                        </div>

                        {specification.attributes.length > 3 && (
                          <button
                            onClick={() => toggleExpanded(index)}
                            className="text-left text-cyan-500 text-sm py-2 flex justify-start gap-2 items-center"
                          >
                            {isExpanded ? "بستن" : "بیشتر"}
                            <svg className="w-3 h-4 text-cyan-500 transition-transform duration-300">
                              <use href="#left-arrowKey"></use>
                            </svg>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <p>مشخصاتی وجود ندارد.</p>
              )}
            </div>
          )}

          {activeTab === "comments" && (
            <div>
              <h3 className="font-extrabold mb-6 text-black border-b-4 w-1/5 border-[#ef4056] py-3">
                دیدگاه‌ها
              </h3>
              {comments ? (
                <>
                  {[...(comments.latest_comments || []), ...(comments.top_media_comments || [])].map((comment, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 border-b border-b-gray-200 py-3"
                    >
                      <div className="flex justify-start items-center gap-3">
                        {comment.user_name && (
                          <p className="text-xs text-gray-400">{comment.user_name}</p>
                        )}
                        {comment.is_buyer && (
                          <p className="py-1 px-2 bg-green-100 text-green-700 rounded-2xl text-xs">
                            خریدار
                          </p>
                        )}
                        {comment.created_at && (
                          <p>{moment(comment.created_at).format("jD jMMMM jYYYY")}</p>
                        )}
                      </div>
                      {typeof comment.rate === "number" && (
                        <div className="flex justify-start items-center">
                          {Array.from({ length: comment.rate }).map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-500">
                              <use href="#starFill"></use>
                            </svg>
                          ))}
                        </div>
                      )}
                      <p className="text-gray-900">{comment.body}</p>
                      {comment.reactions && (
                        <div className="flex justify-end items-center gap-3">
                          <p className="flex items-center gap-2">
                            <svg className="w-5 h-5">
                              <use href="#like-icon" />
                            </svg>
                            {comment.reactions.likes?.toLocaleString("fa-IR") || "۰"}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-5 h-5 rotate-180">
                              <use href="#like-icon" />
                            </svg>
                            {comment.reactions.dislikes?.toLocaleString("fa-IR") || "۰"}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <p>دیدگاهی ثبت نشده است.</p>
              )}
            </div>
          )}

          {activeTab === "questions" && (
            <div>
              <h3 className="font-extrabold mb-6 text-black border-b-4 w-1/5 border-[#ef4056] py-3">
                پرسش‌ها
              </h3>
              {questions ? (
                <>
                  {questions.latest_questions.map((question, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 border-b border-b-gray-200 py-3"
                    >
                      <div className="flex justify-start items-center gap-3">
                        {question.sender && (
                          <p className="text-xs text-gray-400">{question.sender}</p>
                        )}
                        {question.created_at && (
                          <p>{convertToPersianDigits(question.created_at)}</p>
                        )}
                      </div>
                      <p className="text-gray-900">{question.text}</p>
                      {question.last_answer && (
                        <div className="px-3">
                          <div className="flex gap-1 justify-start items-center text-cyan-500 mb-2">
                            <p>پاسخ</p>
                            <svg className="w-3 h-2 -rotate-90">
                              <use href="#up-arrowKey" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="px-3">{question.last_answer.text}</p>
                            <p className="px-3 text-[12px]">
                              {question.last_answer.sender}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <p>پرسشی ثبت نشده است.</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default MoreDetails;