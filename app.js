const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click',function() {
    const inputMeal = document.getElementById('inputBox').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
    .then(res => res.json())
    .then(data => { 
        document.getElementById('mealItems').innerHTML = "";
        document.getElementById('mealInfo').innerHTML = ' ';
        const mealItems = document.getElementById('mealItems');
        data.meals.forEach(searchResult => {
            const searchMeal = document.createElement('div');
            searchMeal.innerHTML = `
                <img src="${ searchResult.strMealThumb }" onclick="showResult(${ searchResult.idMeal })">
                <h1 onclick="showResult(${ searchResult.idMeal })">${ searchResult.strMeal }</h1>
            `;
            searchMeal.className = "card";
            mealItems.appendChild(searchMeal);
        });
    })
    .catch(error => {
        document.getElementById('mealItems').innerHTML = "";
        document.getElementById('mealInfo').innerHTML = ' ';
        const mealItems = document.getElementById('mealItems');
        const noResult = document.createElement('h2');
        noResult.innerHTML = "No Meal Found";
        mealItems.appendChild(noResult);
    })
})

let showResult = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
        let mealInfo = document.getElementById('mealInfo');
        document.getElementById('mealInfo').innerHTML = ' ';
        document.getElementById('mealInfo').style.display = 'block';
        let detailsInfo = document.createElement('div');
        detailsInfo.innerHTML = `
            <img src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1> 
            <br>
            <h2>${ data.meals[0].strArea }</h2>
            <br>

            <h3>${ data.meals[0].strIngredient1 }</h3>
            <h3>${ data.meals[0].strIngredient2 }</h3>
            <h3>${ data.meals[0].strIngredient3 }</h3>
            <h3>${ data.meals[0].strIngredient4 }</h3>
            <h3>${ data.meals[0].strIngredient5 }</h3>
            <h3>${ data.meals[0].strIngredient6 }</h3>
            <h3>${ data.meals[0].strIngredient7 }</h3> 
            
        `;
        detailsInfo.className = 'total-info';
        mealInfo.appendChild(detailsInfo);
    })
}
//need to change strMeasuring