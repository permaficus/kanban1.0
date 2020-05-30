<template>
    <form @submit.prevent="newTask">
        <div class="modal-card" style="width: 500px">
            <header class="modal-card-head">
                <p class="modal-card-title">Add New Job/Task/Todo</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Title">
                    <b-input
                        type="text"
                        placeholder="Task Title"
                        v-model="title"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Description">
                    <b-input
                        type="textarea"
                        v-model="desc"
                        required>
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Cancel</button>
                <button class="button is-primary">Submit</button>
            </footer>
        </div>
    </form>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            title: null,
            desc: null
        }
    },

    methods: {
        newTask() {
            axios.post('http://localhost:3000/task', { title: this.title,  description: this.desc }, {
                headers: { Authorization : localStorage.getItem('access_token') }
            })
            .then(result => {
                /* doing something here */
                if (result) {
                    this.$emit('refresh-data', result)
                    this.$parent.close();
                    // this.$router.go()
                }
            })
            .catch(error => console.log(error.response))
        }
    }
}
</script>