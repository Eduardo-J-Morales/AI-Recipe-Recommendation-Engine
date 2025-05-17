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
    async fetchRecipes(numberOfRecipes) {
      const url = new URL(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=${numberOfRecipes}`);
        url.searchParams.append('q', this.ingredients.join(','))
      


      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': import.meta.env.PUBLIC_API_KEY,
          'x-rapidapi-host': 'tasty.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url.href, options);
        const data = await response.json()
        return data.results
      } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
      }
    }
  }
})