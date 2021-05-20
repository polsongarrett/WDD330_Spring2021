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

function renderHikeList(hikes, parent) {

  hikes.forEach(hike => {
    parent.appendChild(renderOneHike(hike));
  });
}

function renderOneHike(hike) {


  const item = document.createElement("li");
  item.addEventListener('touchend', showHikeDetails, hike);

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
        </div>`;

  return item;
}

function showHikeDetails(hike) {
  const hikeListElement = document.getElementById("hikes");
  hikeListElement.innerHTML = "";
}