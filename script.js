function createTodoList(classBlock) {

    let wrapper = document.querySelector(classBlock); 
    

    let data = {
        todos: [
            {
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
        
        main.className = 'content';
        arrow.className = 'arrow';

        inputMain.placeholder = ('What needs to be done?');
        inputMain.addEventListener('keydown', (enterKey) => {
            if (enterKey.keyCode === 13) {
                console.log(inputMain.value);
                data.todos.push({
                    isActive: false,
                    title: inputMain.value
                });
                console.log(inputMain.value);
                console.log(data.todos);
                data.todos.map(createdTodos);
                inputMain.value = '';
            }
            return;
        });

        main.append(arrow);
        main.append(inputMain);
        return main;
    }

    function createdSingleTodo(item) {
       
        let todoItemDiv = document.createElement('div');
        let todoItemInput = document.createElement('input');
        let todoItemLabel = document.createElement('label');
        let todoItemText = document.createElement('p');
        let todoItemButton = document.createElement('button');

        todoItemDiv.className = 'todo_item';
        todoItemButton.className = 'delete_item';
        todoItemInput.id = 'todo_item';

        todoItemLabel.setAttribute('for', 'todo_item');
        todoItemText.innerText = item.title;

        todoItemInput.type = 'checkbox';
        todoItemInput.checked = item.isActive;

        todoItemDiv.append(todoItemInput);
        todoItemDiv.append(todoItemLabel);
        todoItemDiv.append(todoItemText);
        todoItemDiv.append(todoItemButton);

        return todoItemDiv;
    }

    function createdAllTodos(todos) {
        let list = document.createElement('div');

        todos.forEach(item => list.append(createdSingleTodo(item)));

        return list;
    }
    
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

        footer.className = 'footer';
        counter.className = 'counter';
        counterItem.className = 'counter-item';
        buttons.className = 'buttons';
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
    wrapper.append(createdAllTodos(data.todos));
    wrapper.append(createFooter());
}
createTodoList('.wrapper');

