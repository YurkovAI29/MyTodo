function createTodoList(classBlock) {
    let wrapper = document.querySelector(classBlock);
    let data = {
        todos: [
            {
            isActive: false,
            title: "buy milk",
            id: genereateId()
            },
            {
            isActive: false,
            title: "buy bread",
            id: genereateId()
            },
            {
            isActive: false,
            title: "buy beer",
            id: genereateId()
            },
        ]
    };

    function genereateId() {
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
        // don't make names too complicated
        let wrapper = document.createElement('main');
        let selectAllTodos = document.createElement('div');
        // don't use capital letter for such namings
        // also don't make names too complicated
        let newTodoInput = document.createElement('input');

        wrapper.classList.add('content');
        selectAllTodos.classList.add('arrow');
        // try to use one naming approach. E.g. don't mix camel case with underscore
        newTodoInput.classList.add('main_input');

        newTodoInput.placeholder = ('What needs to be done?');
        newTodoInput.addEventListener('keydown', addNewTodo);

        wrapper.append(selectAllTodos);
        wrapper.append(newTodoInput);

        return wrapper;
    }

    function addNewTodo(event) {
        let MainInputField = document.querySelector('.main_input');
        
        if (event.key === 'Enter' && MainInputField.value.trim().length !== 0) {
            data.todos.push({
                isActive: false,
                title: MainInputField.value,
                id: genereateId()
            });

            MainInputField.value = '';
            redrawTodosList(createAllTodos(data.todos));
            calculateActiveTodos(data.todos);
            redrawFooter();
        }
        return;
    }

    function redrawTodosList(newTodos) {
        let wrapperAllTodos = document.querySelector('.todosWrapper');
        
        wrapperAllTodos.innerHTML = ''; 
        wrapperAllTodos.appendChild(newTodos); 
    }

    function redrawFooter() {
        // Same comments as in redrawTodosList
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
        
        let idTodo = event.target.id;

        data.todos.find(item => {
        if (idTodo === item.id) {
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

        let deleteTodo = event.target.id;
        let modifiedArray = data.todos.filter(item => (deleteTodo !== item.id));

        data.todos.length = 0;
        data.todos = modifiedArray.slice();

        redrawTodosList(createAllTodos(data.todos));
        calculateActiveTodos(data.todos);
        redrawFooter();
    }

    function createAllTodos(todos) {
        let listTodos = document.createElement('div');

        listTodos.classList.add('todosWrapper');

        todos.forEach(item => listTodos.appendChild(createdSingleTodo(item)));

        return listTodos;
    }

    function createFooter() {
        let footerWrapper = document.createElement('footer');
        let counterWrapper = document.createElement('div');
        let counterValue = document.createElement('p');
        let filtersWrapper = document.createElement('div');
        let filterAll = document.createElement('button');
        let filterActive = document.createElement('button');
        let filterCompleted = document.createElement('button');
        let clearCompletedTodosWrapper = document.createElement('div');
        let clearCompletedText = document.createElement('a');

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
        counterWrapper.append(calculateActiveTodos(data.todos));
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
            if (item.isActive === false) {
                count++;
            }

            return count;
        });

        counterItem.innerText = count;

        return counterItem;
    }

    function removeCompletedTodos() {
        
        let modifiedArray = data.todos.filter(item => (item.isActive !== true));

        data.todos.length = 0;
        data.todos = modifiedArray.slice();

        redrawTodosList(createAllTodos(data.todos));
        calculateActiveTodos(data.todos);
        redrawFooter();
    }

    function createAllTodosList() {
        redrawTodosList(createAllTodos(data.todos));
    }

    function createActiveTodosList() {
        newArr = data.todos.filter(item => (item.isActive === false));
        redrawTodosList(createAllTodos(newArr));
    }

    function createCompletedTodosList() {
        newArr = data.todos.filter(item => (item.isActive === true));
        redrawTodosList(createAllTodos(newArr));
    }

    wrapper.append(createHeader());
    wrapper.append(createMain());
    wrapper.append(createAllTodos(data.todos));
    wrapper.append(createFooter());

}
createTodoList('.wrapper');

//TODO: NEXT STEPS:
// 1. Finish with all TODOs
// 2. (Still not working) Add logic for 'Clear completed' button. When clicking it should delete all checked todos. NOTE: 'idGenerator' might be handy. NOTE - deleted items can't be displayed again. They deleted forever
// 3. (Still not working) (Working partly. Should not let '     ' todos to be added) Add logic for creating new todo. When you write something in top input and press 'enter' button - new todo should be added to your list and displayed. Make it to remove unneeded spaces first so texts like '        ' won't be added.
// 4. (Still not working) Bug. When adding new todo if there was any active one they all becoming inactive. Fix it.
// 5. (Still not working) Add logic for filtering buttons. Let them display proper set of todos respectively. Also make default one be active from beginning.
