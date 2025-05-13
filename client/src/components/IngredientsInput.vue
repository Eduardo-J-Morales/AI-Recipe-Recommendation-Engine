<template>
  <div>
    <h2>Enter Ingredients</h2>
    
    <input v-model="ingredient" placeholder="Add an ingredient" />

    <button @click="addIngredient">Add</button>
    
    <ul>
      <li v-for="item in store.ingredients" > {{ item }} </li>
    </ul>
  
  </div>
</template>

<script setup>
import { createPinia } from 'pinia'
import { createSSRApp, ref } from 'vue'

const pinia = createPinia()
const app = createSSRApp()

app.use(pinia)

import { useStore } from '../stores/store';

const store = useStore()
const ingredient = ref('')
const ingredients = store.ingredients

const addIngredient = async () => {
  if (ingredient.value) {
    store.setIngredients([...store.ingredients, ingredient.value]);
    ingredient.value = '';
  }
  const response = await store.fetchRecipes()
  console.log(response)
};


</script>