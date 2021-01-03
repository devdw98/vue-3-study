<template>
    <div class="login">
        <UserForm />
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import UserForm from '@/components/UserForm.vue';

export default defineComponent({
    name: 'Login',
    components:{
        UserForm,
    },

})
</script>