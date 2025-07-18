import { useNavigate } from 'react-router-dom';
import { useState, useContext,useEffect } from 'react';
import { AuthContext } from "../../AuthContext";
import EditProfile from './editProfile';
import { getUserProfile } from '../../services/login';
import SpecificModal from '../modal/specificModal';
import moment from 'moment-jalaali';
import { logout as apiLogout } from '../../services/login';
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
export default function Profile() {
  const navigate = useNavigate();
  const { mobile ,logout } = useContext(AuthContext);
  const [modalType, setModalType] = useState(null);
  const [profile, setProfile] = useState({});

  const convertToPersianDigits = (str) => {
    if (!str) return '';
    return str.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile(mobile);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (mobile) {
      fetchData();
    }
  }, [mobile, modalType]);
  const handleLogout = async () => {
    setModalType(null);
    setTimeout(async () => {
      try {
        await apiLogout();
      } catch (err) {
        console.warn("error on logout:", err.message);
      }
      logout();
      navigate("/", { replace: true });
    }, 200);
  };
  const handleShoppingCard = () => {
    navigate('/shopping-card');
};
  return (
    <div className='lg:border flex flex-col lg:border-gray-200 max-w-screen-xl mx-auto p-2 lg:rounded-2xl my-10 lg:shadow-xl'>
      <div className='w-full flex justify-between p-5'>
        <p className='text-2xl font-bold'>پروفایل شما :</p>
        <div className='flex flex-row-reverse gap-3'>
        <svg className="w-7 h-7 text-black cursor-pointer"
        onClick={() => setModalType('edit')}>
          <use href="#edit-icon" />
        </svg>
        <svg className="w-7 h-7 text-black cursor-pointer flex lg:hidden"
        onClick={handleShoppingCard}>
          <use href="#shoppingCard-icon" />
        </svg>
        <svg className="w-7 h-7 text-black cursor-pointer rotate-180 flex lg:hidden"
        onClick={() => setModalType('logout')}>
          <use href="#login-icon" />
        </svg>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-200'>
       <div className='flex flex-col justify-start items-start divide-y divide-gray-200 w-full px-4'>
          <div className='flex justify-between flex-col gap-3 items-start w-full py-5'>
            <p className='font-semibold text-lg'>نام و نام خانوادگی</p>
            <div className='flex gap-2'>
            <p>{profile.firstname}</p><p>{profile.lastname}</p>
            </div>
          </div>
          <div className='flex justify-between flex-col gap-3 items-start w-full py-5'>
            <p className='font-semibold text-lg'>شماره موبایل</p>
            <p>{convertToPersianDigits(mobile)}</p>
          </div>
          <div className='flex justify-between flex-col gap-3 items-start w-full py-5'>
            <p className='font-semibold text-lg'>رمز عبور</p>
            <p>{!profile.password ? 'وارد نشده است.' : '********'}</p>
          </div>
       </div>
       <div className='flex flex-col justify-start items-start divide-y divide-gray-200 w-full px-4'>
          <div className='flex justify-between flex-col gap-3 items-start w-full py-5'>
            <p className='font-semibold text-lg'>کدملی</p>
            <p>{convertToPersianDigits(profile.nationalcode)}</p>
          </div>
          <div className='flex justify-between flex-col gap-3 items-start w-full py-5'>
            <p className='font-semibold text-lg'>تاریخ تولد</p>
            <p>{!profile.dateofbirth ? 'وارد نشده است.' : moment(profile.dateofbirth).format('jYYYY/jMM/jDD')}</p>
          </div>
          <div className='flex justify-between flex-col gap-3 items-start w-full py-5'>
            <p className='font-semibold text-lg'>ایمیل</p>
            <p>{!profile.email ? 'وارد نشده است.' : profile.email}</p>
          </div>
       </div>
      </div>
      {modalType === 'edit' && (
        <EditProfile onClose={() => setModalType(null)} profile={profile} />
      )}
      {modalType === 'logout' && (
        <SpecificModal onClose={() => setModalType(null)} action={handleLogout} icon="exitdoor-icon" text="از حساب کاربری خارج می‌شوید؟" btnText="خروج از حساب کاربری" />
      )}
    </div>
  );
}
