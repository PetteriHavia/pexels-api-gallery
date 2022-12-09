let detailsSection = document.querySelector(".details-section");
let detailsContainer = document.querySelector(".details-container");

imageDetails = (object) => {
  let img = object;
  const photoDiv = document.createElement("div");
  photoDiv.classList.add("item");
  photoDiv.innerHTML = `
      <div class="photo-card">
        <img src="${img.src.large}" alt="${img.alt}">
      </div>
      <div class="details-photo-name">
        <h1>${img.alt}</h1>
      </div>
      <div class="photo-info">
        <div class="column">
          <h3>PHOTOGRAPHER</h3>
          <p class="p-name">${img.photographer}</p>
        </div>
        <div class="column">
          <h3>WIDTH / HEIGHT</h3>
          <p class="p-name">${img.width} x ${img.height}</p>
        </div>
        <div class="column">
          <h3>AVERAGE COLOR</h3>
          <p class="p-name">${img.avg_color}</p>
        </div>
      </div>
    `;

  detailsContainer.appendChild(photoDiv);
};

fetchData = () => {
  let id = sessionStorage.getItem("id");
  fetch(`https://api.pexels.com/v1/photos/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const object = data;
      imageDetails(object);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();
