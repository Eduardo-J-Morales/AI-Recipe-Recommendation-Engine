<template>
    <h2>Enter Ingredients</h2>
    <input v-model="ingredient" type="text" placeholder="Add an ingredient">
    <button @click="addIngredient">Add</button>
</template>

<script>
import { ref } from 'vue'

</script>