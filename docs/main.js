window.onload=()=>{let e=document.getElementsByClassName("headerBtnClass");document.getElementById("planetsDiv").style.display="none",document.getElementById("spaceArticlesDiv").style.display="none";for(let n of e)n.onclick=()=>{document.getElementById("active").id="";let e=document.getElementsByClassName("container");for(let n of e)n.style.display="none";n.id="active",document.getElementById(n.name+"Div").style.display="block"};document.getElementById("loginBtn").onclick=function(){document.getElementById("loginFormDiv").style.display="block"},document.getElementById("showLoginForm").onclick=()=>{document.getElementById("formDiv").style.display="none",document.getElementById("formDiv2").style.display="block"},document.getElementById("showRegisterForm").onclick=()=>{document.getElementById("formDiv2").style.display="none",document.getElementById("formDiv").style.display="block"},document.getElementById("closeFormBtn").onclick=function(){document.getElementById("loginFormDiv").style.display="none"},document.getElementById("register").addEventListener("submit",(e=>{e.preventDefault();let n=document.getElementById("userRegister").value,t=document.getElementById("emailRegister").value,l=document.getElementById("passwordRegister").value,s=document.getElementById("rePasswordRegister").value;""!==n&&""!==t&&""!==l&&s===l?fetch("http://localhost:3000/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,email:t,password:l,favplanet:"",dataUser:new Object,date:new Date})}).then((e=>e.json())).then((e=>{console.log(e),document.getElementById("successful").style.display="block",document.getElementById("successful").innerHTML="\n            <h2> registration success</h2 >\n            <h3>you can log in bro</h2>"})):(document.getElementById("errorForm").style.display="block",document.getElementById("errorForm").innerHTML="\n        <h2> error</h2 >\n        <h3>please enter all fields</h2>",console.log("please enter all fields"))})),document.getElementById("formLogin").addEventListener("submit",(e=>{e.preventDefault();let n=document.getElementById("logEmail").value,t=document.getElementById("logPassword").value;fetch("http://localhost:3000/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:t})}).then((e=>e.json())).then((e=>{"object"==typeof e.message?(document.getElementById("formDiv").style.display="none",document.getElementById("formDiv2").style.display="none",document.getElementById("successful").style.display="block",document.getElementById("successful").innerHTML="\n                <h2> login success</h2 >\n                \n                <h3>welcome Bg</h3> \n                <a class='logoutClass' id='logout'>logout</a>\n                "):console.log(e.message)}))})),fetch("https://test-planets-api.herokuapp.com/getData").then((e=>e.json())).then((e=>function(e){console.log(e);for(let n of e)document.getElementById("planetsDiv").innerHTML+=`\n        <div id="${n.name}" class="planet">\n        <img src="${n.imgUrl}" alt="${n.name}">\n        <div class="info">\n          <h4 class="name">${n.name}</h4></br></h4> \n        </div>\n        </div>\n        `;!function(e){let n=document.getElementsByClassName("planet");for(let t of n)t.onclick=()=>{e.forEach((e=>{e.name==t.id&&(console.log(e.name),document.getElementById("planetInfoDiv").innerHTML=`\n                    \n                    <div class="wrapper">\n                    \n                    <div class="planet-img">\n                        <img src="${e.imgUrl}" height="100%" width="100%" alt="${e.name}">\n                      </div>\n                      <div class="planet-info">\n                        <div class="planet-text">\n                        <div class="iDiv">\n                        \n                        <i class="bi bi-star-fill"></i>\n                        <i id="closePage" class="bi bi-x-lg"></i>\n                        </div>\n                        \n                          <h1>${e.name}</h1>\n                          <br />\n                          <p class="about">\n                            <span>First Record:</span> ${e.FirstRecord}\n                            ​​<br/>\n                            <span>Diameter:</span> ${e.Diameter}\n                            ​​​​<br/>\n                            <span>Mass:</span> ${e.Mass}\n                            ​​​​<br/>\n                            <span>Orbit Distance:</span>  ${e.OrbitDistance}\n                            ​​​​<br/>\n                            <span>Orbit Period":</span> ${e.OrbitPeriod}\n                            ​​​​<br/>\n                            <span>Recorded By"</span>: ${e.RecordedBy}\n                            ​​​​<br/>\n                            <span>Surface Temperature:</span> ${e.SurfaceTemperature}\n                            ​​<br/>\n                            <br/>\n                          </p>\n                          <p class="aboutText">\n                          ${e.description}\n                          </p>\n                        </div>\n                        \n                      </div>\n                </div>\n\n                    `)})),document.getElementById("closePage").onclick=()=>{document.getElementById("planetInfoDiv").innerHTML=""}}}(e)}(e.planets))),fetch("https://api.spaceflightnewsapi.net/v3/articles").then((e=>e.json())).then((e=>function(e){console.log(e),e.forEach((e=>{document.getElementById("spaceArticlesDiv").innerHTML+=`\n        <br />\n        \n\n         <a href="${e.url}" target="_blank" class="card"  style="background-image:url('${e.imageUrl}')">\n          <div class="inner">\n          <h2 class="title">${e.title}</h2>\n          <time class="subtitle">${e.publishedAt}<time>\n         </div>\n        </a>\n     `}))}(e))),fetch("http://api.open-notify.org/astros.json").then((e=>e.json())).then((e=>console.log(e)))};