// header.innerHTML = "<input type="text" placeholder="What needs to be done?">";

let wrapper = document.querySelector('.wrapper');

function createHeader() {
    let header = document.createElement('header');
    header.className = 'header';
    wrapper.append(header);
    header.innerHTML = "<h1>todos</h1>";
}

function createMain() {
    let main = document.createElement('main');
    let arrow = document.createElement('div');
    let input = document.createElement('input');
    
    main.classList = 'content';
    arrow.classList = 'arrow';

    input.placeholder = ('What needs to be done?');

    wrapper.append(main);
    main.append(arrow);
    main.append(input);
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

    footer.classList = 'footer';
    counter.classList = 'counter';
    counterItem.classList = 'counter-item';
    buttons.classList = 'buttons';
    clear.classList = 'clear';

    counterItem.innerText = 0;
    counterText.innerText = 'items left';
    buttonAll.innerText = 'All';
    buttonActive.innerText = 'Active';
    buttonCompleted.innerText = 'Completed';
    link.innerText = 'Clear completed';

    wrapper.append(footer);
    footer.append(counter);
    counter.append(counterItem);
    counter.append(counterText);
    footer.append(buttons);
    buttons.append(buttonAll);
    buttons.append(buttonActive);
    buttons.append(buttonCompleted);
    footer.append(clear);
    clear.append(link);
}

createHeader();
createMain();
createFooter();