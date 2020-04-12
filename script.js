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
    console.log(data.todos);

    function idGenerator(min, max) {
        let int = Math.floor(Math.random() * (max - min + 1)) + min;

        return int.toString(10);
    }

    function createHeader() {

        let header = document.createElement('header');
        header.classList.add('header');
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
        main.classList.add('content');
        arrow.classList.add('arrow');

        inputMain.placeholder = ('What needs to be done?');
        inputMain.addEventListener('keydown', (enterKey) => {
            if (enterKey.keyCode === 13) {
                data.todos.push({
                    isActive: false,
                    title: inputMain.value,
                    id: idGenerator(0, 10000)
                });
                console.log(inputMain.value);
                console.log(data.todos);

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
       
        let todoItemDiv = document.createElement('div');
        // TODO: naming
        let todoItemInput = document.createElement('input');
        // TODO: naming
        let todoItemLabel = document.createElement('label');
        // TODO: naming
        let todoItemText = document.createElement('p');
        // TODO: naming
        let todoItemButton = document.createElement('button');

        todoItemDiv.classList.add('todo_item');
        todoItemDiv.id = ('todo_item' + item.id);
        todoItemButton.classList.add('delete_item');
        todoItemInput.id = item.id;

        todoItemLabel.setAttribute('for', item.id);
        todoItemText.innerText = item.title;

        todoItemInput.type = 'checkbox';

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

    function createdAllTodos(todos) {

        let list = document.createElement('div');
        list.classList.add('wrapperTodos');

        todos.forEach(item => list.append(createdSingleTodo(item)));

        return list;
    }
    
    function createFooter() {
        let footer = document.createElement('footer');
        // TODO: naming
        let counter = document.createElement('div');
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
// 1. Add new method called 'idGenerator' and add unique ID to all your todos
// 2. Finish with isActive. Make it work for all your todos. It is not working properly right now. NOTE: 'idGenerator' might be handy in here.
// 3. Fix active events counter(Left bottom corner). Make it work properly.
// 4. Add logic for 'Clear completed' button. When clicking it should delete all checked todos. NOTE: 'idGenerator' might be handy
// 5. Add logic for creating new todo. When you write something in top input and press 'enter' button - new todo should be added to your list and displayed. Make it to remove unneeded spaces first so texts like '        ' won't be added.

