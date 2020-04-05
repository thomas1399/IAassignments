var gamelist = [];
var formIndex = 0;
var index = 0;
function saveGame(id){
    var form = document.getElementById("form " + id);
    var line = document.createElement("div");
    line.setAttribute('id', "line " + id);
    var title = document.createElement("p");
    var producer = document.createElement("p");
    var editBtn = document.createElement("button");
    editBtn.setAttribute('type', "button");
    editBtn.innerHTML = "Edit";
    editBtn.setAttribute('onclick', "editEntry(" + id + ")");
    var delBtn = document.createElement("button");
    delBtn.setAttribute('type', "button");
    delBtn.innerHTML = "Delete";
    delBtn.setAttribute('onclick', "removeEntry(" + id + ")");
    title.innerHTML = document.getElementById("game_title " + id).value;
    producer.innerHTML = document.getElementById("game_producer " + id).value;
    producer.setAttribute('id', "prod " + id);
    title.setAttribute('id', "titl " + id);
    producer.setAttribute('class', "col-4");
    title.setAttribute('class', "col-4");
    line.appendChild(producer);
    line.appendChild(title);
    line.appendChild(editBtn);
    line.appendChild(delBtn);
    document.getElementById("list_container").replaceChild(line, form);
    removeNewEntry(id);
    index = index + 1;
}
function editEntry(id){
    var form = makeForm();
    var element = document.getElementById("line " + id);
    var game_producer = document.getElementById("prod " + id);
    var game_title = document.getElementById("titl " + id);
    /*var aux = document.createElement("p");
    aux.innerHTML = game_producer.textContent + " " + game_title.textContent;*/
    form.childNodes[0].value = game_producer.textContent;
    form.childNodes[1].value = game_title.textContent;
    //form.childNodes[2].setAttribute('onclick', "editEntry(" + id + ")")
    document.getElementById('list_container').replaceChild(form, element);
}
function removeNewEntry(id){
    var element = document.getElementById("form " + id);
    element.parentNode.removeChild(element);
}
function removeEntry(id){
    var element = document.getElementById("line " + id);
    element.parentNode.removeChild(element);
    index = index - 1;
}
function makeForm(){
    var f = document.createElement("form");
    f.setAttribute('id', "form " + formIndex);
    var producer = document.createElement("input");
    producer.setAttribute('type', "text");
    producer.setAttribute('name', "producer");
    producer.setAttribute('id', "game_producer " + formIndex);
    var title = document.createElement("input");
    title.setAttribute('type', "text");
    title.setAttribute('name', "title");
    title.setAttribute('id', "game_title "+formIndex);
    var submit = document.createElement("button");
    submit.setAttribute('type', "button");
    submit.innerHTML = "Save";
    submit.setAttribute('onclick', "saveGame(" + formIndex + ")");
    var remove = document.createElement("button");
    remove.setAttribute('type', "button");
    remove.innerHTML = "Remove";
    remove.setAttribute('onclick', "removeNewEntry(" + formIndex +")");
    producer.setAttribute('class', "col-4");
    title.setAttribute('class', "col-4");
    f.appendChild(producer);
    f.appendChild(title);
    f.appendChild(submit);
    f.appendChild(remove);
    formIndex = formIndex + 1;
    return f;

}
function addGame(){
    var f = makeForm();
    document.getElementById('list_container').appendChild(f);
}
