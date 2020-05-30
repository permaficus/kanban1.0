<template>
    <section v-if="!loggedIn">
        <b-modal :active.sync="isLoginFormActive"
                 has-modal-card
                 trap-focus
                 :destroy-on-hide="false"
                 aria-role="dialog"
                 :can-cancel="false"
                 aria-modal>
            <login></login>
        </b-modal>
    </section>

    <div id="app" v-else>
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <navbar @refresh-data="loadTask"></navbar>
        <div class="columns" style="margin-top: 5px;">
            <kanban class="column" :title=" 'Back-Log' "  :data="backlog" @refresh-data="loadTask"></kanban>
            <kanban class="column" :title=" 'To-Do' " :data="todo" @refresh-data="loadTask"></kanban>
            <kanban class="column" :title=" 'On Going' " :data="OnGoing" @refresh-data="loadTask"></kanban>
            <kanban class="column" :title=" 'Completed' " :data="completed" @refresh-data="loadTask"></kanban>
        </div>
    </div>
</template>

<script>

import login from './component/login';
import kanban from './component/board';
import navbar from './component/navbar'
import axios from 'axios'

export default {
    components: {
        login,
        kanban,
        navbar,
    },

    data() {
        return {
            todos: [],
            loggedIn: true,
            isLoading: true,
            isLoginFormActive: false,
            loginProps: {
                email: null,
                password: null
            }
        }
    },

    created() {
        if (!localStorage.getItem('access_token')) {

            this.loggedIn = false;
            this.isLoginFormActive = true;

        } else {
            this.loggedIn = true;
            this.loadTask();
        }
    },

    methods: {
        loadTask() {
            // start populating all current todos
            axios.get('http://localhost:3000/task', { headers: { Authorization: localStorage.getItem('access_token') } })
                .then(result => {
                    if (result) {
                        const { data } = result;
                        this.todos = []
                        data.forEach(el => {
                            this.todos.push(el)
                        })
                        
                        this.isLoading = false;
                    }
                })
                .catch(error => console.log(error.response))
        },

        isLoggedIn(value) {
            this.loggedIn = value
        }
    },
    
    computed: {
        backlog() {
            return this.todos.filter(todo => todo.category == 'backlog')
        },

        todo() {
            return this.todos.filter(todo => todo.category == 'todo')
        },

        OnGoing() {
            return this.todos.filter(todo => todo.category == 'on-going')
        },

        completed() {
            return this.todos.filter(todo => todo.category == 'completed')
        },

        refreshing() {
            this.loadTask();
        }
    }
}

</script>
<style>
html {
    background-image: url('../assets/img/login-background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
}
</style>