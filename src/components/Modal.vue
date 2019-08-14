<template>
<div class="h-screen w-full absolute flex flex-col items-center justify-center bg-transparent-grey">
    <div class="h-screen w-full absolute flex items-center justify-center bg-modal">
        <div class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center">
            <div class="mb-4">
                <h1>Deseja realmente excluir esta tarefa?</h1>
            </div>
            <div class="flex w-full justify-between mb-8">
                <button 
                    @click="shouldDeleteTodo(true, todo._id)"
                    class="bg-green-500 hover:bg-green-700 px-8 text-white">Sim</button>
                <button
                    @click="shouldDeleteTodo(false, null)"
                    class="bg-red-500 hover:bg-red-700 px-8 text-white">Não</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import api from '../api.modules';
import {fetchTodos, storeTodos} from '../storage.modules';
export default {
    props: [ 
        'todo'
    ],

    methods: {
        shouldDeleteTodo(boolean, todo) {
            if(boolean)
                this.deleteTodo(todo);
            
            this.$emit('shouldDeleteTodo', boolean);
        },

        async deleteTodo(_id) {
            
            let todos = fetchTodos();

            let filteredTodos = todos.filter( (todo) => {
                return todo._id != _id;
            })

            todos = filteredTodos;

            storeTodos(todos);
        },
    }
}
</script>
