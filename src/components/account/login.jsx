import { useNavigate } from 'react-router-dom';
import { sendVerificationCode } from '../../services/login';
import { useState } from 'react';
export default function Login(){
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await sendVerificationCode(mobile);
          navigate('/verify', { state: { mobile } });
        } catch (err) {
          alert(err.message || "خطا در ارسال کد");
        }
      };
    const handleGoBack = () => {
        navigate(-1); 
      };
    return(
        <div className="w-2/5 mx-auto flex flex-col justify-center items-center h-screen">
            <div className="border border-gray-200 flex flex-col rounded-2xl px-10 py-3">
                <div role="button" onClick={handleGoBack} className='cursor-pointer'>
                    <svg className="w-8 h-8 text-gray-500">
                        <use href="#previousPage-icon"></use>
                    </svg>
                </div>
                <div className="flex w-full justify-center
                 items-center mb-5">
                    <svg className="w-36">
                        <use href="#login-logo"></use>
                    </svg>
                </div>
                <div className="flex flex-col justify-center items-start gap-5">
                    <p className='text-2xl font-bold py-3'>ورود | ثبت‌نام</p>
                    <p>سلام!</p>
                    <p> لطفا شماره موبایل خود را وارد کنید.</p>
                    <form className=" w-full" onSubmit={handleSubmit}>
                    <div className="">
                        <input type="text" id="default-mobile" className="block w-full p-5 ps-5 text-sm text-gray-900 border border-blue-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="شماره موبایل" required />
                    </div>
                    <button type='submit' className="w-full bg-[#ef4056] text-white font-bold text-sm p-5 rounded-lg mt-10">
                       ورود</button>
                    </form>
                <p className='text-center text-sm w-full my-5'>ورود شما به معنای پذیرش شرایط دیجی‌کالاوقوانین حریم‌خصوصی است.</p>
                </div>
            </div>
        </div>
    )
}