
export default function Features({ attributes }) {
  return (
    <div className=" w-full flex flex-col border-t border-t-gray-200 lg:border-0 py-2 lg:py-0 justify-start items-start mb-3">
    {attributes &&
    <>
      <p className="text-lg text-black">ویژگی‌ها</p>
      <div className="mt-2 flex gap-2 w-full flex-wrap">
        {attributes?.map((item, index) => (
          <div key={index} className="flex flex-col bg-gray-200 gap-2 rounded-lg py-2 px-5 w-fit">
            <p className="text-sm text-gray-700">{item.title}</p>
            <p className="text-sm text-black">{item.values}</p>
          </div>
        ))}
      </div>
      {/* <div className="w-full flex justify-center items-center my-5">
        <button type="button" className="py-2 px-5 flex gap-3 cursor-pointer justify-center items-center border border-gray-300 rounded-lg ">
          مشاهده همه ویژگی‌ها
          <svg className="w-3 h-3 text-black">
              <use href="#left-arrowKey"></use>
          </svg>
        </button>
      </div> */}
    </>
      }
    </div>
  );
}
