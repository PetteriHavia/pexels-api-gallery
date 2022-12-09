const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".input-search");
const card = document.querySelector(".card");
const gallery = document.querySelector(".gallery");
const searchMore = document.querySelector(".search.more");
const showMore = document.querySelector(".more-btn");

let items;
let page_num = 1;

imageCard = (object) => {
  let allImages = object.photos;
  allImages.forEach((img) => {
    const galleryCard = document.createElement("div");
    galleryCard.classList.add("item");
    galleryCard.innerHTML = `
      <div class="image-container">
        <img src="${img.src.large}" alt="photo">
        <div class="header">
          <h3>${img.alt}</h3>
        </div>
      </div>
      <div class="img-info">
        <a href="${img.photographer_url}" class="photographer">${img.photographer}</a>
        <a href="#" class="view" data-id="${img.id}">View</a>
      </div>
    `;
    gallery.appendChild(galleryCard);
    showMore.style.display = "block";

    //Send dataset.id
    items = gallery.querySelectorAll(".item .view");
    photoDetails(items);
  });
};

fetchData = (page_num) => {
  let query = searchBar.value;
  fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${page_num}&per_page=9`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: API_KEY
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const object = data;
      imageCard(object);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Store id value and change page
photoSelected = (id, page) => {
  sessionStorage.setItem("id", id);
  //console.log(id);
  window.location = page;
};

//Add event listener for all view-btn
photoDetails = (array) => {
  array.forEach((photo) => {
    photo.addEventListener("click", () => {
      let id = photo.dataset.id;
      photoSelected(id, "details.html");
    });
  });
};

clearGallery = () => {
  gallery.innerHTML = "";
  showMore.style.display = "none";
};

showMore?.addEventListener("click", () => {
  page_num++;
  fetchData(page_num);
});

searchBtn?.addEventListener("click", () => {
  if (searchBar.value === "") {
    searchBar.placeholder = "Enter search word";
    return;
  } else {
    clearGallery();
    fetchData(page_num);
  }
});
