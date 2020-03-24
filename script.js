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
    // TODO: think about changing naming.
    //  You can start from here - https://www.crockford.com/code.html
    //  and here - https://google.github.io/styleguide/jsguide.html#naming
    function createMain() {
        // TODO: naming
        let main = document.createElement('main');
        // TODO: naming
        let arrow = document.createElement('div');
        // TODO: naming
        let inputMain = document.createElement('input');
        // TODO: classList doesn't expect "string" type. Use className instead
        main.classList = 'content';
        arrow.classList = 'arrow';

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
        // TODO: naming
        let todoItemInput = document.createElement('input');
        // TODO: naming
        let todoItemLabel = document.createElement('label');
        // TODO: naming
        let todoItemText = document.createElement('p');
        // TODO: naming
        let todoItemButton = document.createElement('button');

        // TODO: classList doesn't expect "string" type. Use className instead
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
        // TODO: naming
        let counter = document.createElement('div');
        // TODO: naming
        let counterItem = document.createElement('div');
        // TODO: naming
        let counterText = document.createElement('p');
        // TODO: naming
        let buttons = document.createElement('div');
        let buttonAll = document.createElement('button');
        let buttonActive = document.createElement('button');
        let buttonCompleted = document.createElement('button');
        // TODO: naming
        let clear = document.createElement('div');
        // TODO: naming
        let link = document.createElement('a');

        // TODO: classList doesn't expect "string" type. Use className instead
        footer.classList = 'footer';
        counter.classList = 'counter';
        counterItem.classList = 'counter-item';
        buttons.classList = 'buttons';
        clear.classList = 'clear';

        // TODO: Do not use innerText here. Think about different way of dong that
        counterItem.innerText = data.todos.forEach((item) => {
            let count = 0;
            // TODO: what was your intentions to do that? What did you tried to do?
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

//TODO: NEXT STEPS:
// 1. Add new method called 'idGenerator' and add unique ID to all your todos
// 2. Finish with isActive. Make it work for all your todos. It is not working properly right now. NOTE: 'idGenerator' might be handy in here.
// 3. Fix active events counter(Left bottom corner). Make it work properly.
// 4. Add logic for 'Clear completed' button. When clicking it should delete all checked todos. NOTE: 'idGenerator' might be handy
// 5. Add logic for creating new todo. When you write something in top input and press 'enter' button - new todo should be added to your list and displayed. Make it to remove unneeded spaces first so texts like '        ' won't be added.

