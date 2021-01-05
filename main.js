// get element for recipe content 
const recipe = document.getElementById('get-recipe'),  //get recipe
    imgContainer = document.querySelector('.recipe-img'),   // img wrapper
    recipeName = document.querySelector('.recipe-name'),
    ingredient = document.querySelector('.ingredients'),
    category = document.querySelector('.category'),
    descTitle = document.querySelector('.desc-title'),
    area = document.querySelector('.area'),
    desc = document.querySelector('.desc'),  //description of recipe

    // burger-menu 
    burgerBtn = document.querySelector('.header-burger'), //burger icon
    burgerSlideWrapper = document.querySelector('.burger-slide-wrapp'),
    burgerBtnClose = document.querySelector('.arrow-back'),

    //get element for favorit content 
    favoritMeal = document.querySelector('.star'),  // add to favorite
    likeWrapper = document.querySelector('.like-wrapper'),  // favorit wrapper
    likeWrapperSmall = document.querySelector('.fav-wrapper-small'),
    closeBtn = document.querySelector('.close-btn'),  // close favorite
    deleteFromFav = document.querySelector('.delete'); // delete from favorit

const mealsList = [];
let currentMeal;

//create full recipe list
const createMeal = (meal) => {
    imgContainer.innerHTML = `<img src="${meal.strMealThumb}">`;
    recipeName.innerHTML = meal.strMeal;
    category.innerHTML = `<strong> Category: </strong > ${meal.strCategory} `;
    area.innerHTML = `<strong> Area:</strong > ${meal.strArea} `;
    descTitle.textContent = 'Description';
    desc.innerHTML = meal.strInstructions;

    const ingredients = [];
    currentMeal = meal;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    ingredient.innerHTML = `<strong>Ingredients:</strong> <ul> ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')} </ul>`;
}

const createFavoriteRecipeContainer = (meal) => {
    const container = document.createElement('div');
    container.classList.add('like-info');

    const favImgContainer = document.createElement('img');
    favImgContainer.classList.add('fav-img');

    const favRecipeName = document.createElement('h3');
    favRecipeName.classList.add('fav-name');

    const deleteFromFav = document.createElement('img');
    deleteFromFav.src = "https://img.icons8.com/fluent/15/000000/delete-sign.png"
    deleteFromFav.classList.add('delete');

    favImgContainer.src = meal.strMealThumb;
    favImgContainer.style.width = "35px";
    favImgContainer.style.height = "35px";

    favRecipeName.innerHTML = meal.strMeal;

    container.appendChild(favImgContainer);
    container.appendChild(favRecipeName);
    container.appendChild(deleteFromFav);

    //delete from favorit list
    deleteFromFav.addEventListener('click', (event) => {
        let btnClick = event.target
        btnClick.parentElement.remove()

    })

    return container;
}

//create container for favorit list recipe
const createFavoritContent = (meal) => {
    const container = createFavoriteRecipeContainer(meal);
    mealsList.push(meal);

    for (let i = 0; i < mealsList.length; i++) {
        likeWrapperSmall.appendChild(container)
    }
}

const addMeal = (meal) => mealsList.push(meal);

// burger menu open/close
burgerBtn.addEventListener('click', () => {
    burgerSlideWrapper.classList.add('active')
})

burgerBtnClose.addEventListener('click', () => {
    burgerSlideWrapper.classList.remove('active')
})

//add/close to favorite list
favoritMeal.addEventListener('click', () => {
    addMeal(currentMeal)
    likeWrapper.classList.add('active')
    createFavoritContent(currentMeal)
})

closeBtn.addEventListener('click', () => {
    likeWrapper.classList.remove('active')
})

//get recipe 
recipe.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(({ meals }) => createMeal(meals[0]))
})

recipe.addEventListener('mousedown', () => {
    recipe.style.background = '#ff8e20'
    recipe.innerHTML = 'Get new'
    recipe.addEventListener('mouseup', () => {
        recipe.style.background = ''
    })
})
