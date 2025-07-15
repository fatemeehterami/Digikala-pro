import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyCode } from '../../services/login';

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = location.state?.mobile;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await verifyCode(mobile, code);
      navigate('/');
    } catch (err) {
      alert(err.message || "کد اشتباه است");
    }
  };

  return (
    <div className="...">
      <p>کد ارسال‌شده به {mobile} را وارد کنید</p>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="کد تأیید"
          className="..."
          required
        />
        <button type="submit" className="...">تأیید</button>
      </form>
    </div>
  );
}
