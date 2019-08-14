<template>
    <div class="flex justify-center">
        <div class="w-full max-w-lg" >
            <input v-model="todo.title" type="text" class="w-full shadow p-2 my-2" placeholder="Título da tarefa" @keyup.enter="addTodo(todo)" required/>
            <input v-model="todo.description" type="text" class="w-full shadow p-2 my-2" placeholder="Descrição da tarefa"/>

            <div class="flex justify-center">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <div class="relative">
                        <select 
                            v-model="todo.priority.label"
                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option disabled value="">Prioridade</option>
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <button
                @click="savesTodo(todo)" 
                class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 my-2 px-4">
                Salvar
            </button>
        </div>
    </div>
</template>

<script>
import {fetchTodos, storeTodos} from '../storage.modules';

export default {
    props: [
        'todo',
        'mode'
    ],

    methods: {
        savesTodo(todo) {
            switch (this.$props.mode) {
                case 'add':
                    this.addTodo()
                    break;

                case 'edit':
                    this.editTodo(todo)
                    break;
            }
        },

        addTodo() {
            let localStorageTodos = fetchTodos();

            if(this.todo.title) {
                let todo = {
                    _id: Date.now(),
                    title: this.todo.title,
                    description: this.todo.description,
                    priority: this.setPriority(this.todo.priority),
                    status: 'open'
                }            

                localStorageTodos.push(todo);

                storeTodos(localStorageTodos);

                return this.$emit('addTodo', {localStorageTodos, addTodoIsVisible: false});
            }      
            
            return alert('Por favor, informe um título!');
        },

        editTodo(editableTodo) {
            let localStorageTodos = fetchTodos();

            let todos = localStorageTodos.filter( (todo) => {
                return todo._id != editableTodo._id;
            })

            editableTodo.priority = this.setPriority(this.todo.priority);

            todos.push(editableTodo);

            storeTodos(todos);

            //fecha form em TodoDetails
            this.$emit('editTodo', false);
        },

        setPriority(priority){
            switch (priority.label) {
                case 'low':
                    return priority = {label: 'low', level: 1};

                case 'medium':
                    return priority = {label: 'medium', level: 2};

                case 'high':
                    return priority = {label: 'high', level: 3};

                default:
                    return priority = {label: 'low', level: 1};
            }
        }
    }
}
</script>