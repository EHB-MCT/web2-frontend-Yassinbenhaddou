                    

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
    document.getElementById("spaceArticlesDiv").style.display = "none";

    

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
   
   document.getElementById("loginBtn").onclick = function () {
    document.getElementById("loginFormDiv").style.display = "block";   
      
   }

   document.getElementById("showLoginForm").onclick = () =>{
      document.getElementById("formDiv").style.display = "none";
      document.getElementById("formDiv2").style.display = "block"; 
   }

   document.getElementById("showRegisterForm").onclick = () =>{
    document.getElementById("formDiv2").style.display = "none";
    document.getElementById("formDiv").style.display = "block"; 
   }
  

   document.getElementById("closeFormBtn").onclick = function () {
    document.getElementById("loginFormDiv").style.display = "none";
   }

   
   
   
   
   document.getElementById("register").addEventListener('submit', e => {
    e.preventDefault();
   
    let userName = document.getElementById("userRegister").value;
    let email = document.getElementById("emailRegister").value;
    let password = document.getElementById("passwordRegister").value;
    let passwordReapeat = document.getElementById("rePasswordRegister").value;

    console.log(userName, email, password, passwordReapeat)


    /*fetch('https://groep-web2-backend.herokuapp.com/challenges', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, points, course, session
        })
    }).then(data => {
        return data.json()
    })*/
    
    
   })


   document.getElementById("formLogin").addEventListener('submit', e => {
    e.preventDefault();
   
    
    let email = document.getElementById("logEmail").value;
    let password = document.getElementById("logPassword").value;


    console.log(email, password)


    /*fetch('https://groep-web2-backend.herokuapp.com/challenges', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, points, course, session
        })
    }).then(data => {
        return data.json()
    })*/
    
    
   })

   

   
    

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
          <h4 class="name">${planet.name}</h4></br></h4> 
        </div>
        </div>
        `;
    }
    planetsBtn(planets);

}

function printArticles(articles)
{

    console.log(articles)
    articles.forEach(article =>
    { 
        
        document.getElementById("spaceArticlesDiv").innerHTML += `
        <br />
        

         <a href="${article.url}" target="_blank" class="card"  style="background-image:url('${article.imageUrl}')">
          <div class="inner">
          <h2 class="title">${article.title}</h2>
          <time class="subtitle">${article.publishedAt}<time>
         </div>
        </a>
     `;
        
    });

    
}

function planetsBtn(planets)
{
    //planets btn ->  planet info
    let planetsBtns = document.getElementsByClassName("planet");

    for(let planetBtn of planetsBtns){
        planetBtn.onclick = () =>{

            planets.forEach(planet=>{

                if(planet.name == planetBtn.id){
                    console.log(planet.name)
                    document.getElementById("planetInfoDiv").innerHTML = `
                    
                    <div class="wrapper">
                    
                    <div class="planet-img">
                        <img src="${planet.imgUrl}" height="100%" width="100%" alt="${planet.name}">
                      </div>
                      <div class="planet-info">
                        <div class="planet-text">
                        <div class="iDiv">
                        
                        <i class="bi bi-star-fill"></i>
                        <i id="closePage" class="bi bi-x-lg"></i>
                        </div>
                        
                          <h1>${planet.name}</h1>
                          <br />
                          <p class="about">
                            <span>First Record:</span> ${planet.FirstRecord}
                            ​​<br/>
                            <span>Diameter:</span> ${planet.Diameter}
                            ​​​​<br/>
                            <span>Mass:</span> ${planet.Mass}
                            ​​​​<br/>
                            <span>Orbit Distance:</span>  ${planet.OrbitDistance}
                            ​​​​<br/>
                            <span>Orbit Period":</span> ${planet.OrbitPeriod}
                            ​​​​<br/>
                            <span>Recorded By"</span>: ${planet.RecordedBy}
                            ​​​​<br/>
                            <span>Surface Temperature:</span> ${planet.SurfaceTemperature}
                            ​​<br/>
                            <br/>
                          </p>
                          <p class="aboutText">
                          ${planet.description}
                          </p>
                        </div>
                        
                      </div>
                </div>

                    `;
                }

            })

            document.getElementById("closePage").onclick = () =>
            {
                document.getElementById("planetInfoDiv").innerHTML ="";
            }


        }

    }
}



