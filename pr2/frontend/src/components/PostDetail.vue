<template>
    <div class="post-detail" >
        <h2>Post Details</h2>
        <!-- <h1>{{id}}</h1> -->
        <div>{{title}}</div>
        <div>{{content}}</div>
        <div>{{writer}}</div>
        <p v-if="isWriter">
            <button @click=modifyPost>modify</button>
            <button @click=deletePost>delete</button>
        </p>
        <p v-else>
            <button @click=showList>show</button>
        </p>
    </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import{ Prop} from 'vue-property-decorator';
import axios from 'axios';

// @Component
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
            console.log(res.data.memo);
        })
    }

    modifyPost(){
        // this.$router.push({name: 'UpdatePostForm', params: {id: this.id}})
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