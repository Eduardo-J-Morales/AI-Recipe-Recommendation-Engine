<template>
  <div class="ingredients-container">
    <h2 class="title">Enter Ingredients</h2>
    <p class="subtitle">Enter ingredients you have on hand to find matching recipes</p>
        <div class="input-group">

    <input
      class="ingredient-input"
      v-model="ingredient" 
      placeholder="Add an ingredient"
      @keyup.enter="addIngredient()" 
      />

    <button  class="add-button" @click="addIngredient()">
      <span class="button-text">Add</span>
      <span class="button-icon">+</span>
    </button>
        </div>

    <div v-if="store.ingredients.length > 0" class="ingredients-list-container">
      <h3 class="ingredients-heading">Your Ingredients:</h3>
      <ul class="ingredients-list">
        <li v-for="(item, index) in store.ingredients" :key="item" class="ingredient-item">
          <span class="ingredient-name">{{ item }}</span>
          <button class="remove-button" @click="removeIngredient(index)" aria-label="Remove ingredient">
            &times;
          </button>
        </li>
      </ul>

      
      
      <div class="actions">
        <button @click="clearIngredients" class="clear-button">Clear All</button>
        <button @click="findRecipes" class="find-button" :disabled="store.ingredients.length === 0">
          Find Recipes
        </button>
      </div>
    </div>

    <div class="loading" v-if="isLoading">
      <div class="spinner"></div>
      <p>Finding recipes with you ingredients...</p>
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

  console.log(ingredient.value.trim())
  if (ingredient.value) {
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

const findRecipes = async () => {
  isLoading.value = true

  try {
    const response = await store.fetchRecipes()

  } catch (error) {
    console.error('Error fetching recipes:', error)
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>
.ingredients-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  color: #2c3e50;
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}

.subtitle {
  color:  #7f8c8d;
  text-align: center;
  margin-bottom: 28px;
  font-size: 16px;
}
</style>