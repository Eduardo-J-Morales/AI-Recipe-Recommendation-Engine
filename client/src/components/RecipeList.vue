<template>
    <div>
        <div class="recipe-grid">
            <div v-for="recipe in store.recipes" :key="recipe" class="recipe-card">
                // images features
                <img src="" alt="" class="recipe-image">
                <div class="recipe-content">
                    <h3>{{ /*recipe name */ 1}}</h3>
                    <p class="description"></p>
                    <div class="recipe=details">
                        <div class="detail">
                            <span class="label"></span>
                            <span></span>
                        </div>
                        <div class="detail">
                            <span class="label"></span>
                            <span></span>
                        </div>
                        <div class="detail">
                            <span class="label"></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="topics">
                        <span></span>
                    </div>
                    <button @click="showRecipeDetails(recipe)">
                        View Details
                    </button>
                </div>
            </div>
        </div>
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

</script>