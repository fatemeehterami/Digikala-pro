import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import SpecificModal from '../components/modal/specificModal';
export default function ShoppingCard() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const navigate = useNavigate()
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const existingAddress = localStorage.getItem("address");
    if (existingAddress) {
      setAddress(existingAddress);
    } else {
      setAddress(""); 
    }
  }, []);

  useEffect(() => {
    let existingCart = JSON.parse(localStorage.getItem("cart"));
    if (!existingCart) {
      existingCart = [];
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
    setCart(existingCart);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="max-w-screen-xl my-2 flex flex-col mx-auto w-full px-5 h-full p-5 lg:border-gray-200 lg:border rounded-lg">
        <p>سبد خرید شما خالی است.</p>
      </div>
    );
  }

  const isValid = () => {
    if (!address || !address.trim()) {
      setModal({
        text: "لطفا برای تکمیل سفارش، آدرس را ثبت کنید.",
        btnText: "باشه",
        onClose: () => setModal(null),
      });
    } else{
      setModal({
        text: "درگاه پرداخت به زودی فعال میشود",
        btnText: "باشه",
        onClose: () => setModal(null),
      });
    }
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    const currentQty = newCart[index].quantity || 1;
    const limit = newCart[index].limit || Infinity;
  
    if (currentQty < limit) {
      newCart[index].quantity = currentQty + 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  
  
  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    const currentQty = newCart[index].quantity || 1;
  
    if (currentQty > 1) {
      newCart[index].quantity = currentQty - 1;
    } else {
      newCart.splice(index, 1);
    }
  
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  
  const totalMainPrice = cart.reduce((sum, item) => sum + (item.mainPrice * (item.quantity || 1)), 0);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  
  const totalDiscount = cart.reduce((sum, item) => {
    const main = item.mainPrice || item.price;
    return sum + ((main - item.price) * (item.quantity || 1));
  }, 0);
  
  const totalInsurance = cart.reduce((sum, item) => {
    return sum + ((item.insurance || 0) * (item.quantity || 1));
  }, 0);
  
  const totalPayable = totalPrice + totalInsurance;
  const handleItem =(id)=>{
    navigate(`/product/details/${id}`)
  }

  return (
    <div className="flex justify-between lg:flex-nowrap flex-wrap gap-3 items-start max-w-screen-xl mx-auto w-full h-full p-5 pb-28">

    <div className=" flex flex-col px-5 w-full lg:w-3/4 gap-4 h-full border-gray-200 border rounded-lg divide-y divide-gray-200">
      <div className="flex justify-start items-center gap-2  py-4">
        <p className="text-base text-gray-400">سبد خرید شما :</p>
        <p className="text-base">{cart.length.toLocaleString('fa-IR')} مرسوله</p>
      </div>
      {cart.map((item, index) => (
        <div key={index} className="flex justify-start items-center gap-3 py-4 " >
          <div className="w-28 h-28 cursor-pointer"onClick={() => handleItem(item.id)}>
            <img src={item.img || "/default-img.png"} alt="product" className="w-full h-full" />
          </div>
          <div className="flex flex-col gap-1">
            <p>{item.color}</p>
            <p>{item.warranty || "بدون گارانتی"}</p>
            <p>قیمت: {(item.price / 10).toLocaleString("fa-IR")} تومان</p>
          {item.discount && item.mainPrice && (
            <p className="text-red-600">
              تخفیف: {((item.mainPrice - item.price) * item.quantity / 10).toLocaleString("fa-IR")}  تومان
            </p>
          )}
          {item.insurance && (
            <p className="text-cyan-600">
              بیمه: {(item.insurance/10).toLocaleString("fa-IR")}  تومان
            </p>
          )}
            <div className="flex mt-3 justify-between items-center w-28 p-2 border border-red-500 rounded-lg">
              <button className={`cursor-pointer text-lg text-bold px-2 ${cart[index].quantity >= cart[index].limit ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => increaseQuantity(index)}
                disabled={cart[index].quantity >= cart[index].limit}>
                +
              </button>
              <p>{item.quantity}</p>
              <button className="cursor-pointer text-lg text-bold px-2"  onClick={() => decreaseQuantity(index)}>
                -
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="lg:w-1/4 w-full gap-3 flex flex-col">
      <div className="flex flex-col justify-center items-start border-gray-200 border px-5 rounded-lg gap-2  py-3">
        <p>آدرس:</p>
        <p>{address?.trim() ? address : 'لطفا آدرس را از صفحه پروفایل وارد نمایید.'}</p>
      </div>
      <div className="border-gray-200 border rounded-lg px-5 ">
        <div className="flex justify-between items-center gap-2  py-3">
          <p className="text-sm text-gray-400 font-bold">قیمت کالاها ({cart.length.toLocaleString('fa-IR')})</p>
          <p>{(totalMainPrice / 10).toLocaleString("fa-IR")} تومان</p>
        </div>
        {totalInsurance > 0 && (
          <div className="flex justify-between items-center gap-2  py-3">
            <p className="text-sm text-gray-400 font-bold">قیمت بیمه</p>
            <p>{(totalInsurance / 10).toLocaleString("fa-IR")} تومان</p>
          </div>
        )}
        <div className="flex justify-between items-center gap-2  py-3">
          <p className="text-sm text-gray-400 font-bold">جمع سبد خرید</p>
          <p>{(totalPayable / 10).toLocaleString("fa-IR")} تومان</p>
        </div>
        {totalDiscount > 0 && (
        <div className="flex justify-between items-center gap-2  py-3">
          <p className="text-sm text-gray-400 font-bold">سود شما از خرید</p>
          <p className="text-red-500">{(totalDiscount / 10).toLocaleString("fa-IR")} تومان</p>
        </div>
        )}
      <button onClick={isValid}
        className="w-full bg-[#ef4056] text-white font-bold text-sm py-4 px-4 rounded-lg cursor-pointer mb-3">
          تایید و تکمیل سفارش
        </button>
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
