function createTodoList(classBlock) {
    let wrapper = document.querySelector(classBlock);
    let data = {
        todos: [
            {
            isActive: false,
            title: "buy milk",
            id: generatorId()
            },
            {
            isActive: false,
            title: "buy bread",
            id: generatorId()
            },
            {
            isActive: false,
            title: "buy beer",
            id: generatorId()
            },
        ]
    };
    // TODO: don't forget console.logs and debuggers in code 
    //console.log(data.todos);

    // TODO: method should be an action, e.g. "genereateId"  FIXED 
    // TODO: remove unneeded arguments. Keep it clear so all logic placed only inside this method  FIXED
    function generatorId() {
        // TODO: make readable variables. E.g. "randomNumber" or "generatedId"  FIXED
        let minNumber = 0;
        let maxNumber = 10000;
        let randomId = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

        return randomId.toString(10);
    }

    function createHeader() {
        let createdHeader = document.createElement('header'); //FIXED
        createdHeader.classList.add('header');
        createdHeader.innerHTML = "<h1>todos</h1>";

        return createdHeader;
    }

    function createMain() {
        // E.g.: "wrapper" or "todosWrapper" or "mainWrapper"  FIXED
        let wrapperMainInputField = document.createElement('main');
        // E.g.: "selectAll" or "selectAllTodos"  FIXED
        let selectAllActiveTodos = document.createElement('div');
        // E.g.: "todosInput" or "newTodoInput"  FIXED
        let MainInputField = document.createElement('input');

        wrapperMainInputField.classList.add('content');
        selectAllActiveTodos.classList.add('arrow');
        MainInputField.classList.add('main_input');

        MainInputField.placeholder = ('What needs to be done?');
        // TODO: always move eventlistener callback to separated function  FIXED

        wrapperMainInputField.append(selectAllActiveTodos);
        wrapperMainInputField.append(MainInputField);

        return wrapperMainInputField;
    }

    function addNewTodo() {
        let MainInputField = document.querySelector('.main_input');

        MainInputField.addEventListener('keydown', (enterKey) => {
            if (enterKey.keyCode === 13 && MainInputField.value !== '') {
                // Question!!!!!
                // if i compare conditions MainInputField.value !== null or !== false or 
                // typeOf = "undefined" nothing happens, WHY?
                data.todos.push({
                    isActive: false,
                    title: MainInputField.value,
                    id: generatorId()
                });
                //console.log(MainInputField.value);
                //console.log(data.todos);

                // TODO: You should rewrite this logic and move it to separated function.  FIXED
                // TODO: Ideally there should be first method which adding new todo and second 
                // one which redrawing it  FIXED
                MainInputField.value = '';
                redrawTodosList(createAllTodos(data.todos));
                calculateActiveTodos(data.todos);
                redrawFooter();
                
            }
            return;
        });
    }

    function redrawTodosList(newTodos) {
        let wrapperAllTodos = document.querySelector('.wrapperTodos');
        
        wrapperAllTodos.innerHTML = ''; 
        wrapperAllTodos.appendChild(newTodos); 
    }

    function redrawFooter() {
        let footerWrapper = document.querySelector('.footer');

        footerWrapper.remove();
        wrapper.append(createFooter());
    }

    function createdSingleTodo(item) {
        // TODO: E.g. "wrapper" or "todoWrapper"  FIXED
        let wrapperTodo = document.createElement('div');
        // TODO: E.g. "input" or "todoInput"  FIXED
        let inputCheckboxTodo = document.createElement('input');
        // TODO: E.g. "label" or "todoLabel"  FIXED
        let labelForCheckbox = document.createElement('label');
        // TODO: E.g. "text" or "todoText"  FIXED
        let textTodo = document.createElement('p');
        // TODO: E.g. "deleteTodo"  FIXED
        let deleteTodo = document.createElement('button');

        wrapperTodo.classList.add('todo_item');
        // TODO: You should delete "todo_item", no? FIXED
        wrapperTodo.id = (item.id);
        deleteTodo.classList.add('delete_item');
        inputCheckboxTodo.classList.add('checkbox');
        inputCheckboxTodo.id = item.id;
        deleteTodo.id = (item.id);
        
        //labelForCheckbox.setAttribute('for', item.id);
        textTodo.innerText = item.title;

        inputCheckboxTodo.type = 'checkbox';

        // TODO: move callback to separated method  FIXED

        // TODO: move callback to separated method  FIXED
        // deleteTodo.addEventListener('click', () => {

        //     let removeTodo = document.querySelector('#' + wrapperTodo.id);
        //     console.log(removeTodo);
        //     removeTodo.remove();

            // let newArr = data.todos.filter(item => (inputCheckboxTodo.id !== item.id));
            // console.log(newArr);
            // data.todos.length = 0;
            // data.todos = newArr.slice();
            // console.log(data.todos);

            // calculateActiveTodos(data.todos);
            // let removeFooter = document.querySelector('.footer');
            // removeFooter.remove();
            // wrapper.append(createFooter());

        // });

        //wrapperTodo.append(inputCheckboxTodo);
        wrapperTodo.append(labelForCheckbox);
        labelForCheckbox.appendChild(inputCheckboxTodo);
        wrapperTodo.append(textTodo);
        wrapperTodo.append(deleteTodo);

        return wrapperTodo;
    }

    // TODO: move callback to separated method  FIXED
    function changeCheckedState(event) {
        //let inputCheckboxTodo = document.querySelector('.wrapperTodos');
        // Question!!!!! 
        // maybe hang an event.target only on the wrapperTodos, because now event.target hang on the all document?
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

        listTodos.classList.add('wrapperTodos');

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

    function removeCompletedTodos(event) {
        // this code works, but he hat. I wanted to reuse the function deleteTodo, but could not. I need your help
        if (event.target.tagName === 'A') {
            data.todos.forEach(item => {

                if (item.isActive === true) {
                    let wraperTodo = document.querySelectorAll('.todo_item');
                    let deleteTodo = item.id;
                    console.log(wraperTodo);
                    console.log(deleteTodo);

                    wraperTodo.forEach(item => {
                        if (item.id === deleteTodo) {
                            item.remove();
                        }
                    });
                }
            });
            let newArr = data.todos.filter(item => (deleteTodo !== item.id));
            data.todos.length = 0;
            data.todos = newArr.slice();
            calculateActiveTodos(data.todos);
            redrawFooter();
            console.log(data.todos);
        }
        
    }

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
// 2. (Still not working) Add logic for 'Clear completed' button. When clicking it should delete all checked todos. NOTE: 'idGenerator' might be handy
// 3. (Working partly. Should not let '     ' todos to be added) Add logic for creating new todo. When you write something in top input and press 'enter' button - new todo should be added to your list and displayed. Make it to remove unneeded spaces first so texts like '        ' won't be added.
// 4. Bug. When adding new todo if there was any active one they all becoming inactive. Fix it.
// 5. Add logic for filtering buttons. Let them display proper set of todos respectively
