<template>
    <div class="post-form">
        <h1>NEW POST</h1>
        <form @submit.stop.prevent="onSubmit">
            <div>
            <label for="title">title</label>
            <input type="text" name="title" v-model="title">
            </div>
            <div>
            <label for="content">content</label>
            <input type="textarea" name="content" v-model="content">
            </div>
            <button type="submit" @click=submitPost>submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import{ Prop} from 'vue-property-decorator';
import axios from 'axios';

export default class PostForm extends Vue{
    title = '';
    content = '';

    @Prop() id?: string = '';

    submitPost(){
        if(this.title === '' || this.content === '')
            alert('Please fill in all the blanks.');
        else{
            const memo = {
                title: this.title,
                content: this.content,
                writer: localStorage.getItem('username')
            }
            
            if(this.id != ''){
                axios.put(`http://localhost:3000/api/posts/${this.id}`, memo)
                .then(res =>{
                    if(res.data.memo.modifiedCount > 0){
                        alert('Updated Successfully!');
                        this.$router.push({name:'PostDetail', params:{id:this.id || ''}});
                    }
                })
            }else{
axios.post('http://localhost:3000/api/posts', memo)
            .then(res =>{
                if(res.data.memo.insertedCount === 1){
                    this.$router.push('/posts');
                }
            })
            }
            
        }
    }

}
</script>