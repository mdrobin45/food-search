const nothingFound = document.getElementById('nothingFound');
nothingFound.style.display = 'none';
document.getElementById('searchBtn').addEventListener('click', function () {
    const searchText = document.getElementById('searchText');
    if (searchText.value == '') {
        alert('Please write something');
    } else {
        const apiLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.value}`;
        // Clear search box
        searchText.value = '';
        fetch(apiLink)
            .then(res => res.json())
            .then(data => loadData(data.meals));
        // Show search results
        const loadData = (foods) => {
            const main = document.getElementById('mainSection');
            main.innerHTML = '';
            if (foods == null) {
                nothingFound.style.display = 'block';
            } else {
                for (const item of foods) {
                    const div = document.createElement('div');
                    div.classList.add('border-2', 'rounded', 'border-gray-700', 'p-3');
                    div.innerHTML = `<div onclick="loadDetails(${item.idMeal})">
                    <img class="w-full" src="${item.strMealThumb}">
                    <h3 class="text-3xl font-bold py-3">${item.strMeal}</h3>
                    <p class="text-justify	">
                        ${item.strInstructions.slice(0, 200)}
                    </p>
                    </div>`;
                    main.appendChild(div);
                }
                nothingFound.style.display='none';
            }
        };
    }
});
// Meal Details
const loadDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => singleMeal(data.meals[0]));
    const singleMeal = (item) => {
        const main = document.getElementById('mealDetailsMain');
        main.innerHTML='';
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="mx-10 grid grid-cols-2 mt-10 bg-gray-700 text-white">
            <img class="w-full" src="${item.strMealThumb}"/>
            <div class="p-6">
                <h3 class="text-3xl">${item.strMeal}</h3>
                <p class="my-6">${item.strInstructions}</p>
                <a target="_blank" href="${item.strYoutube}" class="px-10 py-2 text-gray-700 bg-white text-xl rounded">Read More</a>
            </div>
        </div>
    `;
        main.appendChild(div);
    };
};