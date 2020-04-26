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
        // Where is event listener? Should be inside createMain method.

        wrapper.append(selectAllTodos);
        wrapper.append(newTodoInput);

        return wrapper;
    }

    function addNewTodo() {
        let MainInputField = document.querySelector('.main_input');

        // TODO: There is something wrong with your addNewTodo method. It's been called dozen times. Check where you calling it and make it to be called once per creation
        // TODO: Also remove eventListener to separated method. It shouldn't be here
        MainInputField.addEventListener('keydown', (enterKey) => {
            if (enterKey.keyCode === 13 && MainInputField.value !== '') {
                // Question!!!!!
                // if i compare conditions MainInputField.value !== null or !== false or
                // typeOf = "undefined" nothing happens, WHY?
                // Answer: What you want to be happen? Seems like input value cannot be undefined or null and definitely NOT boolean type either
                data.todos.push({
                    isActive: false,
                    title: MainInputField.value,
                    id: genereateId()
                });

                MainInputField.value = '';
                // TODO: create separated method with all this inside
                redrawTodosList();
                calculateActiveTodos(data.todos);
                redrawFooter();

            }
            return;
        });
    }

    function redrawTodosList() {
        // TODO: use document only at begginning. Find a way to do it differently.
        let wrapper = document.querySelector('.todosWrapper');
        let wrapperMainInputField = document.querySelector('.content');

        // Something wrong with redrawing. Try to delete few todos and than add new one. All deleted todos displayed again
        wrapper.remove();
        wrapperMainInputField.after(createAllTodos(data.todos));
    }

    function redrawFooter() {
        // Same comments as in redrawTodosList
        let footerWrapper = document.querySelector('.footer');

        footerWrapper.remove();
        wrapper.append(createFooter());
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

        todoWrapper.append(todoLabel);
        todoLabel.appendChild(inputCheckboxTodo);
        todoWrapper.append(todoText);
        todoWrapper.append(deleteTodo);

        return todoWrapper;
    }

    // TODO: move callback to separated method  FIXED
    function changeCheckedState(event) {
        //let inputCheckboxTodo = document.querySelector('.todosWrapper');
        // Question!!!!!
        // maybe hang an event.target only on the todosWrapper, because now event.target hang on the all document?
        if (event.target.className === 'checkbox') {
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
        }

        calculateActiveTodos(data.todos);
        redrawFooter();
    }

    // TODO: move callback to separated method  FIXED
    function deleteTodo(event) {
        if (event.target.className === 'delete_item') {
            let wraperTodo = document.querySelectorAll('.todo_item');
            let deleteTodo = event.target.id;

            wraperTodo.forEach(item => {
            if (item.id === deleteTodo) {
                item.remove();
            }
            });
            let newArr = data.todos.filter(item => (deleteTodo !== item.id));
            //console.log(newArr);
            data.todos.length = 0;
            data.todos = newArr.slice();
            //console.log(data.todos);
        }
        calculateActiveTodos(data.todos);
        redrawFooter();

    }

    // TODO: naming. E.g. "createAllTodos"  FIXED
    function createAllTodos(todos) {
        let listTodos = document.createElement('div');

        listTodos.classList.add('todosWrapper');

        todos.forEach(item => listTodos.appendChild(createdSingleTodo(item)));

        return listTodos;
    }

    function createFooter() {
        // TODO: Naming. E.g. "wrapper" or "footerWrapper"  FIXED
        let footerWrapper = document.createElement('footer');
        // TODO: Naming E.g. "counterWrapper" or ""  FIXED
        let counterWrapper = document.createElement('div');
        // TODO: Naming E.g. "counterValue"  FIXED
        let counterValue = document.createElement('p');
        // TODO: Naming E.g. "filtersWrapper"  FIXED
        let filtersWrapper = document.createElement('div');
        // TODO: Naming E.g. "filterAll"  FIXED
        let filterAll = document.createElement('button');
        // TODO: Naming E.g. "filterActive"  FIXED
        let filterActive = document.createElement('button');
        // TODO: Naming E.g. "filterCompleted"  FIXED
        let filterCompleted = document.createElement('button');
        // TODO: Naming E.g. "clearCompletedWrapper" or "clearCompletedTodosWrapper"
        let clearCompletedTodosWrapper = document.createElement('div');
        // TODO: Naming E.g. "clearCompletedText"
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

    function removeCompletedTodos(event) {debugger
        // this code works, but he hat. I wanted to reuse the function deleteTodo, but could not. I need your help
        if (event.target.tagName === 'A') {
            data.todos.forEach(item => {

                if (item.isActive === true) {
                    // dont use document !
                    let wraperTodo = document.querySelectorAll('.todo_item');
                    let deleteTodo = item.id;
                    // console.logs again!
                    console.log(wraperTodo);
                    console.log(deleteTodo);

                    wraperTodo.forEach(item => {
                        if (item.id === deleteTodo) {
                            item.remove();
                        }
                    });
                }
            });
            // naming
            let newArr = data.todos.filter(item => (deleteTodo !== item.id));
            data.todos.length = 0;
            data.todos = newArr.slice();
            calculateActiveTodos(data.todos);
            redrawFooter();
            console.log(data.todos);
        }

    }

    // Never do this again. Ever! )
    //TODO: move listeners to their respective owners
    addEventListener('click', addNewTodo);
    addEventListener('click', changeCheckedState);
    addEventListener('click', deleteTodo);
    addEventListener('click', removeCompletedTodos);

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
