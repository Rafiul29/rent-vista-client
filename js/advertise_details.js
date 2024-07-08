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
      console.log(data.title)
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

  div.innerHTML = `
        <div class="col-md-6 overflow-hidden">
            <img class='h-75 w-100'  src='${advertise.image}'>
        </div>
        <div class="col-md-6">
          <h2 class='text-info'>${advertise.title}</h2>
          <p>${advertise.description}</p>  
          <p><span>Rent Category :</span>  <span class='text-info'>${advertise.category}</span></p> 
          <p><span>Rent Amount :</span>  <span class='text-primary'>${advertise.price}৳</span></p>  
        </div>
        `
  parentEl.appendChild(div)
}



