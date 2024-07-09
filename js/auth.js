const BASE_URL='http://127.0.0.1:8000'

const handleRegistration = (event) => {
  event.preventDefault()
  // console.log(BASE_URL)
  const form = document.getElementById('registration-form')
  const formData = new FormData(form)

  const registrationData = {
    username: formData.get('username'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
    role:'user'
  }
  
  if (registrationData.password === registrationData.confirm_password) {
    document.getElementById("error").innerText = "";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        registrationData.password
      )
    ) {
      console.log(registrationData);

      fetch(`${BASE_URL}/api/auth/register/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(registrationData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      document.getElementById("error").innerText =
        "pasword must contain eight characters, at least one letter, one number and one special character:";
    }
  } else {
    document.getElementById("error").innerText =
      "password and confirm password do not match";
  }
}
