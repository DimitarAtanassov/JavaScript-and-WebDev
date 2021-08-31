const button = document.querySelector('button');    //Can just use this querySelector to select the first button on the html page
const todoBoard = document.querySelector('.taskBoard');     //Selectes the element with the class of taskBoard
const removeButton = document.querySelector('#remove');
const ul = document.querySelector('#taskList');     //Selects the UL from the linked HTML
const form = document.querySelector('form');

const addTodo = (e) => {
    e.preventDefault();
    const userInput = document.querySelector('#task').value;  //This will get the userInput from the text input type w/ id of task
    const li = document.createElement('Li');    //Creates an Li element
    const textNode = document.createTextNode(userInput);    //Creates a textNode so we can save userInput to an LI
    const checkbox = document.createElement('input');       //Creates a new input element  
    checkbox.type = 'checkbox'; //Makes the input type a checkbox
    checkbox.id = "checkBox";   //Everytime a new checkbox is created it is given th id of checkBox we will use this later on in our code
    li.appendChild(checkbox);   //Appends the check box to the LI
    li.appendChild(textNode);   //Appends user Input to LI
    ul.appendChild(li);     //Appends newly created LI w/ user input to ul
    form.reset();

}

const removeTodo = (e) => {
    let items = ul.getElementsByTagName('li');  //In the taskList ul which is saved in the var ul get all the li elements
    for (item of items) {   //For every li in array
        const itemCB = item.lastElementChild;   //Get the checkbox  
        if (itemCB.checked === true) {      //If the checkbox is checked
            ul.removeChild(item);   //Remove the li
        }
    }
}


button.addEventListener('click', addTodo);      //This function will run when the button on the webpage is selected
removeButton.addEventListener('click', removeTodo);