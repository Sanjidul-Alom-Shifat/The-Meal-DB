const LoadMeals = (SearchText) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchText}`
    fetch(URL)
        .then((response) => response.json())
    .then((data)=>DisplayMeals(data.meals))
}

const DisplayMeals = (meals) => {
    const Container = document.getElementById('Cards-Container');
    Container.innerHTML = '';
    meals.forEach(meal => {
        const NewDiv = document.createElement('div');
        NewDiv.classList.add();
        NewDiv.innerHTML = `
        <div class="card card-side shadow-2xl grid grid-cols-2">
            <img src="${meal.strMealThumb}" class="h-full rounded-md" alt="Movie"/>
            <div class="card-body ">
                <h2 class="card-title">${meal.strMeal}</h2>
                <p>${meal.strInstructions.slice(0, 80) + "...."}</p>
                <label onclick="LoadMealDeatails('${meal.idMeal}')" for="my-modal" class="text-warning underline font-bold cursor-pointer hover:text-black">View Details</label>
            </div>
        </div>   
        `
        Container.appendChild(NewDiv);
    })
}

const searchMeal = () => {
    const SearchInput = document.getElementById('search-input');
    const InputValue = SearchInput.value;
    SearchInput.value = '';
    if (InputValue === '') {
        alert('enter items');
    }
    else {
        LoadMeals(InputValue);
    }
}

const LoadMealDeatails = (Id) => {
    const Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`
    fetch(Url)
        .then((response) => response.json())
        .then(data => DisplayMealsDetails(data.meals[0]));
}

const DisplayMealsDetails = (value) => {
    console.log(value)
    const Container = document.getElementById('Modal-Information');
    const NewDiv = document.createElement('div');
    NewDiv.classList.add('modal');
    NewDiv.innerHTML = `
    <div class="modal-box">
        <h3 class="font-bold text-lg mb-2">${value.strMeal}</h3>
        <img src="${value.strMealThumb}" class="" alt="" srcset="">
        <hr class="text-semibold">
        <p class="py-4 "><span class="font-bold">Category :</span> ${value.strCategory}</p>
        <p class="py-4 "><span class="font-bold">Area :</span>  ${value.strArea}</p>
        <p class="py-4"><span class="font-bold">Instructions :</span> ${value.strInstructions.slice(0, 100) + "...."}</p>
        <p class="py-4"><span class="font-bold">Instructions :</span> <a href="https://www.youtube.com/watch?v=rZO86_-MIp0"></a> ${value.strYoutube}</p>
        <div class="modal-action">
        <label for="my-modal" class="btn btn-error text-white">Close</label>
        </div>
    </div> 
    `
    Container.appendChild(NewDiv);
    
}

LoadMeals('fish');

const DeleteData = () => {
    document.getElementById('Cards-Container').innerHTML='';
    
}
 



