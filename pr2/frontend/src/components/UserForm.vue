<template>
    <div>
        <form @submit.stop.prevent="onSubmit">
            <div>
                <label for="username">username</label>
                <input type="text" name="username" v-model="username">  
            </div>
            <div>
                <label for="password">password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <button @click="login">login</button>
            <button @click="join">join</button>
        </form>
    </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import {Vue} from 'vue-class-component'
import axios from 'axios'
import router from '../routes';

export default class Home extends Vue {
    username: string = '';
    password: string = '';
    sess: string = '';

    join(){
        if(this.username === '' || this.password === ''){
                alert('Please fill in all the blanks.')
        }else{
            // console.log(`${this.username} ${this.password}`);
            // this.$http.post('/api/users/register', userInfo)
            // .then(res =>{
            //     if(res.data.sucess === true){
            //         alert('join success!');
            //     }    
            // })
            const user = {
                username: this.username,
                password: this.password
            }

            axios.post('http://localhost:3000/api/users/register', user)
            .then(res => {
                alert(res.data.message);
                return;
            })
        }
    }
    login(){
        if(this.username === '' || this.password === ''){
                alert('Please fill in all the blanks.')
        }else{
            const user = {
                username: this.username,
                password: this.password
            }
        //    console.log(`${this.username} ${this.password}`);
            axios.post('http://localhost:3000/api/users/login', user)//, {withCredentials: true})
            .then(res =>{
                // console.log(res);
                localStorage.setItem('username', res.data.name);
                // return res.status===200 ? this.$router.push('/posts'):alert(res.data.message);
            });
        }
    }

}

</script>