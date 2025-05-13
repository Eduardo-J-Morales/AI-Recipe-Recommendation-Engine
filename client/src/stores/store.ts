import { defineStore } from 'pinia'
import axios from 'axios';

export const useStore = defineStore('main', {
  state: () => ({
    userProfile: {
      name: '' as string,
      dietaryPreferences: [] as string[],
      healthGoals: '' as string
    },

    ingredients: [] as string[],
    recipes: [] as any[],
  }),

  actions: {
    setUserProfile(profile: { name: string; dietaryPreferences: string[]; healthGoals: string }) {
      this.userProfile = profile;
    },
    setIngredients(ingredients: string[]) {
      this.ingredients = ingredients;
    },
    setRecipes(recipes: any[]) {
      this.recipes = recipes;
    },
    async fetchRecipes() {
      const url = new URL('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20');
      for (let i = 0; i < this.ingredients.length; i++) {
        url.searchParams.append('q', this.ingredients[i])
      }

      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '252b76aa7emsh604e939fdfcf615p104cb1jsn2592faebe5c9',
          'x-rapidapi-host': 'tasty.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url.href, options);
        const data = await response.json()
        
        this.setRecipes(data.results)
        return data.results
      } catch (error) {
        console.error(error);
      }
    }
  }
})