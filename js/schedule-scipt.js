const {animate,stagger} =anime;

//Load tasks
const taskCont=document.querySelector(".tasks-box .tasks")
const doneTaskCont=document.querySelector("#schedule>div:nth-child(2) .done-tasks")

window.onload=function(){
    if(window.localStorage.tasks){
        taskCont.innerHTML=window.localStorage.tasks
    }
    else{
        window.localStorage.tasks=""
    }
    if(window.localStorage.doneTasks){
        doneTaskCont.innerHTML=window.localStorage.doneTasks
    }
    else{
        window.localStorage.doneTasks=""
    }
}
//Add tasks
const overlay=document.getElementsByTagName("overlay")[0];
const popUp1=document.querySelector("pop-up:first-of-type");
const addTaskBt=document.querySelector("#schedule buttons input:first-child")
const submitTaskForm=document.querySelector("pop-up:first-of-type form")
const taskInput=document.querySelector("pop-up:first-of-type input[type=\"text\"]")
const removePopUp=document.querySelectorAll("pop-up>img");

function funcPopUpVis(popUp,hide,e){
    console.log(popUp,"1 ");
    console.log(hide,"2 ");
    console.log(e,"3 ");
    if(hide){
        overlay.style.display="none";
        popUp.style.display="none";
        return
    }
    overlay.style.display="block";
    popUp.style.display="flex";
}
removePopUp.forEach((ele)=>{
    ele.addEventListener("click",funcPopUpVis.bind(null,ele.parentElement,true))
})
addTaskBt.addEventListener("click",funcPopUpVis.bind(null,popUp1,false))

submitTaskForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    let task=`                            
    <p class="task">
    <span  title=${taskInput.value}>${taskInput.value}</span>
    <span class="check-box"><i class="icon-check sched"></i></span>
    </p>`
    taskCont.innerHTML+=task
    window.localStorage.tasks=taskCont.innerHTML
    taskInput.value = ""
    funcPopUpVis(popUp1,true)
})

// Finish task
const checkBox=document.querySelectorAll("#schedule>div:nth-child(2) .tasks .check-box")
document.addEventListener("click",(e)=>{
    const doneTaskCont=document.querySelector("#schedule>div:nth-child(2) .done-tasks")
    if(e.target.classList[1]==="sched" && e.target.parentElement.classList.length===1){
        ele=e.target.parentElement.parentElement
        console.log(taskCont);
        taskCont.removeChild(ele)
        doneTaskCont.innerHTML+=`
        <p class="task done">
            <span title=${ele.children[0].innerHTML}>${ele.children[0].innerHTML}</span>
            <span class="check-box checked"><i class="icon-check sched"></i></span>
        </p>
        `
        window.localStorage.tasks=taskCont.innerHTML
        window.localStorage.doneTasks=doneTaskCont.innerHTML
    }
})

// Clear all done tasks
const doneTaskBt=document.querySelector("#schedule buttons input:last-child");
const doneTasksBox=document.querySelector("#schedule .done-tasks-box");

async function applyAnimation(){
    const a = await animate("#schedule>div:nth-child(2) .done-tasks p",{
         y:"-150%",
         frameRate:120,
         opacity:0,
         delay: stagger([100,500]),
         duration: 700,
     })
     try{
        const doneTasks=document.querySelector("#schedule .done-tasks");
        const newD=document.createElement("div");
        newD.classList.add("done-tasks");
        doneTasksBox.replaceChild(newD,doneTasks);
        window.localStorage.doneTasks=""
     }
     catch(e){
     }
}

doneTaskBt.addEventListener("click",()=>{
    applyAnimation();
})