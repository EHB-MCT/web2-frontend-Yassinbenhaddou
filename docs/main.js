(()=>{const e=localStorage.getItem("userInfo");let n=e.split(",");function t(){document.getElementById("logout").addEventListener("click",(()=>{console.log("logout"),localStorage.removeItem("userInfo"),window.location.reload()}))}function o(){let e=document.getElementsByClassName("update");for(let n of e)n.onclick=()=>{document.getElementById("up"+n.id).removeAttribute("readonly"),console.log("update"),document.getElementById("up"+n.id).addEventListener("keyup",(function(e){if(13===e.keyCode){e.preventDefault();let t=document.getElementById("up"+n.id).value;console.log(t),l(t,n.id)}}))};let n=document.getElementsByClassName("delete");for(let e of n)e.onclick=()=>{fetch(`https://web2-backend-yassinbenhaddou.herokuapp.com/comments/${e.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}).then((e=>e.json())),console.log("delete"),fetchComment()}}function l(e,n){fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/comments/"+n,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({comment:e})}).then((e=>e.json()))}window.onload=()=>{console.log(n),e&&(document.getElementById("userBtn").style.display="block",document.getElementById("loginBtn").style.display="none");let l=document.getElementsByClassName("headerBtnClass");document.getElementById("planetsDiv").style.display="none",document.getElementById("spaceArticlesDiv").style.display="none";for(let e of l)e.onclick=()=>{document.getElementById("active").id="";let n=document.getElementsByClassName("container");for(let e of n)e.style.display="none";e.id="active",document.getElementById(e.name+"Div").style.display="block"};function s(){fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/comments").then((e=>e.json())).then((n=>function(n){document.getElementById("allComments").innerHTML="",n.forEach((n=>{e.includes(n.userId)?document.getElementById("allComments").innerHTML+=`\n        <div class="media">\n        <a class=pull-right ><img class="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""></a>\n        <div class="media-body">\n            <h4 class="media-heading">John Doe</h4>\n            \n            <input sub type="text" id="up${n._id}" name="update" value="${n.comment}" readonly></input>\n\n         </div>\n         <br />\n         <br />\n          <i id="${n._id}" class="bi bi-trash icon delete"></i>\n          <i id="${n._id}" class="bi bi-pen icon update"></i>\n        </div>\n        `:document.getElementById("allComments").innerHTML+=`\n        <div class="media">\n        <a class=pull-left ><img class="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""></a>\n        <div class="media-body">\n            <h4 class="media-heading">John Doe</h4>\n            <p>${n.comment}</p>\n         </div>\n        </div>\n        `})),o()}(n)))}document.getElementById("loginBtn").onclick=function(){document.getElementById("loginFormDiv").style.display="block"},document.getElementById("userBtn").onclick=function(){document.getElementById("loginFormDiv").style.display="block",document.getElementById("userBtn").style.display="block",document.getElementById("loginBtn").style.display="none",document.getElementById("formDiv").style.display="none",document.getElementById("formDiv2").style.display="none",document.getElementById("successful").style.display="block",document.getElementById("successful").innerHTML="\n       <h2> login success</h2 >\n\n        <h3>welcome Bg</h3> \n        <a class='logoutClass' id='logout'>logout</a>\n                ",t()},document.getElementById("showLoginForm").onclick=()=>{document.getElementById("formDiv").style.display="none",document.getElementById("formDiv2").style.display="block"},document.getElementById("showRegisterForm").onclick=()=>{document.getElementById("formDiv2").style.display="none",document.getElementById("formDiv").style.display="block"},document.getElementById("closeFormBtn").onclick=function(){document.getElementById("loginFormDiv").style.display="none"},document.getElementById("commentsForm").addEventListener("submit",(e=>{e.preventDefault();let t=document.getElementById("message").value;fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/comments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:n[0],comment:t})}).then((e=>e.json())),result.then((e=>{console.log(e)})),s()})),document.getElementById("register").addEventListener("submit",(e=>{e.preventDefault();let n=document.getElementById("userRegister").value,t=document.getElementById("emailRegister").value,o=document.getElementById("passwordRegister").value,l=document.getElementById("rePasswordRegister").value;""!==n&&""!==t&&""!==o&&l===o?fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,email:t,password:o,favplanet:"",dataUser:new Object,date:new Date})}).then((e=>e.json())).then((e=>{console.log(e),document.getElementById("successful").style.display="block",document.getElementById("successful").innerHTML="\n            <h2> registration success</h2 >\n            <h3>you can log in bro</h2>"})):(document.getElementById("errorForm").style.display="block",document.getElementById("errorForm").innerHTML="\n        <h2> error</h2 >\n        <h3>please enter all fields</h2>",console.log("please enter all fields"))})),document.getElementById("formLogin").addEventListener("submit",(e=>{e.preventDefault();let n=document.getElementById("logEmail").value,o=document.getElementById("logPassword").value;fetch("https://web2-backend-yassinbenhaddou.herokuapp.com/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:o})}).then((e=>e.json())).then((e=>{"object"==typeof e.message?(localStorage.setItem("userInfo",JSON.stringify(e.message)),document.getElementById("userBtn").style.display="block",document.getElementById("loginBtn").style.display="none",document.getElementById("formDiv").style.display="none",document.getElementById("formDiv2").style.display="none",document.getElementById("successful").style.display="block",document.getElementById("successful").innerHTML="\n                <h2> login success</h2 >\n                \n                <h3>welcome Bg</h3> \n\n                <a class='logoutClass' id='logout'>logout</a>\n                ",t()):console.log(e.message)}))})),fetch("https://test-planets-api.herokuapp.com/getData").then((e=>e.json())).then((e=>function(e){console.log(e);for(let n of e)document.getElementById("planetsDiv").innerHTML+=`\n        <div id="${n.name}" class="planet">\n        <img src="${n.imgUrl}" alt="${n.name}">\n        <div class="info">\n          <h4 class="name">${n.name}</h4></br></h4> \n        </div>\n        </div>\n        `;!function(e){let n=document.getElementsByClassName("planet");for(let t of n)t.onclick=()=>{e.forEach((e=>{e.name==t.id&&(console.log(e.name),document.getElementById("planetInfoDiv").innerHTML=`\n                    \n                    <div class="wrapper">\n                    \n                    <div class="planet-img">\n                        <img src="${e.imgUrl}" height="100%" width="100%" alt="${e.name}">\n                      </div>\n                      <div class="planet-info">\n                        <div class="planet-text">\n                        <div class="iDiv">\n                        \n                        <i class="bi bi-star-fill"></i>\n                        <i id="closePage" class="bi bi-x-lg"></i>\n                        </div>\n                        \n                          <h1>${e.name}</h1>\n                          <br />\n                          <p class="about">\n                            <span>First Record:</span> ${e.FirstRecord}\n                            ​​<br/>\n                            <span>Diameter:</span> ${e.Diameter}\n                            ​​​​<br/>\n                            <span>Mass:</span> ${e.Mass}\n                            ​​​​<br/>\n                            <span>Orbit Distance:</span>  ${e.OrbitDistance}\n                            ​​​​<br/>\n                            <span>Orbit Period":</span> ${e.OrbitPeriod}\n                            ​​​​<br/>\n                            <span>Recorded By"</span>: ${e.RecordedBy}\n                            ​​​​<br/>\n                            <span>Surface Temperature:</span> ${e.SurfaceTemperature}\n                            ​​<br/>\n                            <br/>\n                          </p>\n                          <p class="aboutText">\n                          ${e.description}\n                          </p>\n                        </div>\n                        \n                      </div>\n                </div>\n\n                    `)})),document.getElementById("closePage").onclick=()=>{document.getElementById("planetInfoDiv").innerHTML=""}}}(e)}(e.planets))),fetch("https://api.spaceflightnewsapi.net/v3/articles").then((e=>e.json())).then((e=>function(e){console.log(e),e.forEach((e=>{document.getElementById("spaceArticlesDiv").innerHTML+=`\n        <br />\n        \n\n      <div id="planetInfoDiv">\n        <div class="blog-card">\n            <div class="meta">\n              <div class="photo" style="background-image: url(${e.imageUrl})"></div>\n              <ul class="details">\n                <li class="date">${e.publishedAt}</li>   \n                </li>\n              </ul>\n            </div>\n            <div class="description">\n              <h1>${e.title}</h1>\n              <h2>Opening a door to the future</h2>\n              <p> ${e.summary}.</p>\n              <p class="read-more">\n                <a href="${e.url}" target="_blank">Read More</a>\n              </p>\n            </div>\n          </div>\n         \n        </div>\n       </div>\n     `}))}(e))),fetch("http://api.open-notify.org/astros.json").then((e=>e.json())).then((e=>console.log(e))),s()}})();