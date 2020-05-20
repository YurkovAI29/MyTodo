function createTodoList(classBlock) {
    let wrapper = document.querySelector(classBlock);
    let data = {
        todos: [
            {
            isActive: false,
            title: "buy milk",
            id: generateId()
            },
            {
            isActive: false,
            title: "buy bread",
            id: generateId()
            },
            {
            isActive: false,
            title: "buy beer",
            id: generateId()
            },
        ]
    };

    function generateId() {
        let minNumber = 0;
        let maxNumber = 10000;
        let result = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

        return result.toString(10);
    }

    function createHeader() {
        let createdHeader = document.createElement('header');
        createdHeader.classList.add('header');
        createdHeader.innerHTML = "<h1>todos</h1>";

        return createdHeader;
    }

    function createMain() {
        let wrapper = document.createElement('main');
        let selectAllTodos = document.createElement('div');
        let newTodoInput = document.createElement('input');

        wrapper.classList.add('content');
        selectAllTodos.classList.add('arrow');
        newTodoInput.classList.add('main_input');

        newTodoInput.placeholder = ('What needs to be done?');
        newTodoInput.addEventListener('keydown', addNewTodo);

        wrapper.append(selectAllTodos);
        wrapper.append(newTodoInput);

        return wrapper;
    }

    function addNewTodo(event) {
        // don't use capital leter for such variables
        let MainInputField = document.querySelector('.main_input');

        if (event.key === 'Enter' && MainInputField.value.trim().length !== 0) {
            const newTodo = {
                isActive: false,
                title: MainInputField.value,
                id: generateId()
            };

            data.todos.push(newTodo);

            MainInputField.value = '';
            // TODO: Make it more readable.
            //  E.g. instead redrawTodosList(createAllTodos(data.todos));
            //  make it work like redrawTodosList(data.todos)
            redrawTodosList(createAllTodos(data.todos));
            calculateActiveTodos(data.todos);
            redrawFooter();
        }
        return;
    }

    function redrawTodosList(newTodos) {
        let todosWrapper = document.querySelector('.todosWrapper');

        todosWrapper.innerHTML = '';
        todosWrapper.appendChild(newTodos);
    }

    function redrawFooter() {
        let footerWrapper = document.querySelector('.footer');

        footerWrapper.remove();
        wrapper.appendChild(createFooter());
    }

    function createdSingleTodo(item) {
        let todoWrapper = document.createElement('div');
        let inputCheckboxTodo = document.createElement('input');
        let todoLabel = document.createElement('label');
        let todoText = document.createElement('p');
        let deleteTodo = document.createElement('button');

        todoWrapper.classList.add('todo_item');
        todoWrapper.id = (item.id);
        deleteTodo.classList.add('delete_item');
        inputCheckboxTodo.classList.add('checkbox');
        inputCheckboxTodo.id = item.id;
        deleteTodo.id = (item.id);

        todoText.innerText = item.title;
        inputCheckboxTodo.type = 'checkbox';

        if (item.isActive === true) {
            inputCheckboxTodo.checked = true;
        }

        inputCheckboxTodo.addEventListener('click', changeCheckedState);
        deleteTodo.addEventListener('click', removeTodo);

        todoWrapper.append(todoLabel);
        todoLabel.appendChild(inputCheckboxTodo);
        todoWrapper.append(todoText);
        todoWrapper.append(deleteTodo);

        return todoWrapper;
    }

    function changeCheckedState(event) {
        let id = event.target.id;

        data.todos.find(item => {
        if (item.id === id) {
            // TODO: I suggest to use ternary operator in here
            if (event.target.checked) {
                item.isActive = true;
            } else {
                item.isActive = false;
            }
        }
    });

        calculateActiveTodos(data.todos);
        redrawFooter();
    }

    function removeTodo(event) {
        // Don't make complicated namings if not really needed )
        let id = event.target.id;
        // TODO: Using 'filter' method for removing only one item from array is implicit. Use another approach
        let modifiedArray = data.todos.filter(item => (item.id !== id));

        // I suggest to use data.todos = [] instead as it's less implicit
        // But in fact you don't need to clear array at all if you rewriting it in next line (!)
        // data.todos.length = 0;
        data.todos = modifiedArray.slice();

        // TODO: make such repeatable pieces re-usable! Move it to separated method.
        redrawTodosList(createAllTodos(data.todos));
        calculateActiveTodos(data.todos);
        redrawFooter();
    }

    function createAllTodos(todos) {
        let todoList = document.createElement('div');

        todoList.classList.add('todosWrapper');

        todos.forEach(item => todoList.appendChild(createdSingleTodo(item)));

        return todoList;
    }

    function createFooter() {
        let footerWrapper = document.createElement('footer');
        let counterWrapper = document.createElement('div');
        let counterValue = document.createElement('p');
        let filtersWrapper = document.createElement('div');
        let filterAll = document.createElement('button');
        let filterActive = document.createElement('button');
        let filterCompleted = document.createElement('button');
        // dom elements can't be named with actions such as 'clear'
        let clearCompletedTodosWrapper = document.createElement('div');
        // dom elements can't be named with actions such as 'clear'
        let clearCompletedText = document.createElement('a');
        const calculatedActiveTodos = calculateActiveTodos(data.todos);

        footerWrapper.classList.add('footer');
        counterWrapper.classList.add('counter');
        filtersWrapper.classList.add('buttons');
        clearCompletedTodosWrapper.classList.add('clear');

        counterValue.innerText = 'items left';
        filterAll.innerText = 'All';
        filterActive.innerText = 'Active';
        filterCompleted.innerText = 'Completed';
        clearCompletedText.innerText = 'Clear completed';

        clearCompletedTodosWrapper.addEventListener('click', removeCompletedTodos);
        filterAll.addEventListener('click', createAllTodosList);
        filterActive.addEventListener('click', createActiveTodosList);
        filterCompleted.addEventListener('click', createCompletedTodosList);

        footerWrapper.append(counterWrapper);
        counterWrapper.append(calculatedActiveTodos);
        counterWrapper.append(counterValue);
        footerWrapper.append(filtersWrapper);
        filtersWrapper.append(filterAll);
        filtersWrapper.append(filterActive);
        filtersWrapper.append(filterCompleted);
        footerWrapper.append(clearCompletedTodosWrapper);
        clearCompletedTodosWrapper.append(clearCompletedText);

        return footerWrapper;
    }

    function calculateActiveTodos(todos) {
        let counterItem = document.createElement('div');
        let count = 0;

        counterItem.classList.add('counter-item');

        todos.forEach((item) => {
            // item.isActive === false same as !item.isActive
            if (!item.isActive) {
                count++;
            }

            return count;
        });

        counterItem.innerText = count;

        return counterItem;
    }

    function removeCompletedTodos() {
        // TODO: Naming! Make it easy to understand!
        let incompleteTodos = data.todos.filter(item => (item.isActive !== true));

        // data.todos.length = 0;
        data.todos = incompleteTodos.slice();

        redrawTodosList(createAllTodos(data.todos));
        calculateActiveTodos(data.todos);
        redrawFooter();
    }

    function createAllTodosList() {
        redrawTodosList(createAllTodos(data.todos));
    }

    function createActiveTodosList() {
        // Do not use implicit declarations EVER
        //(item.isActive === false) === (!item.isActive)
        newArr = data.todos.filter(item => (!item.isActive));
        redrawTodosList(createAllTodos(newArr));
    }

    function createCompletedTodosList() {
        // Do not use implicit declarations EVER
        //(item.isActive === true) === (item.isActive)
        newArr = data.todos.filter(item => (item.isActive));
        redrawTodosList(createAllTodos(newArr));
    }

    wrapper.append(createHeader());
    wrapper.append(createMain());
    wrapper.append(createAllTodos(data.todos));
    wrapper.append(createFooter());

}
createTodoList('.wrapper');

//TODO: NEXT STEPS:
// 1. Choose few todos -> filter todos by 'completed' -> press 'clear completed' -> you dropped back to 'active' todos. (Should stay at 'completed')
// 2. Add logic for 'select all' button.
// 3. Add logic for editing todos
// 4. When you not on 'all' filter and creating new todo you shouldn't be dropped back to 'all'
// 5. Complete all TODOs
// 6. Check all changes and remove unneeded comments after that
