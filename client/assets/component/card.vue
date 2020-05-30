<template>
    <section>
        <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" :open="false" >
            <div
                slot="trigger" 
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <p class="card-header-title">
                    {{ task.title }}
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    {{ task.description }} <a>#{{ this.username }}</a>
                </div>
            </div>
            <footer class="card-footer" v-if="task.category === 'backlog'">
                <a class="card-footer-item" @click="deleteTask(task.id)">Delete</a>
                <a class="card-footer-item" @click="goNext(task.id, task.category)">Next</a>
            </footer>
            <footer class="card-footer" v-if="task.category === 'todo'">
                <a class="card-footer-item" @click="goBack(task.id, task.category)">Back</a>
                <a class="card-footer-item" @click="deleteTask(task.id)">Delete</a>
                <a class="card-footer-item" @click="goNext(task.id, task.category)">Next</a>
            </footer>
            <footer class="card-footer" v-if="task.category === 'on-going'">
                <a class="card-footer-item" @click="goBack(task.id, task.category)">Back</a>
                <a class="card-footer-item" @click="deleteTask(task.id)">Delete</a>
                <a class="card-footer-item" @click="goNext(task.id, task.category)">Next</a>
            </footer>
            <footer class="card-footer" v-if="task.category === 'completed'">
                <a class="card-footer-item" @click="goBack(task.id)">Back</a>
                <a class="card-footer-item" @click="deleteTask(task.id)">Delete</a>
            </footer>
        </b-collapse>

    </section>
</template>

<script>

import axios from 'axios'

const cats = ['backlog', 'todo', 'on-going', 'completed']

export default {
    props: ['task'],
    data() {
        return {
            username: localStorage.getItem('username')
        }
    },

    methods: {
        goBack(id, cat) {
            axios.put(`http://localhost:3000/task/${id}`, { category: cats[cats.indexOf(cat) - 1] },  { headers: { Authorization: localStorage.getItem('access_token') } })
                .then(result => {
                    this.$emit('refresh-data')
                })
                .catch(error => console.log(error.response))
        },

        deleteTask(id) {
            axios.delete(`http://localhost:3000/task/${id}`, { headers : { Authorization: localStorage.getItem('access_token') }})
                .then(result => {
                    this.$buefy.snackbar.open('The task already been deleted')
                    this.$emit('refresh-data')
                })
                .catch(error => console.log(error.response))
        },

        goNext(id, cat) {
            axios.put(`http://localhost:3000/task/${id}`, { category: cats[cats.indexOf(cat) + 1] },  { headers: { Authorization: localStorage.getItem('access_token') } })
                .then(result => {
                    this.$emit('refresh-data')
                })
                .catch(error => console.log(error.response))
        }
    }
}
</script>