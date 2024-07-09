fetch('navbar.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data
    // auth element
    let navElement = document.getElementById('menu-element');
    const token = localStorage.getItem('authToken')
    if (token) {
      navElement.innerHTML = `
          <li class="menu">
                    <a class="text-decoration-none text-black" href="all_advertisement.html">Rent</a>
          </li>
          <li class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton2"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Dashboard
                </button>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                    <li>
                        <a class="dropdown-item active" href="userDetails.html">Profile</a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="allAppointments.html">Favourite Rent</a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="allAppointments.html">Rent Post</a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="allAppointments.html">Rent Request</a>
                    </li>
                    <li onclick="handlelogOut()">
                        <a class="dropdown-item">Logout</a>
                    </li>
                </ul>
            </li>
  `
    } else {
      navElement.innerHTML = `
       <li class="menu">
                <a class="text-decoration-none text-black" href="all_advertisement.html">Rent</a>
            </li>
      <li class=" bg-primary px-3 py-2 rounded-3">
        <a class="text-decoration-none text-white" href="login.html">Login</a>
      </li>
      `;
    }
  })

