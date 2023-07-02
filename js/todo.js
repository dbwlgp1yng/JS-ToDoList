"use strict";

const TodoForm = document.querySelector("#todo-form");
const TodoInput = document.querySelector("input");
const items = document.querySelector("#items");
let id = 0; 
let checked = []; 

// 리스트 추가
function addTodo(event) {
  event.preventDefault();
  const newTodo = TodoInput.value;
  if (newTodo === "") {
    TodoInput.focus();
    return;
  }
  const item = createTodo(newTodo);
  items.appendChild(item);
  item.scrollIntoView({ block: "center" });

  TodoInput.value = "";
  TodoInput.focus();

  saveItemsInBrowser();
}

// 리스트 생성
function createTodo(newTodo) {
  const itemRow = document.createElement('li');
  itemRow.classList.add('item_row');
  itemRow.setAttribute('data-id', id.toString());

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("iconcircle", "check");
  checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("iconcircle", "delete");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  itemRow.innerHTML = `
    <span class="item_name">${newTodo}</span>
    <div class="btn_box">
      ${checkBtn.outerHTML}
      ${deleteBtn.outerHTML}
    </div>
  `;

  itemRow.addEventListener('click', (e) => {
    const target = e.target;
    const button = target.closest('button');
    const dataId = itemRow.getAttribute('data-id');
    if (button && button.classList.contains('check')) {
      checkToggle(dataId);
    } else if (button && button.classList.contains('delete')) {
      deleteToggle(dataId);
    }
  });

  id++;
  return itemRow;
}

// 글 체크
function checkToggle(id) {
  const item = items.querySelector(`[data-id="${id}"]`);
  console.log(item);
  if (item) {
    item.children[1].children[0].classList.toggle("iconcircle_done");
    item.children[0].classList.toggle("item_name_done");

    const checkedIndex = checked.indexOf(id);
    if (checkedIndex > -1) {
      checked.splice(checkedIndex, 1);
    } else {
      checked.push(id);
    }
  }
}

// 글 삭제
function deleteToggle(id) {
  const item = items.querySelector(`[data-id="${id}"]`);
  const checkedIndex = checked.indexOf(id);
  if (item) {
    item.remove();
    checked.splice(checkedIndex, 1);
  }
}

window.addEventListener("load", () => {
  getItemsFromLocalStorage();
});

window.addEventListener("beforeunload", () => {
  saveItemsInBrowser();
});


function saveItemsInBrowser() {
  const todoItems = [];
  const childCount = items.childElementCount;
  for (let i = 0; i < childCount; i++) {
    let rowID = items.children[i].getAttribute('data-id');
    let itemName = items.children[i].querySelector('.item_name').textContent;
    todoItems.push({ id: rowID, name: itemName });
  }
  localStorage.setItem("items", JSON.stringify(todoItems));
  localStorage.setItem("checkedItems", JSON.stringify(checked));
}

function getItemsFromLocalStorage() {
  const loadedItems = localStorage.getItem("items");
  const loadedCheckedItems = localStorage.getItem("checkedItems");

  if (loadedItems) {
    const todoItems = JSON.parse(loadedItems);
    todoItems.forEach((item) => {
      const newItem = createTodo(item.name);
      newItem.setAttribute("data-id", item.id);
      items.appendChild(newItem);
    });
  }

  if (loadedCheckedItems) {
    const checkedItems = JSON.parse(loadedCheckedItems);
    checkedItems.forEach((id) => {
      const item = items.querySelector(`[data-id="${id}"]`);
      if (item) {
        item.children[1].children[0].classList.add("iconcircle_done");
        item.children[0].classList.add("item_name_done");
      }
    });
  }
}

TodoForm.addEventListener("submit", addTodo);

// 코드를 다시 확인해보니 saveItemsInBrowser 함수가 getItemsFromLocalStorage 함수보다 먼저 호출되고 있습니다. 이로 인해 로컬 스토리지에 저장된 체크된 아이템 정보가 가져와지기 전에 saveItemsInBrowser 함수가 실행되어 덮어쓰게 됩니다.