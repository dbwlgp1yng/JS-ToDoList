// DOM 정의
const items = document.querySelector('.items');
const addInput = document.querySelector('.add_input');
const addBtn = document.querySelector('.add_btn');

function onAdd(){
    const text = addInput.value;
    if(text === '') {
        alert('오늘 할 일을 작성해주세요!');
        addInput.focus(); 
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({block: 'center'});
    addInput.value = '';
    addInput.focus();
}

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.classList.add('item_row');

    const item = document.createElement('div');
    item.classList.add('item');

    const name = document.createElement('span');
    name.classList.add('item_name');
    name.innerText = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('item_delete');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'; 
    deleteBtn.addEventListener('click', () => {
        items.removeChild(itemRow);
    });

    const itemDivider = document.createElement('div');
    itemDivider.classList.add('item_divider');

    item.appendChild(name);
    item.appendChild(deleteBtn);

    itemRow.appendChild(item);

    return itemRow;
}

addBtn.addEventListener('click', event => {
    onAdd();
});

addInput.addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        onAdd();
    }
});