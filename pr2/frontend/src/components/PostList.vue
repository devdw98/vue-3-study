<template>
    <div class="post-container">
        <h2>MEMOS</h2>
        <ul>
            <li v-for="(memo, id) in memoList" :key="id">
                <h1>{{memo._id}}</h1>
                <h4><router-link :to="{name:'PostDetail', params:{id:memo._id}}">{{memo.title}}</router-link></h4>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component'
import axios from 'axios';
export default class PostList extends Vue {
    memoList = [];

    created(){
        axios.get('http://localhost:3000/api/posts')
        .then(res =>{
            this.memoList = res.data.memos;
        })
    }
}
</script>