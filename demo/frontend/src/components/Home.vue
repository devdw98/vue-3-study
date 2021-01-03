<template>
    <div>
        <form>
            <p>username</p>
            <input type="text" name="username" v-model="username">
            <p>password</p>
            <input type="password" name="password" v-model="password">
            <p></p>
            <button @click=join>join</button>
        </form>
    </div>
</template>
<script lang="ts">
// import Vue from 'vue'
import {Vue} from 'vue-class-component'
import axios from 'axios'

export default class Home extends Vue {
    username: string = '';
    password: string = '';

    join(){
        // console.log(this.username + ' ' + this.password);
        if(this.username === '' || this.password === ''){
                alert('Please fill in all the blanks.')
        }else{
            let userInfo = {
                username: this.username,
                req_pw: this.password
            }
            axios.post('http://localhost:3000/api/users/register', userInfo)
            .then(res =>{
                if(res.data.sucess === true){
                    alert('join success!');
                }    
            })
        }
    }

}

</script>