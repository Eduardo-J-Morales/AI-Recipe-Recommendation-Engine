import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        userProfile: {
            name: '',
            dietaryPreferences: [] as string[],
            healthGoals: ''
        },
        ingredients: [] as string[],
        recipes: [] as any
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
    },
    async fetchRecipes(filters: { ingredients: string, dietaryPreferences: string }) {
        try {
            
        } catch (error) {
            console.log('Error fetching recipes:', error)
        }      
    }
})