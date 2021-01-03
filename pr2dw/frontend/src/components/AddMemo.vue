<template>
    <div class="submit-memo-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="memo">MEMO</label>
                <input name="memo" type="text" v-model="post.memo"/>
                <button @click="saveMemo" class="btn btn-success">Save</button>
            </div>
        </div>
        <div v-else>
            <h4>Submitted Successfully!</h4>
            <button class="btn btn-success" @click="newMemo">Add</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
// import PostService from '@/components/PostService.vue';

export default defineComponent({
    name: 'AddMemo',
    data() {
        return {
            post:{
                id:'',
                memo:'',
                createdAt:'',
                updatedAt:''
            },
            submitted : false
        }
    },
    methods:{
        saveMemo(){
            console.log(this.post.memo);
            let data = {memo :this.post.memo};
            axios.post('http://localhost:3000/posts', data)
            .then(res=>{
                if(res.data.success){
                    console.log(res.data.data);
                    this.post = {
                        id:res.data.data._id,
                        memo: res.data.data.memo,
                        createdAt: res.data.data.createdAt,
                        updatedAt: res.data.data.updatedAt
                    };
                    console.log(this.post)
                }else{
                    console.log(res.data.success)
                }
                
            })
        },
        newMemo(){
            this.submitted=false;
            this.post.id = '';
            this.post.memo = '';
            this.post.createdAt = '';
            this.post.updatedAt = '';
        }
        
    }
})
</script>