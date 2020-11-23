// get element for recipe content 
const recipe = document.getElementById('get-recipe'),  //get recipe
    // mealContainer = document.getElementById('meal'),  // recipe wrapper
    imgContainer = document.querySelector('.recipe-img'),   // img wrapper
    recipeName = document.querySelector('.recipe-name'),
    ingredient = document.querySelector('.ingredients'),
    category = document.querySelector('.category'),
    descTitle = document.querySelector('.desc-title'),
    area = document.querySelector('.area'),
    desc = document.querySelector('.desc');  //description of recipe

let currentMeal
const mealsList = []

//get recipe 
recipe.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(({ meals }) => {
            createMeal(meals[0])
            createFavoritContent(meals[0])
        })
})

recipe.addEventListener('mousedown', () => {
    recipe.style.background = '#ff8e20'
    recipe.innerHTML = 'Get new'
    recipe.addEventListener('mouseup', () => {
        recipe.style.background = ''

    })
})

//create full recipe list
const createMeal = (meal) => {
    imgContainer.innerHTML = `<img src="${meal.strMealThumb}">`
    recipeName.innerHTML = `${meal.strMeal} `
    category.innerHTML = `<strong> Category: </strong > ${meal.strCategory} `
    area.innerHTML = `<strong> Area:</strong > ${meal.strArea} `
    descTitle.textContent = `Description`
    desc.innerHTML = `${meal.strInstructions}`

    const ingredients = [];
    currentMeal = meal
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break;
        }
    }
    ingredient.innerHTML = `<strong>Ingredients:</strong> <ul> ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')} </ul>`
}

//get element for favorit content 
const favoritMeal = document.querySelector('.star'),  // add to favorite
    likeWrapper = document.querySelector('.like-wrapper'),  // favorit wrapper
    closeBtn = document.querySelector('.close-btn'),  // close favorite
    deleteFromFav = document.querySelector('.delete'), // delete from favorit
    favImgContainer = document.querySelector('.fav-img'),   // img wrapper
    favRecipeName = document.querySelector('.fav-name');

let favoritList = []
let currentRecipe

//add to favorite list
favoritMeal.addEventListener('click', () => {
    addMeal(currentMeal)
    likeWrapper.classList.add('active')
    //если клик - добавить в избранное!  не обновлять избранный товар по клику NEW, только по клику на звездочку
})

//close favorite list 
closeBtn.addEventListener('click', () => {
    likeWrapper.classList.remove('active')
})

const createFavoritContent = (meal) => {
    favImgContainer.innerHTML = `<img src="${meal.strMealThumb}">`
    favRecipeName.innerHTML = `${meal.strMeal} `
}

function addMeal(meal) {
    mealsList.push(meal)
    console.log(mealsList);
}

// function deleteMeal(idMeal) {
//     mealsList = mealsList.filter((id) => idMeal !== id)
// }

// deleteFromFav.addEventListener('click', () => {
// })


// burger-menu 
const burgerBtn = document.querySelector('.header-burger'), //burger icon
    burgerSlideWrapper = document.querySelector('.burger-slide-wrapp'),
    burgerBtnClose = document.querySelector('.close');


burgerBtn.addEventListener('click', () => {
    burgerSlideWrapper.classList.add('active')
})

burgerBtnClose.addEventListener('click', () => {
    burgerSlideWrapper.classList.remove('active')
})
