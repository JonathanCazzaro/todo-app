const app = {

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
                    todoItem.classList.add('main__todolist__item', 'active');
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
                };
                app.setItemsCounter();
            };
        })
    },

    itemDelete: button => {
        button.addEventListener('click', event => {
            button.parentElement.remove();
            app.setItemsCounter(); // reset item counter
        });
    },

    setItemsCounter: () => {
        let quantity = document.querySelectorAll('.active').length;
        app.itemsCounter.textContent = `${quantity} ${quantity <= 1 ? "item" : "items"} left`;
        // app.itemsCounter.textContent = app.locals.itemsCounter;
    },


    switchTodoState: (item, button, text) => {
        button.addEventListener('click', event => {
            // switch check button to completed state
            button.classList.toggle('checker--completed');
            // switch item content to completed state
            text.classList.toggle('main__todolist__item__contentblock__content--completed');
            if (item.classList.contains('active')) item.classList.replace('active', 'completed')
            else item.classList.replace('completed', 'active');
            app.setItemsCounter(); // reset item counter
        });
    },

    getItemsByState: () => {
        app.selectButtons.forEach(button => {
            button.addEventListener('click', event => {
                const items = document.querySelectorAll('.main__todolist__item');
                let buttonType = event.target.className;
                if (buttonType.includes('selected')) buttonType = buttonType.substring(0, buttonType.lastIndexOf(" ")); // Parse string to exclude 'selected" class
                app.selectButtons.forEach(button => button.classList.remove('selected')); // reset buttons active style
                button.classList.add('selected'); // set active style to triggered button
                switch (buttonType) {
                    case 'main__todolist__footer__filter__element all--elements' :
                        items.forEach(item => item.classList.remove('hidden'));
                        button.classList.add('selected')
                        break;
                    case 'main__todolist__footer__filter__element active--elements' :
                        items.forEach(item => {
                            if (item.classList.contains('completed')) {
                                item.classList.add('hidden');
                            } else {
                                item.classList.remove('hidden');
                            };
                        });
                        break;
                    case 'main__todolist__footer__filter__element completed--elements' :
                        items.forEach(item => {
                            if (item.classList.contains('completed')) {
                                item.classList.remove('hidden');
                            } else {
                                item.classList.add('hidden');
                            };
                        });
                        break;
                };
            });
        });
    },

    clearCompleted: () => {
        app.clearButton.addEventListener('click', event => {
            const completedItems = document.querySelectorAll('.completed');
            completedItems.forEach(item => item.remove());
        });
    },


    init: () => {
        app.input = document.querySelector('#new-todo');
        app.todoContainer = document.querySelector('.main__todolist__itemscontainer');
        app.itemsCounter = document.querySelector('.main__todolist__footer__itemscounter');
        app.selectButtons = document.querySelectorAll('ul.main__mobilefilter .main__todolist__footer__filter__element');
        app.clearButton = document.querySelector('.main__todolist__footer__clear');
        app.buildNewTodos();
        app.setItemsCounter();
        app.getItemsByState();
        app.clearCompleted();
    }
}

document.addEventListener('DOMContentLoaded', app.init);