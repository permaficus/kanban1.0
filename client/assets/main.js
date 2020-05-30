import Vue from 'vue';
import App from './App.vue';
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy, {defaultIconPack: 'mdi'});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

/* App = new Vue()
App.$mount('#app') */