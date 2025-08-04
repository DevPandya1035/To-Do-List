document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("UserInput");
  const btn = document.getElementById("btn");
  const list = document.getElementById("tasks");
  let TaskList = JSON.parse(localStorage.getItem("task")) || [];

  TaskList.forEach((element) => rendertask(element));

  // Listen on button
  btn.addEventListener("click", () => {
    if (input.value === "") {
      return;
    }
    const obj = {
      name: input.value,
      completed: false,
    };
    TaskList.push(obj); // Add to TaskList array
    input.value = "";
    savetask();
    rendertask(obj);
    deltask(); // Update delete listeners for all tasks
  });

  // Save Task
  function savetask() {
    localStorage.setItem("task", JSON.stringify(TaskList));
  }

  // Render Task
  function rendertask(task) {
    const li = document.createElement("li");
    li.innerHTML = `<span id="list">${task.name}</span> <img id="delete" src="delete-2-svgrepo-com.svg" alt="delete" srcset="">`;
    list.append(li);
  }

  function deltask() {
    const lists = document.querySelectorAll("#list");
    const del = document.querySelectorAll("#delete");

    del.forEach((element, index) => {
      element.addEventListener("click", (event) => {
        const tobeDeleted = element.parentElement;
        const taskText = lists[index].textContent;

        // Remove from DOM
        tobeDeleted.remove();

        // Remove from TaskList array
        TaskList = TaskList.filter((task) => task.name !== taskText);

        // Update localStorage
        savetask();
      });
    });
  }

  deltask(); // Initialize delete functionality for existing tasks
});
