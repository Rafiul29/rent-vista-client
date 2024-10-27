const token = localStorage.getItem("authToken");
const userId = localStorage.getItem("userId");

if (!userId && !token) {
  window.Location.href = "login.html";
}

const getParams = () => {
  const param = new URLSearchParams(window.location.search).get("advertiseId");
  return param;
};

const loadData = () => {
  const id = getParams();
  fetch(`${BASE_URL}/advertisement/list/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

const handleMakePayment = (event) => {
  event.preventDefault();
  const form = document.getElementById("payment-information-form");
  const formData = new FormData(form);

  const makePaymentData = {
    cus_name: formData.get("cus_name"),
    cus_email: formData.get("cus_email"),
    cus_phone: formData.get("cus_phone"),
    cus_add1: formData.get("cus_add1"),
    cus_city: formData.get("cus_city"),
    cus_country: formData.get("cus_country"),
  };

  fetch("https://rent-vista.vercel.app/payment/create_payment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      total_amount: 100.26,
      currency: "BDT",
      tran_id: "12345",
      success_url: "https://rent-vista-client-eta.vercel.app/index.html",
      fail_url: "your fail url",
      cancel_url: "your cancel url",
     ...makePaymentData
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.url) {
        // Redirect to payment gateway
        window.location.href = data.url;
      } else {
        console.error("Payment initiation failed:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

loadData();
