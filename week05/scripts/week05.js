import { Hike } from './hike.js'

const hikeList = [
  new Hike(
    "Bechler Falls",
    "falls.jpg",
    "Image of Bechler Falls",
    "3 miles",
    "Easy",
    "Beautiful short hike along the Bechler river to Bechler Falls",
    "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
  ),

  new Hike(
    "Teton Canyon",
    "falls.jpg",
    "Image of Bechler Falls",
    "3 miles",
    "Easy",
    "Beautiful short (or long) hike through Teton Canyon.",
    "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
  ),

  new Hike(
    "Denanda Falls",
    "falls.jpg",
    "Image of Bechler Falls",
    "7 miles",
    "Moderate",
    "Beautiful hike through Bechler meadows river to Denanda Falls",
    "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
  ),
];

const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//on load grab the array and insert it into the page
window.addEventListener("load", () => {
  showHikeList();
});

function showHikeList() {

  const hikeListElement = document.getElementById("hikes");
  hikeListElement.innerHTML = "";
  renderHikeList(hikeList, hikeListElement);
}

function renderHikeList(hikeList, hikeListElement) {

  hikeList.forEach(hike => {
    hikeListElement.appendChild(renderOneHike(hike, hikeListElement));
  });
}

function renderOneHike(hike) {

  const item = document.createElement("li");
  item.innerHTML = ` <h2>${hike.name}</h2>
        <div class="image">
          <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
        </div>

        <div class="blurb">
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
          <p>Click picture to view details.</p>
        </div>`;

  item.addEventListener('touchend', function() {
    showHikeDetails(hike, item);
  });
  return item;
}

function showHikeDetails(hike) {

  let hikeListElement = document.getElementById("hikes");
  hikeListElement.innerHTML = '';
  hikeListElement.appendChild(renderOneHike(hike, hikeListElement));
  hikeListElement.appendChild(renderHikeDetails(hike));
}

function renderHikeDetails(hike) {
  const details = document.createElement("li");
  details.innerHTML = 
    `   
      <div class="details">
        <div>
          <h3>Description</h3>
          <p>${hike.description}</p>
        </div>
        <div>
          <h3>Directions</h3>
          <p>${hike.directions}</p>
        </div>
        <div>
          <a class="center" href="teamActivity.html">Hide Details</a>
        </div>
      </div>
    `;
  return details;
}