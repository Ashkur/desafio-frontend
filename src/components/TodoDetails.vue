<template>
<div>
    <!-- modal -->
    <modal
        :todo="todo" 
        v-if="deleteMode"
        v-on:shouldDeleteTodo="shouldDeleteTodo($event)"/>

    <!--edit form -->
    <div 
        v-if="editMode"
        class="mb-4 p-4">
        <div class="flex justify-center">
            <div class="w-full max-w-lg">
                <div
                    @click="cancelEdit(todo._id)" 
                    class="text-right cursor-pointer text-red-500" >Cancelar</div>
            </div>
        </div>        

        <todo-form 
            :todo="todo" 
            mode="edit" 
            v-on:editTodo="closeForm($event)"/>
    </div>

    <!-- Todo detais -->
    <div class="flex justify-center p-4">
        <div class="w-full max-w-6xl">
            <div class="flex w-full flex-wrap" >

                <todo-details-header 
                    :todo="todo"
                    borderColor="border-blue-300"
                    priorityLabel="Prioridade Baixa" 
                    v-if="todo.priority.label == 'low'" />

                <todo-details-header 
                    :todo="todo"
                    borderColor="border-yellow-400"
                    priorityLabel="Prioridade Média" 
                    v-if="todo.priority.label == 'medium'" />

                <todo-details-header 
                    :todo="todo"
                    borderColor="border-red-500"
                    priorityLabel="Prioridade Alta" 
                    v-if="todo.priority.label == 'high'" />

            </div>    
            
            <div class="w-full">
                <div class="text-center">{{ todo.description }}</div>
            </div>

            <div class="flex w-full p-2 my-6">
                <div                    
                    class="w-1/2 text-left text-blue-500">
                        <a 
                            @click="editMode = true"
                            class="cursor-pointer"> Editar </a>
                </div>

                <div
                    @click="deleteMode = true" 
                    class="w-1/2 text-right text-red-500">
                        <a 
                            @click="deleteMode = true"
                            class="cursor-pointer">Excluir</a></div>
            </div>
        </div>
        
    </div>
    
</div>    
</template>

<style scoped>
.bg-transparent-grey {
    background-color: rgba(80, 79, 79, 0.5);
}
</style>

<script>
import {fetchTodos, storeTodos, changeTodoStatus} from '../storage.modules';

import Modal from './Modal.vue';
import TodoForm from './TodoForm.vue';
import TodoDetailsHeader from './TodoDetailsHeader.vue';

export default {
    components: {
        Modal,
        TodoForm,
        TodoDetailsHeader
    },

    data() {
        return {
            todo: [],
            todos: [],
            editMode: false,
            deleteMode: false
        }
    },
    methods: {

        shouldDeleteTodo(boolean) {
            this.deleteMode = false;

            if(boolean)
                this.$router.go(-1);
        },

        cancelEdit(_id) {
            this.editMode = false;
            this.fetchTodo(_id);
        },

        fetchTodo(_id) {
            if (localStorage.getItem('todos')) {
                try {
                    let todos = JSON.parse(localStorage.getItem('todos'));
                    if(_id) {
                        this.todo = todos.find(todo => todo._id == _id);
                    }
                } catch(e) {
                    localStorage.removeItem('todos');
                }
            }
        },

        fetchFromLocalStorage() {
            if (localStorage.getItem('todos')) {
                try {
                    this.todos = JSON.parse(localStorage.getItem('todos'));
                } catch(e) {
                    localStorage.removeItem('todos'); 
                }
            }
        },

        closeForm(boolean) {
            this.editMode = boolean;
        }
    },

    beforeMount() {
        this.fetchTodo(this.$route.params.id)
    },
}
</script>