import { useContext, useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../../AuthContext';
import { registerUser } from '../../services/login';
import moment from 'moment-jalaali';
import SpecificModal from '../modal/specificModal';
export default function EditProfile({ onClose,profile = {} }) {
  const { mobile } = useContext(AuthContext);
  const [modal, setModal] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    nationalcode: '',
    password: '',
    dateofbirth:'',
  });

  useEffect(() => {
    setFormData({
      firstname: profile.firstname || '',
      lastname: profile.lastname || '',
      email: profile.email || '',
      nationalcode: profile.nationalcode || '',
      password: profile.password || '',
      dateofbirth: profile.dateofbirth
        ? moment(profile.dateofbirth).format('YYYY-MM-DD')
        : '',
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'نام الزامی است';
    if (!formData.lastname.trim()) newErrors.lastname = 'نام خانوادگی الزامی است';
    if (!formData.password.trim()) newErrors.password = 'رمز عبور الزامی است';
    if (!formData.nationalcode.trim()) newErrors.nationalcode = 'کد ملی الزامی است';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = useMemo(() => validate(), [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await registerUser({ mobile, ...formData });
      setModal({
        text: "پروفایل با موفقیت ثبت شد!",
        btnText:'باشه',
        onClose: onClose, 
      });
    } catch (error) {
      setModal({
        text: "خطا در ثبت اطلاعات",
        btnText:'باشه',
        onClose: () => setModal(null),
      });
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">ویرایش پروفایل</h2>
          <button onClick={onClose} className="cursor-pointer">
            <svg className="w-5 h-5 text-gray-700">
              <use href="#cross-icon" />
            </svg>
          </button>
        </div>

        <form className="max-w-md mx-auto mt-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
                placeholder=" "
                required
                value={formData.firstname}
                onChange={handleChange}
              />
              <label htmlFor="firstname" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                نام :*
              </label>
              {errors.firstname && <p className="text-sm text-red-600 mt-1">{errors.firstname}</p>}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
                placeholder=" "
                required
                value={formData.lastname}
                onChange={handleChange}
              />
              <label htmlFor="lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                نام خانوادگی :*
              </label>
              {errors.lastname && <p className="text-sm text-red-600 mt-1">{errors.lastname}</p>}
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-950 peer"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              ایمیل :
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
              placeholder=" "
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              رمز عبور :*
            </label>
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="nationalcode"
              id="nationalcode"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
              placeholder=" "
              required
              value={formData.nationalcode}
              onChange={handleChange}
            />
            <label htmlFor="nationalcode" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              کد ملی :*
            </label>
            {errors.nationalcode && <p className="text-sm text-red-600 mt-1">{errors.nationalcode}</p>}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-950 peer"
              placeholder=" "
            />
            <label htmlFor="dateofbirth" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              تاریخ تولد :
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`text-white float-end bg-[#ef4056] ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          >
            تایید
          </button>
        </form>

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
