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


// 1: for single document or set doc for manual id
  
  // await addDoc(collection(db, "new"), {
  // name: "whatsup doc",
  // utime: time
  // });





// 2: get collection with query useful for categories section

// const q = query(collection(db, "cities"), where("capital", "==", true));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });




  // 3: get complete collection
  
  //   const querySnapshot = await getDocs(collection(db, "my users"));
  // querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });





 // imp
  // by sorting working of ref collection

//   const querySnapshot = await getDocs(query(collection(db, "new"),orderBy("utime","desc")));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   // console.log(doc.id, " => ", doc.data());
//   heading.innerHTML += `${doc.data().name}<br>`
// });



// uploading image

// const uploadfile =(file)=>{
//     return new Promise((resolve,reject)=>{
      
//       const storageRef = ref(storage, `images/users/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on('state_changed', 
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//           case 'paused':
//             console.log('Upload is paused');
//             break;
//             case 'running':
//               console.log('Upload is running');
//               break;
//             }
//       }, 
//       (error) => {
//         reject(error)
//       }, 
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           resolve(downloadURL)
//         });
//       }
//       );
//     })
//   }
//     try{
  
//     //   var file = document.getElementById("file")
//       const res = await uploadfile(pfile.files[0])
//       console.log( "URL",res)
//       let image = res
//     }catch(err){
//         console.log(err)
        
//     }