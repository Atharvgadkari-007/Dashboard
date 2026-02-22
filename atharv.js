import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6W9ZOzfp4cF7ZWu7oxE3tCuX3TMtwT7o",
    authDomain: "catalyst-999aa.firebaseapp.com",
    projectId: "catalyst-999aa",
    storageBucket: "catalyst-999aa.firebasestorage.app",
    messagingSenderId: "690802861199",
    appId: "1:690802861199:web:fac1ab5ab7f60a3e797cfa"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.addStudent = async function () {
    const name = document.getElementById("nameInput").value.trim();
    const github = document.getElementById("githubInput").value.trim();
    const skill = document.getElementById("skillInput").value.trim();
    if (name === "") {
        alert("Enter your name");
        return;
    }
    await addDoc(collection(db, "students"), {
        name: name,
        github: github,
        skills: skill ? [skill] : []
    });
    document.getElementById("nameInput").value = "";
    document.getElementById("githubInput").value = "";
    document.getElementById("skillInput").value = "";
    loadStudents();
};
async function loadStudents() {
    const list = document.getElementById("studentList");
    list.innerHTML = "";
    const snapshot = await getDocs(collection(db, "students"));
    snapshot.forEach(doc => {
        const data = doc.data();
        list.innerHTML += `
      <div class="card">
        <h3>${data.name}</h3>
        ${data.github ? `<a href="${data.github}" target="_blank">GitHub</a>` : ""}
        ${data.skills.length ? `<p>Skills: ${data.skills.join(", ")}</p>` : ""}
      </div>
    `;
    });
}
loadStudents();