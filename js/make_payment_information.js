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
  const rentDetails=document.getElementById('rent-details');

  const advertisement = getParams();

  fetch(`${BASE_URL}/advertisement/list/${advertisement}/`)
    .then((res) => res.json())
    .then((data) => {
      rentDetails.innerHTML=`
      <p class="card-text ">${data.title}</p>
      <p class="card-text">Location: ${data.location}</p>
      <p class="card-text">Bedrooms: ${data.bedrooms}</p>
      <p class="card-text " >Amount: <span id="rent_price" class="text-primary">${data.price}</span> ৳</p>
      `
    });
};

const handleMakePayment = (event) => {
  event.preventDefault();
  const advertisement = getParams();
  const form = document.getElementById("payment-information-form");
  const price =document.getElementById('rent_price').innerHTML
  const formData = new FormData(form);

  const makePaymentData = {
    cus_name: formData.get("cus_name"),
    cus_email: formData.get("cus_email"),
    cus_phone: formData.get("cus_phone"),
    cus_add1: formData.get("cus_add1"),
    cus_city: formData.get("cus_city"),
    cus_country: formData.get("cus_country"),
  };
  // https://rent-vista.vercel.app/payment/create_payment/
  fetch("https://rent-vista.vercel.app/payment/create_payment/payment/create_payment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      total_amount: Number(price),
      advertisement:advertisement,
      user:userId,
      ...makePaymentData,
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
