<style scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.recipe-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  transition: transform 0.3s ease;
}

.recipe-card {
  transform: translateY(-5px);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-content {
  padding: 15px;
}

.recipe-content h3 {
  margin-top: 0;
  font-size: 18px;
  color: #333;
}

.description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
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
        <button @click="findRecipes" class="find-button">
          Find Recipes
        </button>
      </div>
    </div>

    <div class="loading" v-if="isLoading">
      <div class="spinner"></div>
      <p>Finding recipes with you ingredients...</p>
    </div>

  </div>
  <div v-if="store.recipes.length > 0" class="recipe-container">
      <h2>Recipes</h2>
    <div class="recipe-grid">
      <div class="recipe-card" v-for="recipe in store.recipes">
        <img :src="recipe.thumbnail_url" :alt="recipe.name"  class="recipe-image" />
        <div class="recipe-content">
          <h3>{{  recipe.name }}</h3>
          <p class="description">{{ recipe.description }}</p>
          
          <div class="recipe-details">
            <div class="ditail">
              <span class="label">Prep time:</span>
              <span> {{  recipe.prep_time_minutes ?? 'N/A' }}</span>
            </div>
            <div class="ditail">
              <span class="label">Cook time</span>
              <span>{{ recipe.cook_time_minutes ?? 'N/A' }}</span>
            </div>
            <div class="ditail">
              <span class="label">Servings:</span>
              <span>{{ recipe.num_servings ?? 'N/A' }}</span>
            </div>
          </div>
          
          <div class="topics" v-if="recipe.topics && recipe.topics.length > 0 ">
            <span v-for="topic in recipe.topics" :key="topic.slug" class="topic-tag">{{ topic.name + ' '}} </span>
        </div>
      </div>
    </div>
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
    console.log(response)

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

.input-group {
  display: flex;
  margin-bottom: 20px;
}

.ingredient-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #65a3ff;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
  transition:all 0.3s ease;
}

.ingredient-input:focus {
  outline: none;
  border-color: #3498db;
}

.add-button {
  background-color: #3498db;
  color: #fff;
  border:none;
  border-radius: 0 8px 8px 0;
  padding: 0 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-button:hover {
  background-color: #2980b9;
}

.button-text {
  display: inline-block;
  margin-right: 8px;
}

.button-icon {
  font-size: 18px;
  font-weight: bold;
}

.ingredients-list-container {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.ingredients-heading {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 12px;
}

.ingredients-list {
  list-style-type: none;
  padding: 0;
  margin:0 0 20px 0;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: #f1f8fe;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ingredient-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
}

.ingredient-name {
  font-size: 16px;
  color: #e4495e;
  text-transform: capitalize;
}

.remove-button {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  transition: color 0.2s;
}

.remove-button:hover {
  color: #c0392b;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.clear-button {
  background-color: #ecf0f1;
  color: #7f8c8d;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.clear-button:hover {
  background-color: #dfe6e9;
}

.find-button {
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.find-button:hover {
  background-color: #27ae60;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 30px;
  height: 30px;
  animation: spinner 2s linear infinite;
  margin-bottom: 10px;
}

@keyframes spinner {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}

@media (max-width: 480px) {
  .input-group {
    flex-direction: column;
  }
  
  .ingredient-input {
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .add-button {
    border-radius: 8px;
    width: 100%;
    padding: 12px;
  }
  
  .actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .clear-button, .find-button {
    width: 100%;
  }
}
</style>