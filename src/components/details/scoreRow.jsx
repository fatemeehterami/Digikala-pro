export default function ScoreRow({ score , comments ,questions,onTabChange   }) {
  
  const handleCommentsClick = () => {
    onTabChange("comments");
  };

  const handleQuestionsClick = () => {
    onTabChange("questions");
  };    

  return (
        <div className="flex justify-start items-center gap-2 w-full">
             {score ?
             <>
             <svg className="w-4 h-4">
                  <use href="#star-icon"></use>
            </svg>
            <span className="text-xs flex justify-center items-center">{score}</span>
            </> : <>
             <svg className="w-4 h-4">
                  <use href="#star-icon"></use>
            </svg>
            <span className="text-xs flex justify-center items-center">امتیازی یافت نشد</span>
            </>}
            {comments && <div onClick={handleCommentsClick} className="cursor-pointer bg-gray-200 rounded-full py-1 px-3 flex justify-center items-center gap-1">
              <span className="text-xs">{comments.toLocaleString("fa-IR")} دیدگاه
              </span>
              <svg className="w-2 h-2 text-black">
                <use href="#left-arrowKey"></use>
              </svg>
            </div>}
            {questions &&<div onClick={handleQuestionsClick} className="cursor-pointer bg-gray-200 rounded-full py-1 px-3 flex justify-center items-center gap-1">
              <span className="text-xs">{questions.toLocaleString("fa-IR")} پرسش</span>
              <svg className="w-2 h-2 text-black">
                <use href="#left-arrowKey"></use>
              </svg>
            </div>}
        </div>
      );
    }
    