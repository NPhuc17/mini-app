<script setup>
import { defineProps } from 'vue';
defineProps({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: false,
        default: '/'
    }
});
</script>
<template>


    <div class=" bg-background">
        <div class=" flex justify-between mx-2 items-center  h-[10vh]">
            <div class="left flex gap-1 ">




                <router-link :to="path" class="nav-item" active-class="active">
                    <div class="text-white"><</div>
                </router-link>
                <h1 class=" text-white">{{ title }}</h1>
            </div>


            <!-- <div class="right flex gap-1 ">
                <div class=" text-white">...</div>
                <div class=" text-white">X</div>
            </div> -->
        </div>
    </div>

</template>