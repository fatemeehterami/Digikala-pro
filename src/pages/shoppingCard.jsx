import { useEffect, useState } from "react";

export default function ShoppingCard() {
  const [cart, setCart] = useState([]);

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
      <div className="max-w-screen-xl my-2 flex flex-col mx-auto w-full px-5 h-full">
        <p>سبد خرید شما خالی است.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl my-2 flex flex-col mx-auto w-full px-5 h-full">
      <div className="flex justify-start items-center gap-2">
        <p>سبد خرید شما</p>
        <p>{cart.length} مرسوله</p>
      </div>
      {cart.map((item, index) => (
        <div key={index} className="flex justify-start items-center gap-2">
          <div className="w-12 h-12">
            <img src={item.img || "/default-img.png"} alt="product" className="w-full h-full" />
          </div>
          <div className="flex flex-col gap-1">
            <p>{item.color}</p>
            <p>{item.warranty || "بدون گارانتی"}</p>
            <p>قیمت: {(item.price / 10).toLocaleString("fa-IR")} تومان</p>
            <p>تعداد: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
