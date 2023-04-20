// https://themealdb.com/
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random-btn'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  //Clearing single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check term is not empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for ${term}`;
        // adding meals elements to HTML
        if (data) {
          console.log(data);
          // remember map -> no {} with single expression
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class='meal'>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="meal-info" data-mealid="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
             </div>
            `
            )
            .join('');
        }
        // Clear search text
        search.value = '';
      });
  } else {
    alert('Please enter a search term ...');
  }
}

// Fetch meal by ID
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => addMealToDom(data.meals[0]));
}

// Fetch random Meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => addMealToDom(data.meals[0]));
}
// Add single meal to DOM
function addMealToDom(meal) {
  console.log(meal);
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} -- ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ingred) => `<li>${ingred}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event Listeners
submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', (e) => {
  console.log(e.composedPath());
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });
  // const mealInfo = e.composedPath().filter((item) => {
  //   return item.className === 'meal-info';
  // })[0]; -> trying it with filter

  if (mealInfo) {
    // const mealId1 = mealInfo.getAttribute('data-mealid'); another approach
    const mealID = mealInfo.dataset['mealid'];
    getMealById(mealID);
  }
});

random.addEventListener('click', getRandomMeal);
