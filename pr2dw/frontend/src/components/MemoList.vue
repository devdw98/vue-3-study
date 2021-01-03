<template>
<div class="list">
    <h1>MEMO LIST</h1>
    <div v-for= "m in memos" :key="m._id">
        <h2>{{m.memo}}</h2>
    </div>
    
</div>
    
</template>
<script lang="ts">
import {defineComponent} from 'vue';
// import PostService from '@/components/PostService.vue';
import axios from 'axios'

export default defineComponent({
    name: 'MemoList',
    created(){
        axios.get('http://localhost:3000/posts')
        .then(res => {
            console.log(res.data.data)
            this.memos = res.data.data;
            // console.log(this.memos[0].memo)
        })
        
    },
    data(){
        return{
            memos: [],
        }
    }
})
</script>