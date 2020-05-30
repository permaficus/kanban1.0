<template>
    <section>
        <article :class="{message: true, 'is-warning': title === 'Back-Log', 'is-success': title === 'Completed', 'is-info': title === 'To-Do', 'is-danger': title === 'On Going'}">
            <div class="message-header">
                <p>{{ title }}</p>
            </div>
            <div class="message-body">
               <card v-for="todos in data" :key="todos.id" :task="todos" @refresh-data="doRefresh"/>
            </div>
        </article>
    </section>
    
</template>
<script>
import card from './card'

export default {
    props: ['title', 'data'],
    components: { card },
    methods: {
        doRefresh() {
            this.$emit('refresh-data')
        }
    }
}
</script>
