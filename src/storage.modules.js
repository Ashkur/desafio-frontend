export const fetchTodos = () => {
    if (localStorage.getItem('todos')) {
        try {
            return JSON.parse(localStorage.getItem('todos'));
        } catch(e) {
            localStorage.removeItem('todos');
        }
    }

    return [];
}

export const storeTodos = (todos) => {
    if(!todos)
        return false;

    const newTodos = JSON.stringify(todos);
    localStorage.setItem('todos', newTodos);
}

export const changeTodoStatus = (todos, todoToUpdate) => {
    let todo = todos.find(todo => todo._id == todoToUpdate._id);

    let filteredTodos = todos.filter((todo) => {
        return todo._id != todoToUpdate._id
    })

    if(todo.status == 'open'){
        todo.status = 'closed'
        filteredTodos.push(todo);
        return filteredTodos;
        
    } else {
        todo.status = 'open'
        filteredTodos.push(todo);
        return filteredTodos;
    }
}