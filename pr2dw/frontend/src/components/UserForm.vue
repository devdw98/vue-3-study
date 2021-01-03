<template>
    <form method="post" @submit.stop.prevent="onSubmit">
        <h3>USER FORM</h3>
        <div>
        <label for="uid">ID:</label>
        <input id="uid" v-model="user.uid">
        </div>
        <div>
        <label for="password">PW:</label>
        <input id="password" v-model="user.password">
        </div>
        <button type="submit" @click="register">join!</button>
        <button type="submit" @click="login">login</button>
    </form>
</template>
<script lang="ts">
import { defineComponent} from 'vue'
import axios from 'axios';

export default defineComponent({
    name: 'UserForm',
    data(){
        return {
            user:{
                uid: '',
                password: '',
            }
        }
    },
    methods:{
        register: function(){
            if(this.user.uid === '' || this.user.password === ''){
                alert('Please fill in all the blanks.')
            }
            let userInfo = {
                uid: this.user.uid,
                reqPw: this.user.password
            }
            axios.post('http://localhost:3000/users/register',userInfo )
            .then(res =>{
                console.log(res);
            })
        },
        login: function(){
            if(this.user.uid === '' || this.user.password === ''){
                alert('Please fill in all the blanks.')
            }
            let userInfo = {
                uid: this.user.uid,
                reqPw: this.user.password
            }
            axios.post('http://localhost:3000/users/login', userInfo)
            .then(res =>{
                console.log(res);
                if(res.data.success === true){
                    this.$router.push('/posts');
                }
            })
        }
    }
})
</script>