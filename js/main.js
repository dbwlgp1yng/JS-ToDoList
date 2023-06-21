// DOM 정의
const items = document.querySelector('.items');
const addInput = document.querySelector('.add_input');
const addBtn = document.querySelector('.add_btn');

function onAdd(){
    // 1. 사용자가 입력한 텍스트 받아오기
    const text = addInput.value;

    // 2. 새로운 아이템을 만들기(텍스트 + 삭제버튼)
    const item = createItem(text);

    // 3. items 라는 컨테이너 안에 새로 만든 아이템 추가
    items.appendChild(item);

    console.log(items);

    // 4. input 값을 초기화
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
    event.preventDefault(); // form 기본동작(submit) 제거
    onAdd();
});

