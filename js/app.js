const app = {
        
    buildNewTodo: () => {
        app.input.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const inputContent = event.originalTarget.value;
                if (!inputContent) {
                    app.input.placeholder = "Nothing to do, huh ?";
                    app.input.style.color = '#ff423d';
                    setTimeout(() => {
                        app.input.placeholder = "Create a new todo...";
                        app.input.style.color = '';
                    }, 4000);
                } else {
                    event.originalTarget.value = '';
                    const todoItem = document.createElement('div');
                    todoItem.classList.add('main__todolist__item');
                    todoItem.innerHTML = `<p class="main__todolist__item--content">
                    <span class="checker"></span>${inputContent}</p>`;
                    // <svg class="main__todolist__item--delete" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;
                    const deleteButton = document.createElement('svg');
                    deleteButton.outerHTML = `<svg class="main__todolist__item--delete" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;
                    deleteButton.addEventListener('click', event => {
                        console.log('OK');
                        deleteButton.parentElement.remove();
                    });
                    todoItem.appendChild(deleteButton);
                    app.todoContainer.appendChild(todoItem);                    
                };
                app.setItemsQuantity();
            };
        })
    },
    
    setItemsQuantity: () => {
        const getItems = document.querySelectorAll('.main__todolist__item');
        app.itemsCounter.textContent = getItems.length;
    },

    // removeTodo: () => {
    //     const deleteButton = document.querySelectorAll('.main__todolist__item--delete');
    //     deleteButton.forEach(element => {
    //         console.log(element);
    //         element.addEventListener('click', event => {
    //             console.log('OK');
    //             element.parentElement.remove();
    //         });
    //     });
    // }, 
    
    
    init: () => {
        app.input = document.querySelector('#new-todo');
        app.todoContainer = document.querySelector('.main__todolist__itemscontainer');
        app.itemsCounter = document.querySelector('.dynamic--itemscounter');
        app.buildNewTodo();
        app.setItemsQuantity();
        // app.removeTodo();
    }
}

document.addEventListener('DOMContentLoaded', app.init);