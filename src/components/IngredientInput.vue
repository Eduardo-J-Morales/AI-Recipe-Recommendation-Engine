<template>
    <h2>Enter Ingredients</h2>
    <input v-model="ingredient" type="text" placeholder="Add an ingredient">
    <button @click="addIngredient">Add</button>
    <ul>
        <li v-for="item in ingredients" :key="item">{{ item }}</li>
    </ul>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

const ingredient = ref('')
const store = useStore()
const ingredients = store.state.ingredients

</script>