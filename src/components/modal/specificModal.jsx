
export default function SpecificModal({ icon , text , onClose ,btnText ,action }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(action)
    {
      await action();
    }     
    onClose(); 
  };
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{text}</h2>
            <button onClick={onClose} className="cursor-pointer">
              <svg className="w-5 h-5 text-gray-700">
                <use href="#cross-icon" />
              </svg>
            </button>
          </div>
          {icon && (
            <div className="flex justify-center items-center my-7">
              <svg className="w-25 h-25 text-gray-700">
                <use href={`#${icon}`} />
              </svg>
            </div>
          )}
        <form className="max-w-md mx-auto mt-6" onSubmit={handleSubmit}>
          <button type="submit" className="text-white cursor-pointer hover:bg-red-700 float-end bg-[#ef4056] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">{btnText}</button>
        </form>
        </div>
      </div>
    );
  }
  