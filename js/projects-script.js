//store projects and display them
const projectsWrapper=document.querySelector(".projects .projects-wrapper")
const middleStateButtons=[...document.querySelector(".projects .middle-state").children]
const st={
    "Finished":0,
    "In Progress":1,
    "Drafted":2
}
window.onload=()=>{
    if(localStorage.projects){
        projectsWrapper.innerHTML=localStorage.projects
    }
    else{
        localStorage.projects=""
    }
    if(!localStorage.checksNum){
        localStorage.checksNum="0".repeat(projectsWrapper.children.length)
    }
    if(!sessionStorage.currentState){
        sessionStorage.currentState="Finished"
    }
    middleStateButtons[st[sessionStorage.currentState]].click()
}
//global functions
async function animatePr(project){
    a=await animate(project,{
        scale:0.3,
        opacity:0,
        y:"-100px",
        duration:400,
    })
    a.revert()
    project.style.display="none"
}
async function animatePrs(prShow,prHide){
    a=await animate(prHide,{
        x:-800,
        opacity:0,
        duration:stagger([300,400])
    })
    prHide.forEach((e)=>{e.style.cssText=`display:none`})
    prShow.forEach((e)=>{e.style.cssText=`display:flex`})
    a.revert()
    b= await animate(prShow,{
        x:{from:-800,to:0},
        opacity:{from:0,to:1},
        duration:stagger([300,400]),
    })
    prShow.forEach((e)=>{e.style.cssText=`display:flex`})
    b.revert()
}
//Create a project
const crProject=document.querySelector(".projects .heading .main-bt")
const popUpPr=document.querySelector("pop-up:nth-child(2)")
const addTaskBtP=document.querySelector("pop-up:nth-child(2) form>div>div:first-child span")
const popUpTasks=document.querySelector("pop-up:nth-child(2) .tasks")

crProject.addEventListener("click",funcPopUpVis.bind(null,popUpPr,false))
addTaskBtP.addEventListener("click",()=>{
    const newIn=document.createElement("input")
    newIn.type="text"
    newIn.required="true"
    newIn.placeholder="Enter a task!"
    popUpTasks.append(newIn)
})

//Add a project
const submitPrForm=document.querySelector("pop-up:nth-child(2) form")
const projectNameIn=document.querySelector("pop-up:nth-child(2) form>input:first-child")
let tasks=[]

submitPrForm.addEventListener("submit",()=>{
    let project=document.createElement("div")
    project.className="project"
    project.setAttribute("state","Drafted")
    project.innerHTML=`
        <div>
            <h2>${projectNameIn.value}</h2>
        </div>
        <div>
        </div>
        <div>
            Drafted
        </div>`   
    for(let i=0;i<popUpTasks.children.length;i++){
        project.children[1].innerHTML+=`
        <p class="task">
            <span title=${popUpTasks.children[i].value}>${popUpTasks.children[i].value} </span>
            <span class="check-box"><i class="icon-check pr"></i></span>
        </p>
        `
    }
    projectsWrapper.append(project)
    funcPopUpVis(popUpPr,true)
    popUpTasks.innerHTML=""
    projectNameIn.value=""
    localStorage.checksNum+="0"
    localStorage.projects=projectsWrapper.innerHTML
    project.getAttribute("state")===sessionStorage.currentState?project.style.display="flex":project.style.display="none"
})

//Set project's state
document.addEventListener("click",(e)=>{
    if(e.target.classList[1]==="pr"){
        const checkBx=e.target.parentElement
        const tasks=checkBx.parentElement.parentElement
        const project=tasks.parentElement
        let checks=localStorage.checksNum.split("")
        let index=[...projectsWrapper.children].indexOf(project)

        if(!checkBx.classList[1]){
            checkBx.classList.add("checked")
            checks[index]=+checks[index]+1
        }
        else{
            checkBx.classList.remove("checked")
            checks[index]=+checks[index]-1
        }

        if(checks[index]==tasks.children.length){
            project.setAttribute("state","Finished")
        }
        else if(checks[index]<tasks.children.length && checks[index]!=0){
            project.setAttribute("state","In Progress")
        }
        else{
            project.setAttribute("state","Drafted")
        }
        project.children[2].innerHTML=project.getAttribute("state")
        localStorage.projects=projectsWrapper.innerHTML
        localStorage.checksNum=checks.join("")
        if(project.getAttribute("state")!==sessionStorage.currentState){
            animatePr(project)
        }
    }
})

//Show or hide a project based of state
const upperDivs=[...document.querySelector(".projects .upper-wrapper").children]
const viewBtns=document.querySelectorAll(`.main-bt[value="View"]`)

middleStateButtons.forEach((ele,i)=>{
    ele.addEventListener("click",()=>{
        projectShow=[]
        projectHide=[]
        middleStateButtons.forEach((e,index)=>{
            e.classList.remove("active")
            upperDivs[index+1].classList.remove("active")
            e.setAttribute("disabled","")
            viewBtns[i].setAttribute("disabled","")
            window.setTimeout(()=>{
                e.removeAttribute("disabled")
                viewBtns[i].removeAttribute("disabled");
            },400)
        })
        ele.classList.add("active")
        upperDivs[i+1].classList.add("active")
        sessionStorage.currentState=ele.value
        let pr=[...projectsWrapper.children]
        pr.forEach((pr)=>{
            pr.getAttribute("state")===sessionStorage.currentState?projectShow.push(pr):projectHide.push(pr)
        })
        animatePrs(projectShow,projectHide)
    })
})
viewBtns.forEach((ele,index)=>{
    ele.addEventListener("click",()=>{
        middleStateButtons[index].click()
        viewBtns.forEach((e,i)=>{
            middleStateButtons[i].setAttribute("disabled","")
            e.setAttribute("disabled","")
            window.setTimeout(()=>{
                middleStateButtons[i].removeAttribute("disabled");
                e.removeAttribute("disabled")
            },400)
        })
        
        
    })
})