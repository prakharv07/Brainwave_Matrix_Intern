document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', addTask);

    function addTask(e) {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        
        if (taskText) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            listItem.addEventListener('click', () => {
                listItem.classList.toggle('completed');
            });

            todoList.appendChild(listItem);
            todoInput.value = '';
        }
    }
});
