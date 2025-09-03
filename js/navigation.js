
const btns = document.querySelectorAll("li.nav-btn")
const sections = document.querySelectorAll("section")

window.addEventListener("load", (e) => {
    sections.forEach(sec => sec.style.display = "none")
    document.getElementById("home").style.display = "block"
})

for (let btn of btns) {
    btn.addEventListener("click", (e) => {
        sections.forEach(sec => sec.style.display = "none")
        document.getElementById(btn.id.split("-")[0]).style.display = "block"
    })
}