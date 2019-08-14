<template>
    <div class="flex justify-center">
        <!-- loading spinner -->
        <loading-spinner v-show="spinnerIsVisible"/>

        <div class="w-full max-w-6xl p-4">
            <!--head -->
            <div class="w-full">
                <div class="flex flex-wrap items-center h-12">
                    <div class="w-full text-center font-bold "><h1>TODO LIST</h1></div>

                    <div class="flex w-full justify-between my-2">
                        <div 
                            @click="filtersIsVisible = !filtersIsVisible" class="text-sm">
                            <button class="text-red-500" v-if="filtersIsVisible">Fechar busca avançada</button>
                            <button v-else>[+] Busca avançada</button>
                        </div>

                        <div 
                            @click="addTodoIsVisible = !addTodoIsVisible">
                            <button
                                v-if="addTodoIsVisible" 
                                class="text-sm cursor-pointer text-red-500">Fechar</button>
                            <button
                                v-else 
                                class="hidden text-sm cursor-pointer md:block">Adicionar uma nova tarefa</button>
                        </div>
                        
                    </div>

                    <div 
                        v-if="!filtersIsVisible && !addTodoIsVisible"
                        class="flex w-full justify-between my-2">

                        <div class="w-1/2 text-center md:text-left">
                            <button
                                @click="sortByPriority">Ordenar por Prioridade</button>
                        </div>

                        <div class="w-1/2 text-center md:text-right">
                            <button
                                @click="sortByStatus">Ordenar Completados</button>
                        </div>
                    </div>
                    
                </div>
                
                <!--form -->
                <todo-form 
                    :todo="todo" 
                    mode="add"
                    v-on:addTodo="updateTodos($event)"
                    v-show="addTodoIsVisible"/>
                
            </div>

            <!--filters-->
            <div class="flex justify-center my-4">
                <div class="flex flex-wrap w-full max-w-lg my-2" v-show="filtersIsVisible">
                    <div class="flex w-full">
                        <input 
                            v-model="searchParameter.title"
                            type="text" placeholder="Buscar por título" class="w-full shadow p-2 my-2">
                    </div>

                    <div class="flex flex-wrap w-full">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <div class="relative">
                                <select
                                    v-model="searchParameter.priority" 
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

                        <div class="flex w-full md:w-1/2 justify-center items-center">
                            <input 
                                v-model="searchParameter.status"
                                type="radio" name="status" value="open" class="mx-4">Aberto<br>
                            <input 
                                v-model="searchParameter.status"
                                type="radio" name="status" value="closed" class="mx-4">Concluído<br>
                        </div>
                    </div>    

                    <div class="flex w-full content-between text-sm p-4">
                        <button
                            @click="filterReset"
                            class="w-1/2 text-left" >Limpar filtro</button>
                        <button 
                            @click="filterTodos"
                            class="w-1/2 text-right text-blue-500" >Buscar</button>
                    </div>                
                </div>
            </div>


            <!-- alert -->
            <alert v-show="alertIsVisible"/>
            
            <!--content body-->          
            <div class="w-full mt-8 py-5">
                <div
                    v-for="(todo, index) in (filteredTodos.length > 0)? filteredTodos: todos"
                    :key="todo._id"
                    draggable="true"
                    @dragstart="dragStart(index, $event)"
                    @dragover.prevent
                    @dragend="dragEnd"
                    @drop="dragFinish(index, $event)">

                    <todo-item 
                        :todo="todo" 
                        color="border-blue-300"  
                        v-on:updateTodoStatus="updateTodos($event)" 
                        v-if="todo.priority.label == 'low'"/>

                    <todo-item 
                        :todo="todo"  
                        color="border-yellow-400"
                        v-on:updateTodoStatus="updateTodos($event)"  
                        v-else-if="todo.priority.label == 'medium'"/>

                    <todo-item 
                        :todo="todo"  
                        color="border-red-500"
                        v-on:updateTodoStatus="updateTodos($event)"  
                        v-else-if="todo.priority.label == 'high'"/>
                                                        
                </div>
                <!-- syncs TO cloud -->
                <div
                    v-if="todos.length > 0" 
                    class="flex w-full text-left m-4">
                    <button
                        class="flex" 
                        @click="savesOnCloud">                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
                        
                        <div class="px-4">Salvar na nuvem</div>
                    </button>
                </div>

                <!-- syncs FROM cloud -->
                <div 
                    v-if="todos.length === 0 && todosFromCloud.length > 0 && syncOptionIsVisible"
                    class="flex justify-center">
                    <div class="flex-wrap w-full md:w-1/3 ">
                        <div class="w-full text-center">
                            Você tem algumas atividades na nuvem. Deseja sincronizar?
                        </div>

                        <div class="flex w-full p-2">
                            <div class="w-1/2">
                                <div
                                    @click="syncsFromCloud()" 
                                    class="text-center text-blue-500 cursor-pointer">
                                    Sim
                                </div>
                            </div>
                            <div class="w-1/2">
                                <div
                                    @click="syncsFromCloudDenied()" 
                                    class="text-center text-red-500 cursor-pointer">
                                    Não
                                </div>
                            </div>

                        </div>
                    </div>                                        
                </div>
            </div>            
        </div>

        <!--float button -->
        <button @click="addTodoIsVisible = !addTodoIsVisible" class="block md:hidden">
            <div class="absolute outline-none m-4 bottom-0 right-0 rounded-full h-16 w-16 flex items-center justify-center bg-green-500 ">
                <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            </div>
        </button>
           
    </div>
</template>

<style>
</style>

<script>
import api from '../api.modules';
import {fetchTodos, storeTodos} from '../storage.modules';

//componentes
import TodoItem from './TodoItem.vue';
import TodoForm from './TodoForm.vue';
import Alert from './Alert.vue';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
    components: {
        TodoItem,
        TodoForm,
        LoadingSpinner,
        Alert
    },
    data() {
        return {
            todos: [],
            todosFromCloud: [],
            todo: {
                _id: '',
                title: '',
                description: '',
                priority: {
                    label: '',
                    level: '',
                },
                status: '',          
            },
            filteredTodos: [],
            addTodoIsVisible: false,
            filtersIsVisible: false,
            syncOptionIsVisible: true,
            spinnerIsVisible: true,
            alertIsVisible: false,
            searchParameter: {},
            dragging: -1
        };
    },

    methods: {
        async appStarts() {
            let todos = await fetchTodos();

            if(todos.length > 0){
                this.spinnerIsVisible = false
                return this.todos = todos;
            }                
            
            let response = await api.getTodos();

            if(response.todos.length > 0) {
                this.spinnerIsVisible = false
                return this.arrangeTodos(response.todos);
            }   
                
            this.spinnerIsVisible = false
            return this.addTodoIsVisible = true;
        },

        displayAlert() {
            this.alertIsVisible = true;
            setTimeout(() => {
                this.alertIsVisible = false;
            }, 5000);

        },

        syncsFromCloudDenied() {
            this.syncOptionIsVisible = false;
            this.addTodoIsVisible = true;
        },

        async syncsFromCloud() {
            this.todos = this.todosFromCloud;
        },

        async arrangeTodos(todos) {
            this.todosFromCloud = todos.sort((a, b) => (a.position > b.position)? 1 : -1);
        },

        async savesOnCloud() {
            this.spinnerIsVisible = true;
            let todos = this.savesTodoPosition(this.todos);
            let response = await api.savesOnCloud(todos);
            this.spinnerIsVisible = false;
            this.displayAlert();
        },

        savesTodoPosition(todos) {
            let positionatedTodos = todos.map((todo, index) => {
                let {title, description, status, priority} = todo;
                return {position: index, title, description, status, priority};
            })

            return positionatedTodos;
        },

        updateTodos(data) {
            console.table(data.localStorageTodos)
            this.todos = data.localStorageTodos;
            this.addTodoIsVisible = data.addTodoIsVisible;
        },

        removeTodo(_id) {
            let todos = this.todos;
            this.todos = todos.filter(todo => todo._id !== _id);
        },

        filterReset() {
            this.searchParameter = {};
            this.filteredTodos = ''
        },

        filterTodos() {
            //deus me perdoe por esse código
            this.filteredTodos = this.todos.filter((todo) => {

                if(todo.title.toLowerCase().includes(this.searchParameter.title))
                    return true;

                else if(todo.priority.label == this.searchParameter.priority)
                    return true;

                else if(todo.status == this.searchParameter.status)
                    return true;

                if(//verifica se os tres parametros são verdadeiros
                    todo.priority.label == this.searchParameter.priority && 
                    todo.status == this.searchParameter.status && 
                    todo.title.toLowerCase().includes(this.searchParameter.title)
                ) return true;

                else if(//verifica se os parametros de titulo e prioridade ou status é verdadeiro
                    todo.title.toLowerCase().includes(this.searchParameter.title) &&
                    todo.priority.label == this.searchParameter.priority ||
                    todo.title.toLowerCase().includes(this.searchParameter.title) &&
                    todo.status == this.searchParameter.status
                ) return true;

                else if (//verifica se os parametros de prioridade e status são verdadeiros
                    todo.priority.label == this.searchParameter.priority &&
                    todo.status == this.searchParameter.status
                ) return true;
                
                
            })            
            
        },

        savesOnLocalStorage() {
            storeTodos(this.todos)
            this.todo = {};
        },

        sortByStatus() {
            this.todos = this.todos.sort((a, b) => (a.status < b.status)? 1 : -1)
        },

        sortByPriority() {
            this.todos = this.todos.sort((a, b) => (a.priority.level < b.priority.level)? 1 : -1);
        },

        /*
        *   DRAG AND DROP FUNCTIONS
         */
        dragStart(index, e) {
            e.dataTransfer.setData('Text', this._id);
            e.dataTransfer.dropEffect = 'move';
            this.dragging = index;
        },

        dragEnd(e) {
            this.dragging = -1;
        },

        dragFinish(to, e) {
            this.moveItem(this.dragging, to);
            e.target.style.marginTop = '2px';
            e.target.style.marginBottom = '2px';
        },

        moveItem(from, to) {
            if(to === -1) {
                this.removeItemAt(from);
            } else {
                this.todos.splice(to, 0, this.todos.splice(from, 1)[0]);
            }
        },
        
    },

    mounted() {
        this.appStarts();        
    },

    computed: {
        isDragging() {
            return this.dragging > -1;
        }
    },

    watch: {
        //salva posição no storage
        todos: {
            handler: (todos) => {
                storeTodos(todos);
            },
            deep: true
        }
    }
};
</script>