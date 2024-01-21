const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill in the box first',
        });
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        Swal.fire({
            title: 'sure you want to delete it',
            text: "Deleted items cannot be returned!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Dalate',
            cancelButtonText: 'Cancell'
        }).then((result) => {
            if (result.isConfirmed) {
                e.target.parentElement.remove();
                saveData();
                Swal.fire(
                    'Clear!',
                    'Item has been deleted',
                    'success'
                );
            }
        });
    }
});

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
} showTasks();