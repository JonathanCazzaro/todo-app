const app = {

    locals: {
        itemsCounter: 0,
    },
        
    buildNewTodos: () => {
        // Let's first listen to the input
        app.input.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const inputContent = event.originalTarget.value;
                if (!inputContent) { // User cannot create an empty todo
                    app.input.placeholder = "Nothing to do, huh ?";
                    app.input.style.color = '#ff423d';
                    let timer = setTimeout(() => {
                        app.input.placeholder = "Create a new todo...";
                        app.input.style.color = '';
                    }, 4000);
                } else {
                    // Then create the structure of the Todo
                    event.originalTarget.value = '';
                    const todoItem = document.createElement('div');
                    todoItem.classList.add('main__todolist__item');
                    const contentBlock = document.createElement('div');
                    contentBlock.classList.add('main__todolist__item__contentblock');
                    const checker = document.createElement('span');
                    checker.classList.add('checker');
                    const itemContent = document.createElement('p');
                    itemContent.classList.add('main__todolist__item__contentblock__content');
                    itemContent.textContent = inputContent;
                    const deleteButton = document.createElement('img');
                    deleteButton.classList.add('main__todolist__item__delete');
                    deleteButton.src = './images/icon-cross.svg';
                    deleteButton.alt = '';     
                    // Listen to click on the check button               
                    app.switchTodoState(todoItem, checker, itemContent);
                    // Listen to click on the delete button
                    app.itemDelete(deleteButton);
                    contentBlock.appendChild(checker);
                    contentBlock.appendChild(itemContent);
                    todoItem.appendChild(contentBlock);
                    todoItem.appendChild(deleteButton);
                    app.todoContainer.appendChild(todoItem);
                    app.locals.itemsCounter++; // increment item counter
                };
                app.setItemsCounter();
            };
        })
    },
    
    itemDelete: button => {
        button.addEventListener('click', event => {
            button.parentElement.remove();
            app.locals.itemsCounter--; // decrement item counter
            app.setItemsCounter(); // reset item counter
        });
    },

    setItemsCounter: () => {
        app.itemsCounter.textContent = app.locals.itemsCounter;
    },


    switchTodoState: (item, button, text) => {
        button.addEventListener('click', event => {
            // switch check button to completed state
            button.classList.toggle('checker--completed');
            // switch item content to completed state
            text.classList.toggle('main__todolist__item__contentblock__content--completed');
            item.classList.toggle('completed');
        });
    },

    getItemsByState: () => { // ATTENTION IL Y A DEUX OCCURRENCES DES BOUTONS DANS LA PAGE
        console.log(app.buttonAll);
        app.buttonAll.addEventListener('click', event => {
            const items = document.querySelectorAll('.main__todolist__item');
            items.forEach(item => {
                if (item.classList.contains('completed hidden')) item.classList.remove('hidden');                
            })            
        });
        app.buttonActive.addEventListener('click', event => {
            console.log('ok');
            const items = document.querySelectorAll('.main__todolist__item');
            items.forEach(item => {
                if (item.classList.contains('completed')) item.classList.add('hidden');
            });
        });
    },
    
    
    init: () => {
        app.input = document.querySelector('#new-todo');
        app.todoContainer = document.querySelector('.main__todolist__itemscontainer');
        app.itemsCounter = document.querySelector('.dynamic--itemscounter');
        app.buttonCompleted = document.querySelector('.completed--elements');
        app.buttonActive = document.querySelector('.active--elements');
        app.buttonAll = document.querySelector('.all--elements');
        app.buildNewTodos();
        app.setItemsCounter();
        app.getItemsByState();
    }
}

document.addEventListener('DOMContentLoaded', app.init);