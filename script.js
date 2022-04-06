let input = document.querySelector(".input-search");
let btn = document.querySelector(".btn-search");
let container = document.querySelector(".container");
let repice = document.querySelector(".get-repice");
let bigdata = 0;
let repiceMore = document.querySelector(".recipe");
let recipeName = document.querySelector(".recipe-name");
let recipeCategory = document.querySelector(".recipe-category");
let recipeDesc = document.querySelector(".recipe-desc");
let btnClose = document.querySelector(".close-recipe");
repiceMore.style.display = "none";
function getInfo(input) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((response) => response.json())
    .then((res) => {
      bigdata = res;
      res.meals.forEach((element) => {
        render(element);
      });
      console.log(res); 
    });
}
btn.addEventListener("click", function (e) {
  container.innerHTML = "";
  e.preventDefault();
  getInfo(input.value);
});
function render(obj) {
  let html = `
  <div class="card" id='${obj.idMeal}'>
    <img
     src="${obj.strMealThumb}"
     alt=""
     class="meal-img"
    />
    <p class="meal-name">${obj.strMeal}</p>
    <button class="get-repice">Get Recipe</button>
  </div>`;
  container.insertAdjacentHTML("beforeend", html);
}
container.addEventListener("click", function (e) {
  if (e.target.classList.contains("get-repice")) {
    let id = e.target.parentElement.id;
    let obj = bigdata.meals.find((el) => el.idMeal == id);
    recipeName.textContent = obj.strMeal;
    recipeCategory.textContent = obj.strCategory;
    recipeDesc.textContent = obj.strInstructions;
    repiceMore.style.display = "block";
  }
});
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  repiceMore.style.display = "none";
});
