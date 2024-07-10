import { BASE_URL } from "./baseUrl.js";

const getParams = () => {
  const param = new URLSearchParams(window.location.search).get("advertiseId");
  return param
}

function loadAdvertisementsDetails() {
  const id = getParams()
  fetch(`${BASE_URL}/advertisement/list/${id}/`)
    .then(res => res.json())
    .then(data =>{
      if (data?.title) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayAdvertisementsDetails(data)
      } else {
        document.getElementById('advertisements').innerHTML = "";
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "block";
      }

    })
}
loadAdvertisementsDetails()

const displayAdvertisementsDetails = (advertise) => {

  const parentEl = document.getElementById('advertise-details')
  const div = document.createElement('div')
  div.classList.add('row')
  fetch(`${BASE_URL}/category/list/${advertise.category}/`)
  .then(res => res.json())
  .then(category => {
    div.innerHTML = `
    <div class="col-md-6 overflow-hidden">
        <img class='h-100 w-100 '  src='${advertise.image}'>
    </div>
    <div class="col-md-6">
      <h2 class='text-info'>${advertise.title}</h2>
      <div class='row'>
        <div class='col-md-6'>
          <p><span>Rent Category :</span>  <span class='text-info'>${category.name}</span></p> 
          <p><span>Rent Amount :</span>  <span class='text-primary'>${advertise.price}৳</span></p>  
          <p><span> Bedrooms:</span>  <span class='text-info'>${advertise.bedrooms}</span></p> 
        </div>
        <div class='col-md-6'>
            <p><span> Location:</span>  <span class='text-info'>${advertise.location}</span></p> 
            <p><span> Amenities:</span>  <span class='text-info'>${advertise.amenities}</span></p> 
        </div>
      </div>
      <p>${advertise.description}</p>
      <div class='d-flex gap-2'>
      <div>
        <buttton onclick="handleRequestRent()" class='btn btn-outline-primary'> Request Rent</button>
      </div>
      <div>
        <buttton onclick="handleFavouriteRent()" class='btn btn-outline-primary'>Favourite Rent</button>
      </div>
      </div>
      
    </div>
    
    `
parentEl.appendChild(div)
  })
  
}


