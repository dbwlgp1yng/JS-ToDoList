const items = document.querySelector('.items');
const addInput = document.querySelector('.add_input');
const addBtn = document.querySelector('.add_btn');

function onAdd(){
    const text = addInput.value;
    if(text === '') {
        addInput.focus(); 
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({block: 'center'});
    addInput.value = '';
    addInput.focus();
}

let id = 0; // UUID
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.classList.add('item_row');
    itemRow.setAttribute('data-id', id);
    itemRow.innerHTML = `
        <div class="item">
            <span class="item_name">${text}</span>
            <button class="item_delete">
                <i class="fa-solid fa-trash" data-id=${id}></i>
            </button>
        </div>
        <div class="item_divider"></div>
    `;
    id++;
    return itemRow;
}

addBtn.addEventListener('click', event => {
    onAdd();
});

addInput.addEventListener('keydown', event => {
    if(event.isComposing) {
        return;
    }
    if(event.key === 'Enter') {
        onAdd();
    }
});

items.addEventListener('click', event => {
    const id = event.target.dataset.id;
    if(id){
        const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
});