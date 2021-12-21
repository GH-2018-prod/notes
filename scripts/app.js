document.getElementById('formTask').addEventListener('submit',save);
window.onload = getTasks(),showResolvedIssues();
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
    const resolve = 'Resolve';
    const buttonClass = 'btn btn-warning';
    const tasksToFind = 'tasks';
    const tasks = JSON.parse(localStorage.getItem(tasksToFind));
    const viewTasks = document.getElementById('tasks');
    const message = 'This action will send the ticket to resolved issues queue. Proceed with ticket: ? ';
    printIssues(tasks, viewTasks, message, tasksToFind, buttonClass, resolve);
}
function printIssues(tasks, viewTasks, message, tasksToFind, buttonClass, resolveDelete){
    viewTasks.innerHTML = '';
    for(let i = 0; i<tasks.length; i++){
        const title = tasks[i].title;
        const description = tasks[i].description;
        viewTasks.innerHTML += `
            <div class="card mb-4">
                <div class="card-body">
                    <p>${title}</p>   
                </div>
                <div class="card-body ">
                    <p>Description: ${description}</p>
                    <a class="${buttonClass}" onclick="resolveIssue('${title}','${description}','${tasksToFind}','${message}')">
                        ${resolveDelete}
                    </a>
                </div>
            </div>
        `;
    }
}
function resolveIssue(title, description, tasksToFind, message){
    let tasks = JSON.parse(localStorage.getItem(tasksToFind));
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].title == title){
            if(window.confirm(message + title)){
                tasks.splice(i, 1);
                localStorage.setItem(tasksToFind, JSON.stringify(tasks));
                if(tasksToFind == 'tasks'){
                    executeSave(title, description, 'resolvedIssues');
                }
                showResolvedIssues();
            }
        }
    } 
    getTasks();
}
function showResolvedIssues(){
    const remove = 'Delete';
    const buttonClass = 'btn btn-success';
    const tasksToFind = 'resolvedIssues';
    const resolvedIssues = JSON.parse(localStorage.getItem(tasksToFind));
    const viewTasks = document.getElementById('resolvedIssues');
    const message = 'This task has been completed. Feel free to delete from list?: ';
    printIssues(resolvedIssues, viewTasks, message, tasksToFind, buttonClass, remove);
}