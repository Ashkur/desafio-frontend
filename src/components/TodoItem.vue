<template>
    <div :class="`flex items-center h-16 my-2 shadow-md border-l-8 ${color}`">
        <!-- checkbox -->
        <div class="w-1/6 h-12 p-2 text-center">
            <input
                v-if="todo.status == 'closed'" 
                :checked="true"
                @click="updateTodoStatus(todo, index)"
                type="checkbox">

            <input
                v-else
                @click="updateTodoStatus(todo, index)"
                type="checkbox">
        </div>

        <!--title -->
        <div class="w-4/6 h-12 p-2">
            <span 
                v-if="todo.status == 'closed'"
                style="text-decoration: line-through">{{todo.title}}</span>
            <span 
                v-else>{{todo.title}}</span>
        </div>
        <!-- router-link -->
        <div 
            class="w-1/6 h-12 p-2 cursor-pointer">
            <router-link 
                :to="{
                    name:'TodoDetails', 
                    params: {
                        id: todo._id
                    }
                }">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </router-link>
        </div>                        
    </div>
</template>

<script>
import {fetchTodos, storeTodos, changeTodoStatus} from '../storage.modules';

export default {
    props: [
        'todo',
        'color',
        'index'
    ],

    methods: {
        
        updateTodoStatus(todo, index) {
            let todos = fetchTodos();

            let updatedTodos = changeTodoStatus(todos, todo);

            storeTodos(updatedTodos);
            
            return this.$emit('updateTodoStatus', {
                                                    localStorageTodos: updatedTodos, 
                                                    addTodoIsVisible: false
                                                });
        },
    }
}
</script>