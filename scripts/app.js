document.getElementById('formTask').addEventListener('submit',save);
window.onload = getTasks;
function save(e){
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    executeSave(title, description, 'tasks');
    document.getElementById('formTask').reset();
    getTasks();
}
function executeSave(title, description, savedIssues){
    const task = {
        title,
        description
    }
    if(localStorage.getItem(savedIssues) === null){
        let resolvedIssues = [];
        resolvedIssues.push(task);
        localStorage.setItem(savedIssues, JSON.stringify(resolvedIssues));
    } else {
        let resolvedIssues = JSON.parse(localStorage.getItem(savedIssues));
        resolvedIssues.push(task);
        localStorage.setItem(savedIssues, JSON.stringify(resolvedIssues));
    }
}
function getTasks(){
    const buttonClass = 'btn btn-warning';
    const tasksToFind = 'tasks';
    const tasks = JSON.parse(localStorage.getItem(tasksToFind));
    const viewTasks = document.getElementById('tasks');
    printIssues(tasks, viewTasks, tasksToFind, buttonClass);
}
function printIssues(tasks, viewTasks, tasksToFind, buttonClass){
    viewTasks.innerHTML = '';
    for(let i = 0; i<tasks.length; i++){
        const title = tasks[i].title;
        const description = tasks[i].description;
        viewTasks.innerHTML += `
        <div data-row="${title}" id="sadd" class="card mb-4 mt-2">
            <div class="card-header">
                <p>${title}</p>   
            </div>
            <div id="${title}" class="card-body">
                <p> ${description}</p>
            </div>
            <div class="buttons">
                <a id="edit${title}" class="btn btn-warning" onclick="edit(this)">
                    Editar
                </a>
                <a class="btn btn-danger" onclick="resolveIssue('${title}','${tasksToFind}')">
                    Borrar
                </a>
            </div>
        </div>`;
    const ele = document.getElementById(title);
    ele.innerText = '';
    ele.innerText = description;
    }
}
function resolveIssue(title, tasksToFind){
    let message = 'This action will send the ticket to resolved issues queue. Proceed with ticket: ? ';
    let tasks = JSON.parse(localStorage.getItem(tasksToFind));
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].title == title){
            if(window.confirm(message + title)){
                tasks.splice(i, 1);
                localStorage.setItem(tasksToFind, JSON.stringify(tasks));
            }
        }
    }
    getTasks();
}


