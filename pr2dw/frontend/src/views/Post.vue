<template>
<div class="post">
    <AddMemo />
    <MemoList />
</div>
    
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// import MemoList from '@/components/MemoList.vue';
import AddMemo from '@/components/AddMemo.vue';
import MemoList from '@/components/MemoList.vue'

export default defineComponent({
    name: "Post",
    components:{
        MemoList,
        AddMemo
    }
})
</script>