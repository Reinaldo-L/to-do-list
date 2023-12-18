const list = document.getElementById("taskList");
const done = document.getElementById("done");
const total = document.getElementById("total");
const percent = document.getElementById("percent")
const add = document.getElementById("add");
const newTask = document.getElementById("newTask");
const newone = [];

const newTaskRender = () => {
  let quantity = 0;
  let html = "";
  if (newone.length > 0) {
    html = `<thead>
						<th>ID</th>
						<th>Task</th>
						<th></th>
						<th></th>
					</thead>
					<tbody>`;
    for (task of newone) {
      if (task.state) {
        quantity++;
        html += `<tr><td>${task.id}</td><td class="delete">${task.description}</td><td><input type="checkbox" class="checkbox" onclick="ModDone(${task.id})" id="taskCheck" checked></td><td><img onclick="deletenewTask(${task.id})" src="./assets/img/delete.png" alt="Delete"></td></tr>`;
      } else {
        html += `<tr><td>${task.id}</td><td>${task.description}</td><td><input type="checkbox" class="checkbox" onclick="ModDone(${task.id})" id="taskCheck"></td><td><img onclick="deletenewTask(${task.id})" src="./assets/img/delete.png" alt="Delete"></td></tr>`;
      }
    }
    html += `</tbody>`;
  }
  list.innerHTML = html;
  total.innerHTML = newone.length;
  done.innerHTML = quantity;
  newTask.focus();
};
const addnewTask = (task) => {
  let idRand = Math.floor(Math.random() * 100);
  const ids = newone.map((task) => task.id);
  while (ids.includes(idRand) === true) {
    idRand = Math.floor(Math.random() * 100);
  }
  newone.push({ id: idRand, description: task, state: 0 });
};

const deletenewTask = (id) => {
  const indexTask = newone.findIndex((searchIndex) => searchIndex.id === id);
  newone.splice(indexTask, 1);
  newTaskRender();
};

const ModDone = (id) => {
  const indexTask = newone.findIndex((searchIndex) => searchIndex.id === id);
  if (newone[indexTask].state === 0) {
    newone.splice(indexTask, 1, {
      id: newone[indexTask].id,
      description: newone[indexTask].description,
      state: 1,
    });
  } else {
    newone.splice(indexTask, 1, {
      id: newone[indexTask].id,
      description: newone[indexTask].description,
      state: 0,
    });
  }
  newTaskRender();
};

add.addEventListener("click", () => {
  if (newTask.value) {
    addnewTask(newTask.value);
    newTask.value = "";
    newTaskRender();
  } else {
    alert("You must write a new task to add");
    newTask.focus();
  }
});

//alert("If this appears, then something is working");
