import { defineStore } from 'pinia'

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

      const apiKey = import.meta.env.API_KEY;
      console.log('API Key:', apiKey); // For debugging

      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey as string,
          'x-rapidapi-host': 'tasty.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url.href, options);
        const data = await response.json()
        console.log(response)
        return data.results
      } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
      }
    }
  }
})