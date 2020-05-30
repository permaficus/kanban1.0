<template>
    <form @submit.prevent="doLogin">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Email">
                    <b-input
                        type="email"
                        placeholder="Your email/Username"
                        v-model="email"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input
                        type="password"
                        password-reveal
                        v-model="password"
                        placeholder="Your password"
                        required>
                    </b-input>
                </b-field>

                <b-checkbox>Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary">Login</button>
            </footer>
        </div>
    </form>
</template>

<script scoped>
import axios from 'axios';

export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: ''
        };
    },
    
    methods: {
        doLogin() {
            axios.post('http://localhost:3000/login', { email: this.email, password: this.password })
                .then(result => {
                    if (result) {
                        const { data: { access_token, Username } } = result;

                        localStorage.setItem('access_token', access_token);
                        localStorage.setItem('username', Username)
                        // this.$emit('log-in', true)
                        this.$router.go()
                    }
                })

                .catch(error => console.log(error.response))
        }
    }
}
</script>

<style scoped>
/* @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
@import url('https://fonts.googleapis.com/css?family=Numans');
@import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css'); */

html,body{
    background-image: url('../img/login-background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    font-family: 'Numans', sans-serif;
    }
    
    .container{
    height: 100%;
    align-content: center;
    }
    
    .card{
    height: 370px;
    margin-top: auto;
    margin-bottom: auto;
    width: 400px;
    background-color: rgba(0,0,0,0.5) !important;
    }
    
    .social_icon span{
    font-size: 60px;
    margin-left: 10px;
    color: #FFC312;
    }
    
    .social_icon span:hover{
    color: white;
    cursor: pointer;
    }
    
    .card-header h3{
    color: white;
    }
    
    .social_icon{
    position: absolute;
    right: 20px;
    top: -45px;
    }
    
    .input-group-prepend span{
    width: 50px;
    background-color: #FFC312;
    color: black;
    border:0 !important;
    }
    
    input:focus{
    outline: 0 0 0 0  !important;
    box-shadow: 0 0 0 0 !important;
    
    }
    
    .remember{
    color: white;
    }
    
    .remember input
    {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-right: 5px;
    }
    
    .login_button{
    color: black;
    background-color: #FFC312;
    width: 100px;
    }
    
    .login_button:hover{
    color: black;
    background-color: white;
    }
    
    .links{
    color: white;
    }
    
    .links a{
    margin-left: 4px;
    }
</style>