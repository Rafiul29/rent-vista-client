import { BASE_URL } from "./baseUrl.js";


export const loadAdvertisements = (search) => {
  console.log(search)
  document.getElementById('advertisements').innerHTML = "";

  fetch(`${BASE_URL}/advertisement/list/?search=${search ? search : ""}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayAdvertisements(data)
      } else {
        document.getElementById('advertisements').innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }

    })
}

export function displayAdvertisements(advertisements) {

  advertisements.forEach((advertise) => {
    const advertisements = document.getElementById('advertisements')
    const div = document.createElement('div')

    div.innerHTML = `
     <div class="card" style="width: 16rem;">
        <img class="card-img-top" style="height: 12rem;" src="${advertise.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${advertise.title.slice(0, 30)}...</h5>
          <span class="card-text bg-info p-1 rounded">${advertise.category}</span>
          <p class="card-text text-justify">${advertise.description.slice(0, 120)}..</p>
          <div class='d-flex justify-content-between'>
          <span class='text-primary'> ${advertise.price} ৳</span>
          <a href="advertise_details.html?advertiseId=${advertise.id}" class="d-flex justify-content-center  align-items-center bg-primary px-1 rounded "><ion-icon class='text-white' name="eye-outline"></ion-icon></a>
          </div>
        </div>
      </div>
    `
    advertisements.appendChild(div)
  })
}



export const loadCategory = () => {
  fetch(`${BASE_URL}/category/list/`)
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const parentEl = document.getElementById('drop-deg')
        const li = document.createElement('li')
        li.classList.add('dropdown-item')
        li.textContent = item.name;

        li.addEventListener('click', () => loadAdvertisements(item.name));
        parentEl.appendChild(li)
       })
    })
}

loadCategory()
loadAdvertisements()