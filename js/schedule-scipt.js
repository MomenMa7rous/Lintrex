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
const popUp=document.querySelector("pop-up:first-of-type");
const addTaskBt=document.querySelector("#schedule buttons input:first-child")
const submitTaskForm=document.querySelector("pop-up form")
const taskInput=document.querySelector("pop-up input[type=\"text\"]")
const removePopUp=document.querySelector("pop-up img");

addTaskBt.addEventListener("click",()=>{
    overlay.style.display="block";
    popUp.style.display="flex";
    console.log("f");
})

removePopUp.addEventListener("click",()=>{
    overlay.style.display="none";
    popUp.style.display="none";
})

submitTaskForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    overlay.style.display="none";
    popUp.style.display="none";
    let task=`                            
    <p class="task">
        <span  title=${taskInput.value}>${taskInput.value}</span>
        <span class="check-box"><i class="icon-check"></i></span>
    </p>`
    taskCont.innerHTML+=task
    window.localStorage.tasks=taskCont.innerHTML
})

// Finish task
const checkBox=document.querySelectorAll("#schedule>div:nth-child(2) .tasks .check-box")
document.addEventListener("click",(e)=>{
    const doneTaskCont=document.querySelector("#schedule>div:nth-child(2) .done-tasks")
    if(e.target.className==="icon-check" && e.target.parentElement.classList.length===1){
        ele=e.target.parentElement.parentElement
        console.log(taskCont);
        taskCont.removeChild(ele)
        doneTaskCont.innerHTML+=`
        <p class="task done">
            <span title=${ele.children[0].innerHTML}>${ele.children[0].innerHTML}</span>
            <span class="check-box checked"><i class="icon-check"></i></span>
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
        window.localStorage.doneTasks=doneTasksBox.innerHTML
     }
     catch(e){
     }
}

doneTaskBt.addEventListener("click",()=>{
    applyAnimation();
})