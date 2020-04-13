function createTodoList(classBlock) {
    let wrapper = document.querySelector(classBlock);
    let data = {
        todos: [
            {
            isActive: false,
            title: "buy milk",
            id: idGenerator(0, 10000)
            },
            {
            isActive: false,
            title: "buy bread",
            id: idGenerator(0, 10000)
            },
            {
            isActive: false,
            title: "buy beer",
            id: idGenerator(0, 10000)
            },
        ]
    };
    // TODO: don't forget console.logs and debuggers in code
    console.log(data.todos);

    // TODO: method should be an action, e.g. "genereateId"
    // TODO: remove unneeded arguments. Keep it clear so all logic placed only inside this method
    function idGenerator(min, max) {
        // TODO: make readable variables. E.g. "randomNumber" or "generatedId"
        let int = Math.floor(Math.random() * (max - min + 1)) + min;

        return int.toString(10);
    }

    function createHeader() {
        let header = document.createElement('header');
        header.classList.add('header');
        header.innerHTML = "<h1>todos</h1>";
        return header;
    }

    function createMain() {
        // E.g.: "wrapper" or "todosWrapper" or "mainWrapper"
        let main = document.createElement('main');
        // E.g.: "selectAll" or "selectAllTodos"
        let arrow = document.createElement('div');
        // E.g.: "todosInput" or "newTodoInput"
        let inputMain = document.createElement('input');
        main.classList.add('content');
        arrow.classList.add('arrow');

        inputMain.placeholder = ('What needs to be done?');
        // TODO: always move eventlistener callback to separated function
        inputMain.addEventListener('keydown', (enterKey) => {
            if (enterKey.keyCode === 13) {
                data.todos.push({
                    isActive: false,
                    title: inputMain.value,
                    id: idGenerator(0, 10000)
                });
                console.log(inputMain.value);
                console.log(data.todos);

                // TODO: You should rewrite this logic and move it to separated function.
                // TODO: Ideally there should be first method which adding new todo and second one which redrawing it
                let removeWrapperTodos = document.querySelector('.wrapperTodos');
                let main = document.querySelector('.content');
                console.log(removeWrapperTodos);
                removeWrapperTodos.remove();
                main.after(createdAllTodos(data.todos));
                calculateActiveTodos(data.todos);
                let removeFooter = document.querySelector('.footer');
                removeFooter.remove();
                wrapper.append(createFooter());
                inputMain.value = '';
            }
            return;
        });

        main.append(arrow);
        main.append(inputMain);
        return main;
    }

    function createdSingleTodo(item) {
        // TODO: E.g. "wrapper" or "todoWrapper"
        let todoItemDiv = document.createElement('div');
        // TODO: E.g. "input" or "todoInput"
        let todoItemInput = document.createElement('input');
        // TODO: E.g. "label" or "todoLabel"
        let todoItemLabel = document.createElement('label');
        // TODO: E.g. "text" or "todoText"
        let todoItemText = document.createElement('p');
        // TODO: E.g. "deleteTodo"
        let todoItemButton = document.createElement('button');

        todoItemDiv.classList.add('todo_item');
        // TODO: You should delete "todo_item", no?
        todoItemDiv.id = ('todo_item' + item.id);
        todoItemButton.classList.add('delete_item');
        todoItemInput.id = item.id;

        todoItemLabel.setAttribute('for', item.id);
        todoItemText.innerText = item.title;

        todoItemInput.type = 'checkbox';

        // TODO: move callback to separated method
        todoItemInput.addEventListener('click', () => {

            console.log(todoItemInput.id);
            console.log(typeof(todoItemInput.id));

            data.todos.find(item => {
                if (todoItemInput.id === item.id) {
                    if (todoItemInput.checked) {
                        item.isActive = true;
                    } else {
                        item.isActive = false;
                    }
                }
            });

        console.log(data.todos);
        calculateActiveTodos(data.todos);
        let removeFooter = document.querySelector('.footer');
        removeFooter.remove();
        wrapper.append(createFooter());
        });

        // TODO: move callback to separated method
        todoItemButton.addEventListener('click', () => {

            let removeTodo = document.querySelector('#' + todoItemDiv.id);
            console.log(removeTodo);
            removeTodo.remove();

            let newArr = data.todos.filter(item => (todoItemInput.id !== item.id));
            console.log(newArr);
            data.todos.length = 0;
            data.todos = newArr.slice();
            console.log(data.todos);

            calculateActiveTodos(data.todos);
            let removeFooter = document.querySelector('.footer');
            removeFooter.remove();
            wrapper.append(createFooter());

        });



        todoItemDiv.append(todoItemInput);
        todoItemDiv.append(todoItemLabel);
        todoItemDiv.append(todoItemText);
        todoItemDiv.append(todoItemButton);

        return todoItemDiv;
    }

    // TODO: naming. E.g. "createAllTodos"
    function createdAllTodos(todos) {
        let list = document.createElement('div');
        list.classList.add('wrapperTodos');

        todos.forEach(item => list.append(createdSingleTodo(item)));

        return list;
    }

    function createFooter() {
        // TODO: Naming. E.g. "wrapper" or "footerWrapper"
        let footer = document.createElement('footer');
        // TODO: Naming E.g. "counterWrapper" or ""
        let counter = document.createElement('div');
        // TODO: Naming E.g. "counterValue"
        let counterText = document.createElement('p');
        // TODO: Naming E.g. "filtersWrapper"
        let buttons = document.createElement('div');
        // TODO: Naming E.g. "filterAll"
        let buttonAll = document.createElement('button');
        // TODO: Naming E.g. "filterActive"
        let buttonActive = document.createElement('button');
        // TODO: Naming E.g. "filterCompleted"
        let buttonCompleted = document.createElement('button');
        // TODO: Naming E.g. "clearCompletedWrapper" or "clearCompletedTodosWrapper"
        let clear = document.createElement('div');
        // TODO: Naming E.g. "clearCompletedText"
        let link = document.createElement('a');

        footer.classList.add('footer');
        counter.classList.add('counter');
        buttons.classList.add('buttons');
        clear.classList.add('clear');

        counterText.innerText = 'items left';
        buttonAll.innerText = 'All';
        buttonActive.innerText = 'Active';
        buttonCompleted.innerText = 'Completed';
        link.innerText = 'Clear completed';

        footer.append(counter);
        counter.append(calculateActiveTodos(data.todos));
        counter.append(counterText);
        footer.append(buttons);
        buttons.append(buttonAll);
        buttons.append(buttonActive);
        buttons.append(buttonCompleted);
        footer.append(clear);
        clear.append(link);

        return footer;
    }

    function calculateActiveTodos(todos) {
        let counterItem = document.createElement('div');
        let count = 0;

        counterItem.classList.add('counter-item');

        todos.forEach((item) => {
            if (item.isActive === false) {
                count++;
            }

            return count;
        });

        counterItem.innerText = count;

        return counterItem;
    }

    wrapper.append(createHeader());
    wrapper.append(createMain());
    wrapper.append(createdAllTodos(data.todos));
    wrapper.append(createFooter());

}
createTodoList('.wrapper');

//TODO: NEXT STEPS:
// 1. Finish with all TODOs
// 2. (Still not working) Add logic for 'Clear completed' button. When clicking it should delete all checked todos. NOTE: 'idGenerator' might be handy
// 3. (Working partly. Should not let '     ' todos to be added) Add logic for creating new todo. When you write something in top input and press 'enter' button - new todo should be added to your list and displayed. Make it to remove unneeded spaces first so texts like '        ' won't be added.
// 4. Bug. When adding new todo if there was any active one they all becoming inactive. Fix it.
// 5. Add logic for filtering buttons. Let them display proper set of todos respectively
