import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyCode } from '../../services/login';
import { AuthContext } from '../../AuthContext';
import SpecificModal from '../modal/specificModal';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { mobile, mobileExists } = location.state || {};
  const { login } = useContext(AuthContext);
  const [touched, setTouched] = useState(false);
  const [modal, setModal] = useState(null);

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoHome = () => {
    navigate('/');
  };
  const isValidCode = () => {
    return /^\d{6}$/.test(code);
  };

  const getCodeError = () => {
    if (!code) return '';
    if (code.length < 6) return `کد باید 6 رقم باشد. (${code.length}/6 وارد شده)`;
    if (code.length > 6) return 'کد نباید بیشتر از 6 رقم باشد.';
    if (!/^\d+$/.test(code)) return 'کد فقط باید شامل ارقام باشد.';
    return '';
  };

  const handleVerify = async (e) => {
    e.preventDefault();
        if (!isValidCode()) {
            setModal({
              text: 'کد باید دقیقا ۶ رقم و فقط عدد باشد.',
              btnText:'باشه',
              onClose: () => setModal(null)
            });
            return;
          }

    try {
      const res = await verifyCode(mobile, code);
      localStorage.setItem('token', res.token);

      login(mobile);

      navigate('/profile');
    } catch (err) {
      setModal({
        text: 'کد اشتباه است',
        btnText:'باشه',
        onClose: () => setModal(null)
      });
    }
  };

  if (!mobile) {
    return <p>شماره موبایل پیدا نشد. لطفا دوباره تلاش کنید.</p>;
  }

  return (
    <div className="lg:w-1/4 w-full mx-auto flex flex-col justify-center items-center h-screen">
      <div className="lg:border w-full lg:border-gray-200 flex flex-col rounded-2xl px-10 py-3">
        <div role="button" onClick={handleGoBack} className="cursor-pointer">
          <svg className="w-8 h-8 text-gray-500">
            <use href="#previousPage-icon"></use>
          </svg>
        </div>
        <div className="flex w-full justify-center items-center mb-5" onClick={handleGoHome}>
          <svg className="w-36">
            <use href="#login-logo"></use>
          </svg>
        </div>
        <div className="flex flex-col justify-center items-start gap-5">
          {mobileExists ? (
            <p className="leading-7">
              شماره موبایل <strong>{mobile}</strong> قبلا ثبت شده است. لطفا کد تایید ارسال شده را وارد کنید.
            </p>
          ) : (
            <p className="leading-7">
              حساب کاربری با شماره موبایل <strong>{mobile}</strong> وجود ندارد. برای ساخت حساب جدید، کد تایید برای این شماره ارسال گردید.
            </p>
          )}
          <form className="w-full" onSubmit={handleVerify}>
            <div className="">
              <input
                type="text"
                id="default-mobile"
                className="block w-full p-5 ps-5 text-sm text-gray-900 border border-blue-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={code}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val) && val.length <= 6) {
                    setCode(val);
                    setTouched(true);
                  }
                }}
                placeholder="کد تایید"
                required
              />
                           {touched && getCodeError() && (
                                <p className="text-red-600 text-sm mt-3">{getCodeError()}</p>
                            )}
            </div>
            <button type='submit' className={`w-full text-white font-bold text-sm p-5 rounded-lg mt-10 ${
                        isValidCode() ? 'bg-[#ef4056]' : 'bg-red-200 cursor-not-allowed'
                         }`}
                        disabled={!isValidCode()}>
                       تایید</button>
          </form>
        </div>
        {modal && (
              <SpecificModal
                text={modal.text}
                btnText={modal.btnText}
                onClose={modal.onClose}
              />
           )}
      </div>
    </div>
  );
}
