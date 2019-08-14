import VueRouter from 'vue-router';
import TodoTable from './components/TodoTable.vue';
import TodoDetails from './components/TodoDetails.vue';

const router = new VueRouter ({
    routes: [
        {
            path: '/',
            name: 'Todos',
            component: TodoTable
        },
        {
            path: '/todo/:id',
            name: 'TodoDetails',
            component: TodoDetails
        }
    ]
})

export default router;