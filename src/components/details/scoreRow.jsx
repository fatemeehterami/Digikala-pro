export default function ScoreRow({ score , comments ,questions  }) {
      return (
        <div className="flex justify-start items-center gap-2 w-full">
            <svg className="w-4 h-4">
                  <use href="#star-icon"></use>
            </svg>
            {score && <span className="text-xs">{score}</span>}
            <div className="bg-gray-200 rounded-full py-1 px-3">
             {comments && <span className="text-xs">{comments.toLocaleString("fa-IR")} دیدگاه</span>}
            </div>
            <div className="bg-gray-200 rounded-full py-1 px-3">
             {questions && <span className="text-xs">{questions.toLocaleString("fa-IR")} پرسش</span>}
            </div>
        </div>
      );
    }
    