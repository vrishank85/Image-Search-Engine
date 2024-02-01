const accesskey = "ZY_Ulaie2Kuv7A9n_8ySmhkHw_mCaj9a4jnbznv7aT4"

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showmore = document.getElementById("showmore")

let inputData = ""
let page = 1;
async function searchimages() {
    // Clear the search results
    searchResults.innerHTML = "";
  
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
  
    const responce = await fetch(url);
    const data = await responce.json();
  
    const results = data.results;
  
    results.map((result) => {
      const imagewrapper = document.createElement("div");
      imagewrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imagelink = document.createElement("a");
      imagelink.href = result.links.html;
      imagelink.target = "_blank";
      imagelink.textContent = result.alt_description;
  
      imagewrapper.appendChild(image);
      imagewrapper.appendChild(imagelink);
      searchResults.appendChild(imagewrapper);
    });
  
    // Increment the page number
    page++;
  
    // If we are on the second page or later, show the "Show More" button
    if (page > 1) {
      showmore.style.display = "block";
    }
  }
  

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchimages();
});

showmore.addEventListener("click", () => {
    searchimages();
});