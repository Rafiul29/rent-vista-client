import { BASE_URL } from './baseUrl.js';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken');

// checking auth
if (!token && !userId) {
  location.href = 'login.html'

}

const loadFavouriteRent = () => {
  fetch(`${BASE_URL}/advertisement/favourite/?user_id=${userId}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        document.getElementById('favourite_rent_table').innerHTML = ` 
            <div class="text-center">
             <div>
              <img class="h-25 w-25 object-fit-cover" style='width:120px;height:120px' src='./Images/not_favouite.png' alt='not favourite image' />
             </div>
               <a href='all_advertisement.html' class='text-decoration-none btn btn-primary'>Please Continue</a>
            </div>

        `
      } else {
        displayFavoriteRent(data);
      }
    });
};

function displayFavoriteRent(favRents) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  favRents?.forEach((fav, i) => {
    const date = new Date(fav.created_at);
    const tr = document.createElement('tr');
    let title = {}
    fetch(`${BASE_URL}/advertisement/list/${fav.advertisement}/`)
      .then(res => res.json())
      .then(data => {
        tr.innerHTML = `
          <th scope="row">${i + 1}</th>
          <td>${data.title}</td>
          <td>${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}</td>
          <td class='text-center h4 d-flex gap-3'>
           <a href="advertise_details.html?advertiseId=${fav.advertisement}">
           <ion-icon class='text-success' name="eye-outline"></ion-icon>
             </a>
           <a href="#">
            <ion-icon class='text-danger' onclick="handleFavouriteRentDel('${fav.id}')" name="close-circle-outline"></ion-icon>
           </a>
          </td>
    `;

        tableBody.insertAdjacentElement('afterbegin', tr);
      })
  });
}

window.handleFavouriteRentDel = (id) => {
  fetch(`${BASE_URL}/advertisement/favourite/${id}/`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        loadFavouriteRent();
      } else {
        console.error('Failed to delete favourite rent');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

document.addEventListener('DOMContentLoaded', loadFavouriteRent);
