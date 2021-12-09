window.onload = () =>{

    let solarSystemApiUrl = "https://test-planets-api.herokuapp.com/getData";
    let issApiUrl = "https://wheretheiss.at/w/developer";
    let peopleApiUrl = "http://api.open-notify.org/astros.json";
    let articleApiUrl = "https://api.spaceflightnewsapi.net/v3/articles";


    /*
    fetch(solarSystemApiUrl)
   .then(response => response.json())
   .then(data => getPokemonsData(data.results))


    */

    //headerNav
    let headerBtns = document.getElementsByClassName("headerBtnClass");
    document.getElementById("planetsDiv").style.display = "none";
    document.getElementById("spaceArticlesDiv").style.display = "none"

   for(let headerBtn of headerBtns)
   {
       headerBtn.onclick = () =>{

        document.getElementById("active").id = "";

        let containers = document.getElementsByClassName("container");

        for(let container of containers)
        {
            container.style.display = "none";
        }

        headerBtn.id = "active";

        document.getElementById(headerBtn.name + "Div").style.display = "block";
           
       }
   }    
    

   fetch(solarSystemApiUrl)
    .then(response => response.json())
    .then(data => printHtml(data.planets));

    fetch(articleApiUrl)
    .then(response => response.json())
    .then(articles => printArticles(articles));

    fetch(peopleApiUrl)
    .then(response => response.json())
    .then(issData => console.log(issData));  

    

}


function printHtml(planets)
{
    console.log(planets);
    for(let planet of planets)
    {
        document.getElementById("planetsDiv").innerHTML += `
        <div id="${planet.name}" class="planet">
        <img src="${planet.imgUrl}" alt="${planet.name}">
        <div class="info">
          <h4 class="name">${planet.name}</h4>b></b></h4> 
        </div>
        </div>
        `;
    }    

}

function printArticles(articles)
{
    articles.forEach(article =>
    {
        
        document.getElementById("spaceArticlesDiv").innerHTML += `
        <br />
        <div id=""> class="card">
         <img src="${article.imageUrl}">
         <h1>${article.title}</h1>
         <p>${article.summary}</p>
         <p>
         <button>Read more</button></p>
         </div>
     `;
        
    });

    planetsBtn();
}

function planetsBtn()
{
    //planets btn ->  planet info
    let planetsBtns = document.getElementsByClassName("planet");

    for(let planetBtn of planetsBtns){
        planetBtn.onclick = () =>{
            console.log(planetBtn.id);

        }

    }
}



