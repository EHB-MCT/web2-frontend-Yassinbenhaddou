const user = localStorage.getItem('userInfo');
let array
window.onload = () =>{

   
   
    console.log(array);

    if (user) 
    {
      array = user.split(",")
      document.getElementById("userBtn").style.display="block";
      document.getElementById("loginBtn").style.display="none";
    }

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

   document.getElementById("userBtn").onclick = function () {
     document.getElementById("loginFormDiv").style.display = "block";   

     document.getElementById("userBtn").style.display="block";
     document.getElementById("loginBtn").style.display="none";
     document.getElementById('formDiv').style.display = 'none';
     document.getElementById('formDiv2').style.display = 'none';
     document.getElementById('successful').style.display = 'block';
     document.getElementById('successful').innerHTML = `
       <h2> login success</h2 >

        <h3>welcome Bg</h3> 
        <a class='logoutClass' id='logout'>logout</a>
                `;

     logout();
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

   
   //sned comment

   document.getElementById("commentsForm").addEventListener('submit', e => {
    e.preventDefault();
    let comment = document.getElementById("message").value;

        fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/comments", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
                userId : array[0],
                comment
            })
            }).then(data => {
              return data.json();
            })
            result.then(data => {
            console.log(data)
           

        })
        fetchComment();
   })
   
   //registratie
   document.getElementById("register").addEventListener('submit', e => {
    e.preventDefault();
   
    let username = document.getElementById("userRegister").value;
    let email = document.getElementById("emailRegister").value;
    let password = document.getElementById("passwordRegister").value;
    let passwordReapeat = document.getElementById("rePasswordRegister").value;
    let favplanet = "";

    


    if (username !== "" && email !== "" && password !== "" && (passwordReapeat === password)) {
        
        const result = fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password,
                favplanet,
                dataUser: new Object,
                date: new Date
            })
            }).then(data => {
              return data.json();
            })
            result.then(data => {
            console.log(data)

            document.getElementById('successful').style.display = 'block';
            document.getElementById('successful').innerHTML = `
            <h2> registration success</h2 >
            <h3>you can log in bro</h2>`;

        })
       } else {
        document.getElementById('errorForm').style.display = 'block';
        document.getElementById('errorForm').innerHTML = `
        <h2> error</h2 >
        <h3>please enter all fields</h2>`;
         console.log("please enter all fields")
       }
    
    
   })


   document.getElementById("formLogin").addEventListener('submit', e => {
    e.preventDefault();
   
    
    let email = document.getElementById("logEmail").value;
    let password = document.getElementById("logPassword").value;
    
    let result = fetch('https://web2-backend-yassinbenhaddou.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        }).then(data => {
            return data.json()
        })
        result.then(data => {
            if (typeof data.message == 'object') {
                //console.log(data.message)
                
                localStorage.setItem('userInfo', JSON.stringify(data.message))

                document.getElementById("userBtn").style.display="block";
                document.getElementById("loginBtn").style.display="none";

                document.getElementById('formDiv').style.display = 'none';
                document.getElementById('formDiv2').style.display = 'none';
                document.getElementById('successful').style.display = 'block';
                document.getElementById('successful').innerHTML = `
                <h2> login success</h2 >
                
                <h3>welcome Bg</h3> 

                <a class='logoutClass' id='logout'>logout</a>
                `;
               // window.location.href = "form.html";

               logout();

            }
            else {
                console.log(data.message)
            }
        })
    
   })

   

   
   ///FETCH Get APIS
   fetch(solarSystemApiUrl)
    .then(response => response.json())
    .then(data => printHtml(data.planets));

    fetch(articleApiUrl)
    .then(response => response.json())
    .then(articles => printArticles(articles));

    fetch(peopleApiUrl)
    .then(response => response.json())
    .then(issData => console.log(issData));
    
    function fetchComment(){
    fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/comments")
    .then(response => response.json())
    .then(comments => printComments(comments))
    }
    fetchComment();
    
  
}

function logout(){
    
    //logout
    document.getElementById('logout').addEventListener('click', () => {

        console.log('logout');
        localStorage.removeItem('userInfo');

        window.location.reload();
        
    });
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
        

      <div id="planetInfoDiv">
        <div class="blog-card">
            <div class="meta">
              <div class="photo" style="background-image: url(${article.imageUrl})"></div>
              <ul class="details">
                <li class="date">${article.publishedAt}</li>   
                </li>
              </ul>
            </div>
            <div class="description">
              <h1>${article.title}</h1>
              <h2>Opening a door to the future</h2>
              <p> ${article.summary}.</p>
              <p class="read-more">
                <a href="${article.url}" target="_blank">Read More</a>
              </p>
            </div>
          </div>
         
        </div>
       </div>
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


function printComments(comments)
{

    document.getElementById("allComments").innerHTML = "";
    comments.forEach(comment=>{
    let chatLeforRight;

    if( user.includes(comment.userId))
    {
        document.getElementById("allComments").innerHTML += `
        <div class="media">
        <a class=pull-right ><img class="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""></a>
        <div class="media-body">
            <h4 class="media-heading">John Doe</h4>
            
            <input sub type="text" id="up${comment._id}" name="update" value="${comment.comment}" readonly></input>

         </div>
         <br />
         <br />
          <i id="${comment._id}" class="bi bi-trash icon delete"></i>
          <i id="${comment._id}" class="bi bi-pen icon update"></i>
        </div>
        `;

    }else{
        document.getElementById("allComments").innerHTML += `
        <div class="media">
        <a class=pull-left ><img class="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""></a>
        <div class="media-body">
            <h4 class="media-heading">John Doe</h4>
            <p>${comment.comment}</p>
         </div>
        </div>
        `;
    }

   })

  deleteAndUpdate();
}

function deleteAndUpdate()
{

    
    let updates = document.getElementsByClassName('update');

    for(let update of updates){
        update.onclick = () =>{
            document.getElementById("up"+update.id).removeAttribute('readonly');
            console.log("update")

            document.getElementById("up"+update.id).addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                 event.preventDefault();
                 let comment = document.getElementById("up"+update.id).value;
                 console.log(comment)
                 sendNewUpdateComment(comment,update.id);
                 
               }
            })
        }
    }

    let deletes = document.getElementsByClassName('delete');
    for(let deleteBtn of deletes){
        deleteBtn.onclick = () =>{

    
            fetch(`https://web2-backend-yassinbenhaddou.herokuapp.com/comments/${deleteBtn.id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
            })
            .then(response => {
                return response.json()
            })
            console.log("delete")
            fetchComment();
        }
    }
}

//send comment update to data
function sendNewUpdateComment(comment,id)
{
    fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/comments/"+id, 
                 {
                      method: "PUT",
                      headers: {
                "Content-Type": "application/json"
                },
               body: JSON.stringify({
                
                comment:comment
              })
              }).then(data => {
               return data.json();
               fetchComment();
    })
               
        

       
}


