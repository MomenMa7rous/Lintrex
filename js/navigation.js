
const btns = document.querySelectorAll("li.nav-btn")
const sections = document.querySelectorAll("section")

window.addEventListener("load", (e) => {
    sections.forEach(sec => sec.style.display = "none")
    btns.forEach(btn => btn.classList.remove("active"))
    if (window.location.hash) {
        document.querySelector(window.location.hash).style.display = "block"
        document.getElementById(`${window.location.hash.slice(1)}-btn`).classList.add("active")
    }
    else {
        window.location.hash = "home"
        document.getElementById("home-btn").classList.add("active")
        document.getElementById("home").style.display = "block"
    }
})

for (let btn of btns) {
    btn.addEventListener("click", (e) => {
        btns.forEach(btn => btn.classList.remove("active"))
        btn.classList.add("active")
        sections.forEach(sec => sec.style.display = "none")
        window.location.hash = btn.id.split("-")[0]
        document.getElementById(btn.id.split("-")[0]).style.display = "block"
    })
}