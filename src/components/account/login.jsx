import { useNavigate } from 'react-router-dom';
import { checkMobile, sendVerificationCode } from '../../services/login';
import { useState } from 'react';
export default function Login(){
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');
    const [touched, setTouched] = useState(false);

    const getMobileError = () => {
        if (!mobile) return '';
        if (!mobile.startsWith('09')) return 'شماره موبایل باید با 09 شروع شود.';
        if (mobile.length < 11) return `شماره موبایل باید 11 رقم باشد. (${mobile.length}/11 وارد شده)`;
        if (mobile.length > 11) return 'شماره موبایل نباید بیشتر از 11 رقم باشد.';
        return '';
      };

    const isValidMobile = () => {
        const regex = /^09\d{9}$/;
        return regex.test(mobile);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidMobile()) {
            alert('شماره موبایل باید با 09 شروع شده و 11 رقم باشد');
            return;
          }
        try {
          const checkRes = await checkMobile(mobile);
          const mobileExists = checkRes.exists;
          const res = await sendVerificationCode(mobile);
          navigate('/user/verify', { state: { mobile ,mobileExists } });
        } catch (err) {
          alert(err.message || "خطا در ارسال کد");
        }
      };

    const handleGoBack = () => {
        navigate(-1); 
      };
      const handleGoHome = () => {
        navigate('/'); 
      };

    return(
        <div className="lg:w-1/4 w-full mx-auto flex flex-col justify-center items-center h-screen">
            <div className="lg:border w-full lg:border-gray-200 flex flex-col rounded-2xl px-10 py-3">
                <div role="button" onClick={handleGoBack} className='cursor-pointer'>
                    <svg className="w-8 h-8 text-gray-500">
                        <use href="#previousPage-icon"></use>
                    </svg>
                </div>
                <div className="flex w-full justify-center
                 items-center mb-5 cursor-pointer" onClick={handleGoHome}>
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
                        placeholder="شماره موبایل" required 
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val) && val.length <= 11) {
                              setMobile(val);
                              setTouched(true);
                            }
                          }}
                          />
                           {touched && getMobileError() && (
                                <p className="text-red-600 text-sm mt-3">{getMobileError()}</p>
                            )}
                    </div>
                    <button type='submit' className={`w-full text-white font-bold text-sm p-5 rounded-lg mt-10 ${
                        isValidMobile() ? 'bg-[#ef4056]' : 'bg-red-200 cursor-not-allowed'
                         }`}
                        disabled={!isValidMobile()}>
                       ورود</button>
                    </form>
                <p className='text-center text-sm w-full my-5'>ورود شما به معنای پذیرش شرایط دیجی‌کالاوقوانین حریم‌خصوصی است.</p>
                </div>
            </div>
        </div>
    )
}