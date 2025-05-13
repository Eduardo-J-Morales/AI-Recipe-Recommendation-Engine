<template>
  <div>
    <h2>Enter Ingredients</h2>
    
    <input
      class="ingredeint-input"
      v-model="ingredient" 
      placeholder="Add an ingredient"
      @keyup.enter="addIngredient" 
      />

    <button  class="add-button" @click="addIngredient">
      <span class="button-text">Add</span>
      <span class="button-icon">+</span>
    </button>
    
    <div class="ingredients-list-container">
      <h3 class="ingredients-heading">Your Ingredients:</h3>
      <ul class="ingredients-list">
        <li></li>
      </ul>
    </div>
  
  </div>
</template>

<script setup>
// Pinia setup
import { createPinia } from 'pinia'
import { createSSRApp, ref } from 'vue'

const pinia = createPinia()
const app = createSSRApp()

app.use(pinia)
// Store setup
import { useStore } from '../stores/store';

const store = useStore()
const ingredient = ref('')
const isLoading = ref(false)

const addIngredient = async () => {
  if (ingredient.value.trim()) {
    const formattedIngredient = ingredient.value.trim().toLowerCase()

    if (!store.ingredients.includes(formattedIngredient)) {
      store.setIngredients([...store.ingredients, formattedIngredient])
    }

    ingredient.value = ''
  }
}

const removeIngredient = (index) => {
  const updatedIngredients = [...store.ingredients]
  updatedIngredients.splice(index, 1)
  store.setIngredients(updatedIngredients)
}

const clearIngredients = () => {
  store.setIngredients([])
}

</script>