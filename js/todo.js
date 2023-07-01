"use strict";

const TodoForm = document.querySelector("#todo-form");
const TodoInput = document.querySelector("input");
const items = document.querySelector("#items");
let id = 0; 

// 리스트 추가
function addTodo(event) {
  event.preventDefault();
  const newTodo = TodoInput.value;
  if (newTodo === "") {
    TodoInput.focus();
    return;
  }
  const item = paintTodo(newTodo);
  items.appendChild(item);
  item.scrollIntoView({ block: "center" });

  TodoInput.value = "";
  TodoInput.focus();
}

// 리스트 생성
function paintTodo(newTodo) {
  const itemRow = document.createElement('li');
  itemRow.classList.add('item_row');
  itemRow.setAttribute('data-id', id);

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
    const id = itemRow.getAttribute('data-id');
    if (button && button.classList.contains('check')) {
      checkToggle(id);
    } else if (button && button.classList.contains('delete')) {
      deleteToggle(id);
    }
  });

  id++;
  return itemRow;
}

// 글 체크
function checkToggle(id) {
  const childCount = items.childElementCount;
  for (let i = 0; i < childCount; i++) {
    let rowID = items.children[i].getAttribute('data-id');
    if(id === rowID) {
      items.children[i].children[1].children[0].classList.toggle("iconcircle_done");
      items.children[i].children[0].classList.toggle("item_name_done");
    }
  }
}

// 글 삭제
function deleteToggle(id) {
  const childCount = items.childElementCount;
  for (let i = 0; i < childCount; i++) {
    let rowID = items.children[i].getAttribute('data-id');
    if(id === rowID) {
      items.children[i].remove();
      break;
    }
  }
}

TodoForm.addEventListener("submit", addTodo);
