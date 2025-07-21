import axios from "axios";

export const handlePayment = async (price) => {
  try {
    const response = await axios.post(
      "https://sandbox.zarinpal.com/pg/rest/WebGate/PaymentRequest.json",
      {
        merchant_id: "zarinpal-sandbox",
        amount: price,
        callback_url: "http://localhost:3000/verify",
        description: "سفارش تستی از زرین‌پال",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = response;
    if (data.code === 100) {
      const authority = data.authority;
      window.location.href = `https://sandbox.zarinpal.com/pg/StartPay/${authority}`;
    } else {
      console.error("کد ناموفق:", data.code, data.errors);
    }
  } catch (error) {
    console.error("خطا در اتصال به زرین‌پال:", error);
  }
};
