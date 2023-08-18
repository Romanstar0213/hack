// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// // firebase

// // Import the functions you need from the SDKs you need
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBF9GIheDmiORNf9wfkm79AKbwBG8H-iJE",
//     authDomain: "automotive-7870a.firebaseapp.com",
//     projectId: "automotive-7870a",
//     storageBucket: "automotive-7870a.appspot.com",
//     messagingSenderId: "1080619282985",
//     appId: "1:1080619282985:web:98c37b28b50280e129e238",
//     measurementId: "G-7HXQY6VD8V"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// // firebase
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore,getDoc,collection,orderBy,deleteDoc, increment,query, addDoc,where, setDoc, getDocs, updateDoc, doc, Timestamp, onSnapshot, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBF9GIheDmiORNf9wfkm79AKbwBG8H-iJE",
  authDomain: "automotive-7870a.firebaseapp.com",
  projectId: "automotive-7870a",
  storageBucket: "automotive-7870a.appspot.com",
  messagingSenderId: "1080619282985",
  appId: "1:1080619282985:web:98c37b28b50280e129e238",
  measurementId: "G-7HXQY6VD8V"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);


var data = document.getElementById("data")
var welcome = document.getElementById("welcome")
var loadermain = document.getElementById("loadermain")
var main = document.getElementById("main")
var inpp = document.getElementById("input")
var notfound = document.getElementById("notfound")
var networkerror = document.getElementById("networkerror")
var togmain = document.getElementById("togmain")



data.appendChild(welcome)
setTimeout(() => {
    welcome.classList.add("d-none")
    // home()
}, 1);

let mainadmin =  document.getElementById("admin")
function showadmin(){
mainadmin.classList.remove("d-none")
}
function hideadmin(){
mainadmin.classList.add("d-none")
}
window.hideadmin = hideadmin
// showadmin()

async function upload(){

    loadermain.classList.remove("d-none")
    let pname = document.getElementById("pname")
    let pcategory = document.getElementById("pcategory")
    let pdescription = document.getElementById("pdescription")
    let pfile = document.getElementById("pfile")
    console.log("upload")

    // upload file

    const uploadfile =(file)=>{
        return new Promise((resolve,reject)=>{
          
          const storageRef = ref(storage, `images/users/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                  console.log('Upload is running');
                  break;
                }
          }, 
          (error) => {
            reject(error)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL)
            });
          }
          );
        })
      }
        try{
      
      
        //   var file = document.getElementById("file")
          const res = await uploadfile(pfile.files[0])
          console.log( "URL",res)
          let image = res


        // after file uploaded

        const docRef = await addDoc(collection(db, "carts"), {
            pname:pname.value,
            pcategory:pcategory.value,
            pdescription:pdescription.value,
            image:image
          });
          console.log("Document written with ID: ", docRef.id);
      
      
        //   file = ""
        }catch(err){
            console.log(err)
            
        }
        // upload file
        loadermain.classList.add("d-none")
     
    }
    
    async function home(){
        
        loadermain.classList.remove("d-none")
        data.innerHTML = ""

        try{

            const querySnapshot = await getDocs(collection(db, "carts"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //   console.log(doc.id, " => ", doc.data().pname);
                data.innerHTML += `<div class="card mycard m-2" style="width: 18rem;">
                <div class="imagediv">
                <img class="card-img-top myimage" src="${doc.data().image}" alt="Card image cap">
                </div>
                <div class="card-body">
                <div class="tit">
                <h5 class="card-title title truncate">${doc.data().pname}</h5>
                </div>
                <p class="card-text myp">Price: 100</p>
                <p class="card-text myp2 truncate">${doc.data().pdescription}</p>
                <a class="btn btn-primary" onclick="tog('${doc.data().pname}')">Explore More</a>
                </div>
                </div>` 
                loadermain.classList.add("d-none")
                data.style.animation = "fade 1s ease 1"


                
            });
        }
    catch(err) {
        console.log("error")
        loadermain.classList.add("d-none")
        data.appendChild(networkerror)
        networkerror.classList.remove("d-none")
    }
}
home()


async function tog(value) {
    loadermain.classList.remove("d-none")
    var togtitle = document.getElementById("togtitle")
    var togdescription = document.getElementById("togdescription")
    var togprice = document.getElementById("togprice")
    var tograting = document.getElementById("tograting")
    var togimagediv = document.getElementById("togimagediv")
    var togcategory = document.getElementById("togcategory")

    const q = query(collection(db, "carts"), where("pname", "==", value));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());

    
  togtitle.innerHTML = doc.data().pname
  togdescription.innerHTML = doc.data().pdescription
  togprice.innerHTML = "100"
  tograting.innerHTML = "5"
  togcategory.innerHTML = doc.data().pcategory
  var imagetog = doc.data().image
  togmain.classList.remove("d-none")
  togimagediv.setAttribute("style", `background:linear-gradient(rgba(0, 0, 0, 0.500)50%, rgba(0, 0, 0, 0.500)50%) ,url(${imagetog}) no-repeat;`)
  loadermain.classList.add("d-none")


});


            // console.log(res[0].rating.rate)
           
    
}

var closebbtn = document.getElementById("closebtn")
closebbtn.addEventListener("click", () => {
    togmain.classList.add("d-none")

})

window.home = home
window.upload = upload
window.showadmin = showadmin

// function fixedNav(){
// document.addEventListener("DOMContentLoaded", function(){
//     window.addEventListener('scroll', function() {
//         if (window.scrollY > 1) {
//           document.getElementById('navbar-top').classList.add('fixed-top');
//           navbar_height = document.querySelector('.navbar').offsetHeight;
//           document.body.style.paddingTop = navbar_height + 'px';
//         } else {
//           document.getElementById('navbar-top').classList.remove('fixed-top');
//           document.body.style.paddingTop = '0';
//         } 
//     });
//   }); 
// }
// fixedNav()
function srch() {
    loadermain.classList.remove("d-none")
    data.innerHTML = ""
    input = inpp.value.toLowerCase().trim()
    // console.log(input)
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(res => {
            var flag = 1
            for (var i = 0; i < res.length; i++) {
                // console.log()
                var response = res[i].title.toLowerCase()
                // console.log(response)
                if (response.includes(input)) {
                    flag = flag + 1
                    // console.log("true")
                    data.innerHTML += `<div id="mycard" class="card mycard m-2" style="width: 18rem;">
            <div class="imagediv">
            <img class="card-img-top myimage" src="${res[i].image}" alt="Card image cap">
            </div>
            <div class="card-body">
            <div class="tit">
            <h5 class="card-title title">${res[i].title}</h5>
            </div>
            <p class="card-text myp">Price: ${res[i].price}$</p>
            <p class="card-text myp2">${res[i].category}</p>
            <a class="btn btn-primary" onclick="tog('${i}')">Explore More</a>
            </div>
            </div>`
                    loadermain.classList.add("d-none")
                    inpp.value = ""
                }
                // console.log(notfound)
            }
            if (flag == 1) {
                // console.log("false")
                loadermain.classList.add("d-none")
                data.appendChild(notfound)
                notfound.classList.remove("d-none")

            }

            loadermain.classList.add("d-none")
            data.style.animation = "fade 2s ease 1"
        })
        .catch(err => {
            console.log("error")
            loadermain.classList.add("d-none")
            data.appendChild(networkerror)
            networkerror.classList.remove("d-none")
        })
}

// category

function recall(value) {
    if (value == "menclothing") {
        value = "men's clothing"
    }
    else if (value == "womenclothing") {
        value = "women's clothing"
    }
    var inpvalue = value.slice(0, 6)
    loadermain.classList.remove("d-none")
    data.innerHTML = ""
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(res => {
            var flag = 1
            for (var i = 0; i < res.length; i++) {
                var rescat = res[i].category.slice(0, 6)
                if (rescat.includes(inpvalue)) {
                    flag = flag + 1
                    // console.log("true")
                    data.innerHTML += `<div id="mycard" class="card mycard m-2" style="width: 18rem;">
            <div class="imagediv">
            <img class="card-img-top myimage" src="${res[i].image}" alt="Card image cap">
            </div>
            <div class="card-body">
            <div class="tit">
            <h5 class="card-title title">${res[i].title}</h5>
            </div>
            <p class="card-text myp">Price: ${res[i].price}$</p>
            <p class="card-text myp2">${res[i].category}</p>
            <a class="btn btn-primary" onclick="tog('${i}')">Explore More</a>
            </div>
            </div>`
                    loadermain.classList.add("d-none")
                    inpp.value = ""
                }
            }

            loadermain.classList.add("d-none")
            data.style.animation = "fade 2s ease 1"
        })
        .catch(err => {
            console.log("error")
            loadermain.classList.add("d-none")
            // notfound.classList.remove("d-none")
            data.appendChild(networkerror)
            networkerror.classList.remove("d-none")
        })
}









let showbtn = document.getElementById("showlogin")
let btn = document.getElementById("btn")
let loginpage = document.getElementById("loginpage")
let email = document.getElementById("email")
let password = document.getElementById("password")
let p1 = document.getElementById("p1")
let p2 = document.getElementById("p2")
let uname = document.getElementById("uname")
let unamediv = document.getElementById("unamediv")
let logincom = document.getElementById("logincom")
let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
email.value = ""
password.value = ""
uname.value = ""

// for border
function showlogin(){
    loginpage.classList.remove("d-none")

}
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("already sign in")
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const signinuseremail = user.email;
        const signinuserget = localStorage.getItem(user.email)
        //   console.log(signinuserget)
        showbtn.classList.add("d-none")
        loginpage.classList.add("d-none")
        logincom.innerHTML = signinuserget.replace(" ", "&nbsp;")
        logincom.classList.remove("d-none")
        // ...
    } else {
        console.log("not sign in")
        // console.log("not sign in")
        // User is signed out
        // ...
    }
});
function border() {

    setInterval(() => {
        if (uname.value != "") {

            uname.style.border = "1px Solid #ff7423"
        }
        else {
            uname.style.border = "1px Solid red"

        }

        if (email.value != "" && email.value.match(emailFormat)) {
            email.style.border = "1px Solid #ff7423"
        }
        else {
            email.style.border = "1px Solid red"
        }
        if (password.value != "" && password.value.length > 7) {

            password.style.border = "1px Solid #ff7423"
        }
        else {
            password.style.border = "1px Solid red"

        }
    }, 1);
}

// for sign up

function signup() {
    border()
    // console.log("sign up")
    if (email.value.match(emailFormat)) {
        email.style.border = "1px Solid #ff7423"
        p1.classList.add("invisible")
        p1.innerHTML = "this email is already registered.."

        if (password.value.length == 0) {
            // console.log("password length 0")
        }
        else if (password.value.length < 8) {

            email.style.border = "1px Solid red"
            password.style.border = "1px Solid red"
            p2.classList.remove("invisible")
        }
        else {
            if (uname.value != "") {

                p2.classList.add("invisible")
                const auth = getAuth();
                email.style.border = "1px Solid #ff7423"
                password.style.border = "1px Solid #ff7423"

                createUserWithEmailAndPassword(auth, email.value, password.value)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        p1.classList.add("invisible")
                        toggle()
                        localStorage.setItem(email.value, uname.value)
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        if (error == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
                            p1.classList.remove("invisible")
                            p1.innerHTML = "this email is already registered.."
                            console.log("error")

                        }
                        const errorMessage = error.message;
                        // ..
                    });
                // let e = localStorage.setItem(email.value, email.value)
                // let p = localStorage.setItem(email.value + "pass", password.value)
                // let u = localStorage.setItem(email.value + "uname", uname.value)
                // alert("registraion completed")
            }
        }
    }
    else {

        p1.classList.remove("invisible")
        p1.style.color = "#ff7423"
        p1.innerHTML = "Please Enter the Valid Email"

    }

}


function login() {
    border()
    // console.log("login")
    // let loginEmail = localStorage.getItem(email.value)
    // let loginPassword = localStorage.getItem(email.value + "pass")
    // let loginuname = localStorage.getItem(email.value + "uname")
    // console.log(loginuname)
    // if (loginEmail == email.value && loginPassword == password.value) {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            p1.classList.add("invisible")
            const user = userCredential.user; console.log("true")
            email.value = ""
            password.value = ""

            const registereduname = localStorage.getItem(user.email)
            showbtn.classList.add("d-none")
            loginpage.classList.add("d-none")
            logincom.innerHTML = registereduname.replace(" ", "&nbsp;")
            logincom.classList.remove("d-none")


            // ...
        })
        .catch((error) => {
            p1.classList.remove("invisible")
            p1.innerHTML = "your email and password is wrong"
            const errorCode = error.code;
            console.log("false")
            const errorMessage = error.message;
        });
    // }
    // showbtn.style="border: none !important;box-shadow: none !important; cursor:default !important;letter-spacing:0px !important;padding: 0px 0px !important;"
    // else {
    // alert("wrong")
    // }

}

function toggle() {
    // email.value = ""
    // password.value = ""
    var para = document.getElementById("para")
    var anc = document.getElementById("anc")
    // console.log(para.innerHTML)
    var para1 = "already have an account"
    var para2 = "don,t have an account"

    if (para.innerHTML == para1) {
        unamediv.classList.add("d-none")
        p2.classList.remove("p22")
        p1.classList.remove("p11")
        p1.classList.add("p1")
        p2.classList.add("p2")
        para.innerHTML = para2
        btn.innerHTML = "LogIn"
        anc.innerHTML = "register now"
        btn.onclick = "login()"
        btn.setAttribute("onclick", "login()")
    }

    else {
        unamediv.classList.remove("d-none")
        p1.classList.remove("p11")
        p1.classList.add("p1")
        para.innerHTML = para1
        btn.innerHTML = "Sign Up"
        anc.innerHTML = "logIn"
        btn.onclick = "data()"
        btn.setAttribute("onclick", "signup()")

    }

}
window.srch = srch
window.login = login
window.signup = signup
window.toggle = toggle
window.showlogin = showlogin
window.tog = tog
window.recall = recall



// for offliine testing

// function offline(){
//     data.innerHTML += `<div class="card mycard m-3" style="width: 20rem;">
//     <div class="imagediv">

//         <img class="card-img-top myimage" src="https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
//             alt="Card image cap">
//     </div>
//     <div class="card-body">
//         <div class="tit">
//          <h5 class="card-title title">dfgdfgdgdgf</h5>
//         </div>
//         <p class="card-text myp">zdddfvxcx</p>
//         <p class="card-text myp2">xcxcxxc</p>
//         <a href="#" class="btn btn-primary">zddsd fc</a>
//     </div>
// </div>`
// }
// console.log(inpp.value.toLowerCase())

