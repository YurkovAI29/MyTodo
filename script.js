function createTodoList(classBlock) {

    wrapper = document.querySelector(classBlock); 
    let todoListFragment = document.createDocumentFragment();

    let data = {
        todos: [{
            isActive: false,
            title: "buy milk"
            },
            {
            isActive: true,
            title: "buy bread"  
            },
            {
            isActive: false,
            title: "buy beer"
            },
        ]
    };

    function createHeader() {
        let header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = "<h1>todos</h1>";
        return header;
    }

    function createMain() {
        let main = document.createElement('main');
        let arrow = document.createElement('div');
        let inputMain = document.createElement('input');
        
        main.classList = 'content';
        arrow.classList = 'arrow';

        inputMain.placeholder = ('What needs to be done?');

        main.append(arrow);
        main.append(inputMain);
        return main;
    }

    let todos = data.todos.map((item) => {
        let todoItemDiv = document.createElement('div');
        let todoItemInput = document.createElement('input');
        let todoItemLabel = document.createElement('label');
        let todoItemText = document.createElement('p');
        let todoItemButton = document.createElement('button');

        todoItemDiv.classList = 'todo_item';
        todoItemButton.classList = 'delete_item';
        todoItemInput.id = 'todo_item';

        todoItemLabel.setAttribute('for', 'todo_item');
        todoItemText.innerText = item.title;

        todoItemInput.type = 'checkbox';
        todoItemInput.checked = item.isActive;

        todoItemDiv.append(todoItemInput);
        todoItemDiv.append(todoItemLabel);
        todoItemDiv.append(todoItemText);
        todoListFragment.appendChild(todoItemDiv);
        todoItemDiv.append(todoItemButton);

        return todoItemDiv;
    });
    
    function createFooter() {
        let footer = document.createElement('footer');
        let counter = document.createElement('div');
        let counterItem = document.createElement('div');
        let counterText = document.createElement('p');
        let buttons = document.createElement('div');
        let buttonAll = document.createElement('button');
        let buttonActive = document.createElement('button');
        let buttonCompleted = document.createElement('button');
        let clear = document.createElement('div');
        let link = document.createElement('a');

        footer.classList = 'footer';
        counter.classList = 'counter';
        counterItem.classList = 'counter-item';
        buttons.classList = 'buttons';
        clear.classList = 'clear';

        counterItem.innerText = data.todos.forEach((item) => {
            let count = 0;
            if (item.isActive === false) {
                count++;
            }
            return count;
        });
        counterText.innerText = 'items left';
        buttonAll.innerText = 'All';
        buttonActive.innerText = 'Active';
        buttonCompleted.innerText = 'Completed';
        link.innerText = 'Clear completed';

        

        footer.append(counter);
        counter.append(counterItem);
        counter.append(counterText);
        footer.append(buttons);
        buttons.append(buttonAll);
        buttons.append(buttonActive);
        buttons.append(buttonCompleted);
        footer.append(clear);
        clear.append(link);

        return footer;
    }

    wrapper.append(createHeader());
    wrapper.append(createMain());
    wrapper.append(todoListFragment);
    wrapper.append(createFooter());
}
createTodoList('.wrapper');

