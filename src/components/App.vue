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
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin: 15px 0;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.detail .label {
  font-size: 0.8em;
  color: #666;
  margin-bottom: 4px;
}

.detail span:not(.label) {
  font-weight: 600;
  color: #2c3e50;
}

.view-details-btn {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  margin-top: 15px;
}

.view-details-btn:hover {
  background-color: #2980b9;
}

.topics {
  margin: 15px 0;
}

.topic-tag {
  display: inline-block;
  background-color: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  margin-right: 6px;
  margin-bottom: 6px;
}
</style>
<template>

  <div class="ingredients-container">
    <h2 class="title">Enter Ingredients</h2>
    <p class="subtitle">Enter ingredients you have on hand to find matching recipes</p>
    <div class="input-group">

      <input class="ingredient-input" v-model="ingredient" placeholder="Add an ingredient"
        @keyup.enter="addIngredient()" />

      <button class="add-button" @click="addIngredient()">
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
      <div class="recipe-card" v-for="(recipe, index) in store.recipes">
        <img :src="recipe.thumbnail_url" :alt="recipe.name" class="recipe-image" />
        <div class="recipe-content">
          <h3>{{ recipe.name }}</h3>
          <p class="description">{{ recipe.description }}</p>

          <div class="recipe-details">
            <div class="ditail">
              <span class="label">Prep time:</span>
              <span> {{ recipe.prep_time_minutes ?? 'N/A' }}</span>
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

          <div class="topics" v-if="recipe.topics && recipe.topics.length > 0">
            <span v-for="topic in recipe.topics" :key="topic.slug" class="topic-tag">{{ topic.name + ' ' }} </span>
          </div>

          <button @click="showRecipeDetails(index)" class="view-details-btn">
            View Details
          </button>
        </div>
      </div>
    </div>

    <div class="recipe-modal" v-if="selectedRecipe">
      <div class="modal-content">
        <button class="close-btn" @click="closeRecipeModal">&times;</button>
        <div class="modal-header">
          <h2>{{ store.recipes[selectedRecipe].name }}</h2>
          <div class="recipe-meta">
            <span><strong>Prep Time:</strong> {{ store.recipes[selectedRecipe].prep_time_minutes }} mins</span>
            <span><strong>Cook Time:</strong> {{ store.recipes[selectedRecipe].cook_time_minutes }} mins</span>
            <span><strong>Total Time:</strong> {{ store.recipes[selectedRecipe].total_time_minutes }} mins</span>
            <span><strong>Servings:</strong> {{ store.recipes[selectedRecipe].num_servings }}</span>
          </div>
        </div>
        
        <div class="modal-body">
          <img :src="store.recipes[selectedRecipe].thumbnail_url" :alt="store.recipes[selectedRecipe].name" class="recipe-hero-image"/>
          
          <div class="recipe-description">
            <p>{{ store.recipes[selectedRecipe].description }}</p>
          </div>

          <div class="recipe-instructions">
            <h3>Instructions</h3>
            <ol>
              <li v-for="instruction in store.recipes[selectedRecipe].instructions" 
                  :key="instruction.id" 
                  class="instruction-step">
                {{ instruction.display_text }}
              </li>
            </ol>
          </div>

          <div class="recipe-nutrition" v-if="store.recipes[selectedRecipe].nutrition">
            <h3>Nutrition Information</h3>
            <div class="nutrition-grid">
              <div class="nutrition-item">
                <span class="label">Calories:</span>
                <span class="value">{{ store.recipes[selectedRecipe].nutrition.calories }}</span>
              </div>
              <div class="nutrition-item">
                <span class="label">Carbohydrates:</span>
                <span class="value">{{ store.recipes[selectedRecipe].nutrition.carbohydrates }}g</span>
              </div>
              <div class="nutrition-item">
                <span class="label">Protein:</span>
                <span class="value">{{ store.recipes[selectedRecipe].nutrition.protein }}g</span>
              </div>
              <div class="nutrition-item">
                <span class="label">Fat:</span>
                <span class="value">{{ store.recipes[selectedRecipe].nutrition.fat }}g</span>
              </div>
            </div>
          </div>

          <div class="recipe-tags" v-if="store.recipes[selectedRecipe].tags">
            <h3>Tags</h3>
            <div class="tags-container">
              <span v-for="tag in store.recipes[selectedRecipe].tags" 
                    :key="tag.id" 
                    class="tag">
                {{ tag.display_name }}
              </span>
            </div>
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
const selectedRecipe = ref(null)

const showRecipeDetails = (recipe) => {
  selectedRecipe.value = recipe
}
const addIngredient = async () => {

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
    store.setRecipes(response)

  } catch (error) {
    console.error('Error fetching recipes:', error)
  } finally {
    isLoading.value = false
  }
}

const closeRecipeModal = () => {
  selectedRecipe.value = null
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
  color: #7f8c8d;
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
  transition: all 0.3s ease;
}

.ingredient-input:focus {
  outline: none;
  border-color: #3498db;
}

.add-button {
  background-color: #3498db;
  color: #fff;
  border: none;
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
  margin: 0 0 20px 0;
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
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
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

  .clear-button,
  .find-button {
    width: 100%;
  }
}

.recipe-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
  padding: 20px;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.recipe-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #666;
}

.recipe-hero-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.recipe-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.recipe-instructions {
  margin-bottom: 30px;
}

.recipe-instructions h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.instruction-step {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #444;
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.nutrition-item {
  background-color: #f8f9fa;
  padding: 10px 15px;
  border-radius: 6px;
}

.nutrition-item .label {
  color: #666;
  font-size: 0.9em;
}

.nutrition-item .value {
  color: #2c3e50;
  font-weight: 600;
  margin-left: 5px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.tag {
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 15px;
  }

  .recipe-meta {
    flex-direction: column;
    gap: 10px;
  }
}
</style>