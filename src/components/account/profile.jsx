import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { logout as apiLogout } from '../../services/login'; 
import { AuthContext } from "../../AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { mobile, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!mobile) {
      navigate("/user/login", { replace: true });
    }
  }, [mobile, navigate]);

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("مشکل در خروج از حساب:", err.message);
    }
    logout();
    navigate("/", { replace: true });
  };

  return (
    // تغییرات دیزایینی
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-2xl font-bold">پروفایل</h1>
      <p className="text-lg">شماره موبایل: {mobile}</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        خروج از حساب
      </button>
    </div>
  );
}
