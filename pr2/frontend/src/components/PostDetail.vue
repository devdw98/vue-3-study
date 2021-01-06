<template>
    <div class="post-detail" >
        <h1>Post Details</h1>
        <div>{{title}}</div>
        <div>{{content}}</div>
        <div>{{writer}}</div>
        <p v-if="isWriter">
            <button @click=modifyPost>modify</button>
            <button @click=deletePost>delete</button>
        </p>
        <button @click=showList>show</button>
    </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import{ Prop} from 'vue-property-decorator';
import axios from 'axios';

export default class PostDetail extends Vue {
    title = '';
    content = '';
    writer = '';
    username = '';
    isWriter = false;

    @Prop() id?: string = '';

    created(){
        this.username = localStorage.getItem('username') || '';
        axios.get(`http://localhost:3000/api/posts/${this.id}`)
        .then(res =>{
            this.title = res.data.memo.title;
            this.content = res.data.memo.content;
            this.writer = res.data.memo._writer;
            if(this.username === this.writer){
                this.isWriter = true;
            }
        })
    }

    modifyPost(){
        this.$router.push({name: 'UpdatePostForm',  params: {id: this.id || ''}})
    }

    deletePost(){
        axios.delete(`http://localhost:3000/api/posts/${this.id}`);
        alert('success delete!');
        this.$router.push('/posts');
    }

    showList(){
        this.$router.push('/posts');
    }
}
</script>